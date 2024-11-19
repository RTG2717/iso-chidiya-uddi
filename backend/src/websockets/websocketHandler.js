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
        // update users to frontend by sending a message
        ws.send(
            JSON.stringify({
                type: 'init',
                users: sessionService.getSessionUsersbyID(sessionID),
            })
        );
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
                                    type: 'fingerChange',
                                    clientID,
                                    fingerUp: data.fingerUp,
                                })
                            );
                        }
                    });
                }
                if (data.type === 'addUser') {
                    const sessionUsers =
                        sessionService.getSessionUsersbyID(sessionID);
                    sessionUsers.forEach((userID) => {
                        if (userID !== clientID) {
                            user = clientService.getUser(userID);
                            user.ws.send(
                                JSON.stringify({
                                    type: 'addUser',
                                    users: sessionService.getSessionUsersbyID(
                                        sessionID
                                    ),
                                })
                            );
                        }
                    });
                }
                if (data.type === 'removeUser') {
                    const sessionUsers =
                        sessionService.getSessionUsersbyID(sessionID);
                    sessionUsers.forEach((userID) => {
                        if (userID === data.clientID) {
                            sessionService.removeClientfromSession(
                                data.clientID,
                                sessionID
                            );
                        } else {
                            user = clientService.getUser(userID);
                            user.ws.send(
                                JSON.stringify({
                                    type: 'removeUser',
                                    users: sessionService
                                        .getSessionUsersbyID(sessionID)
                                        .filter(
                                            (user) =>
                                                user.clientID !== data.clientID
                                        ),
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
