const WebSocket = require('ws');
const sessionService = require('../services/session.service');

let activeConnections = [];

const setupWebSocket = (server) => {
    const wss = new WebSocket.Server({ server, path: '/ws' });

    wss.on('connection', (ws) => {
        activeConnections.push(ws);

        console.log('New Client joined!');
        // Send a welcome message to the connected client
        ws.send(
            JSON.stringify({ message: 'Welcome to the WebSocket server!' })
        );

        ws.on('message', (message) => {
            try {
                const data = JSON.parse(message);
                console.log(`Received message: ${data} from client`);

                // Add logic functions in here

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
