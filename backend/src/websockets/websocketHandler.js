const WebSocket = require('ws');
const url = require('url');
const sessionService = require('../services/session.service');
const clientService = require('../services/clients.service');

let activeConnections = [];

const setupWebSocket = (server) => {
    const wss = new WebSocket.Server({ server, path: '/ws' });

    wss.on('connection', (ws, req) => {
        activeConnections.push(ws);
        const params = url.parse(req.url, true).query;
        const { sessionID, clientID } = params;

        console.log(`New Client ${clientID} joined the session ${sessionID}!`);

        // add the websocket connection info to clientID
        clientService.updateUser(clientID, { ws });
        // Send a welcome message to the connected client
        ws.send(
            JSON.stringify({ message: 'Welcome to the WebSocket server!' })
        );

        ws.on('message', (message) => {
            try {
                const data = JSON.parse(message);
                console.log(`Received message: ${data} from client`);

                // Add logic functions in here

                if (data.type === 'fingerChange') {
                    const sessionUsers =
                        sessionService.getSessionUsersbyID(sessionID);
                    sessionUsers.forEach((userID) => {
                        if (userID !== clientID) {
                            user = clientService.getUser(userID);
                            user.ws.send(
                                JSON.stringify({
                                    clientID,
                                    fingerUp: data.fingerUp,
                                })
                            );
                        }
                    });
                }
                // no logic functions beyond this
            } catch (error) {
                console.log('Error handling message', error);
            }
        });
        // Handle WebSocket connection close
        ws.on('close', () => {
            console.log('Client disconnected');
            activeConnections = activeConnections.filter(
                (client) => client !== ws
            );
        });

        // Handle WebSocket errors
        ws.on('error', (error) => {
            console.error('WebSocket error:', error);
        });
    });
};

module.exports = { setupWebSocket };
