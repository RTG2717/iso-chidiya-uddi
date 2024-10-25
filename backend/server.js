const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(express.json());

// In memory storage
const sessions = new Map();

// express Routes
app.post('/api/sessions', (req, res) => {
    try {
        const sessionID = uuidv4();
        sessions.set(sessionID, {
            sessionID,
            users: [],
            createdAt: new Date(),
        });
        res.json({
            sessionID,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
});

app.get('api/sessions/:sessionID', (req, res) => {
    try {
        const session = sessions.get(req.params.sessionID);
        if (!session)
            return res.status(404).json({
                error: 'Session not found',
            });
        res.json(session);
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
});

// Start Express Server
const server = app.listen(port, () => {
    console.log(`Port ${port} is listening for inputs`);
});

// Websocket Server
const wss = new WebSocket.Server({
    server,
});
const clients = new Map();

wss.on('connection', (ws, req) => {
    const clientID = uuidv4();
    const sessionID = new URL(req.url, 'http://localhost').searchParams.get(
        'sessionID'
    );
    const userName = new URL(req.url, 'http://localhost').searchParams.get(
        'userName'
    );

    // Storing Client Info
    clients.set(clientID, {
        ws,
        sessionID,
        userName,
        position: {
            x: 0,
            y: 0,
        },
    });

    // Update Session Data
    const session = sessions.get(sessionID);
    if (session) {
        sessions?.users?.push({
            clientID,
            userName,
            lastPosition: {
                x: 0,
                y: 0,
            },
            lastActive: new Date(),
        });
    }

    ws.send(
        JSON.stringify({
            type: 'init',
            clientID,
            sessionID,
        })
    );

    // Send current cursor positions to new client
    const sessionClients = Array.from(clients.entries())
        .filter(([_, client]) => client.sessionID === sessionID)
        .map(([id, client]) => ({
            clientID: id,
            userName: client.userName,
            position: client.position,
        }));

    ws.send(
        JSON.stringify({
            type: 'cursors',
            cursors: sessionClients,
        })
    );

    ws.on('message', (message) => {
        const data = JSON.parse(message);

        if (data.type === 'position') {
            // Update stored position
            clients.get(clientID).position = data.position;

            // Update session data
            const sessionID = sessions.get(sessionID);
            if (session) {
                const user = session.users.find((u) => u.clientID === clientID);
                if (user) {
                    user.lastPosition = data.position;
                    user.lastActive = new Date();
                }
            }

            // Broadcast to all users in the session
            clients.forEach((client, id) => {
                if (id !== clientID && client.sessionID !== sessionID) {
                    client.ws.send(
                        JSON.stringify({
                            type: 'cursor',
                            cliendID,
                            userName,
                            position: data.position,
                        })
                    );
                }
            });
        }
    });

    ws.on('close', () => {
        // Remove from session data
        const session = sessions.get(sessionID);
        if (session) {
            session.users = session.users.filter(
                (u) => u.clientID !== clientID
            );
        }
        if (session?.users?.length === 0) {
            sessions.delete(sessionID);
        }

        // Remove from clients
        clients.delete(clientID);

        // Broadcast disconnect to session clients
        clients.forEach((client) => {
            if (client.sessionID === sessionID) {
                client.ws.send(
                    JSON.stringify({
                        type: 'disconnect',
                        clientID,
                    })
                );
            }
        });
    });

    // Cleanup inactive clients periodically
    const cleanup = setInterval(() => {
        const now = new Date();
        sessions.forEach((session, id) => {
            const hasActiveUsers = session.users.some((user) => {
                // 1 hour of inactivity
                now - new Date(user.lastActive) < 1000 * 60 * 60;
            });
            if (!hasActiveUsers) {
                sessions.delete(id);
            }
        });
    }, 1000 * 60 * 60); // Runs every hour

    ws.on('close', () => clearInterval(cleanup));
});
