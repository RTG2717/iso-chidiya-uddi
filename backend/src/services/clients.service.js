const clients = new Map();
const { addClienttoSession } = require('./session.service');
const { v4: uuidv4 } = require('uuid');

const createUser = (userName, sessionID) => {
    const clientID = uuidv4();

    const newClient = {
        clientID,
        userName,
    };

    clients.set(clientID, newClient);
    addClienttoSession(clientID, sessionID);
    return newClient;
};

module.exports = {
    createUser,
};
