const WebSocket = require('ws');
const sessionService = require('../services/session.service');

let activeConnections = [];

const setupWebSocket = (server) => {
    const wss = new WebSocket.Server({ server, path: '/ws' });

    wss.on('connection', (ws) => {
        console.log('New client connected.', ws);
        activeConnections.push(ws);

        // Send a welcome message to the connected client
        ws.send(
            JSON.stringify({ message: 'Welcome to the WebSocket server!' })
        );

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
