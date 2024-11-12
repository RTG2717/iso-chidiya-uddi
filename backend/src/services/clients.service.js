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

const getUser = (clientID) => {
    return clients.get(clientID) || null;
};

const updateUser = (clientID, updateData) => {
    const clientSelection = clients.get(clientID);

    const updatedClient = { ...clientSelection, ...updateData };
    clients.set(clientID, updatedClient);
    return updatedClient;
};

module.exports = {
    createUser,
    updateUser,
    getUser,
};
