const http = require('http');
const app = require('./app');
const { setupWebSocket } = require('./websockets/websocketHandler');

const server = http.createServer(app);
setupWebSocket(server);

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
    console.log(`Websocket up and running on port: ${port}`);
});
