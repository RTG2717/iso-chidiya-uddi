const clientService = require('../services/clients.service');

const createUser = async (req, res) => {
    try {
        const { userName, sessionID } = req.body;

        const user = await clientService.createUser(userName, sessionID);

        return res.status(201).json(user);
    } catch (error) {
        if (error === 'Session not found') {
            console.error('Session not found');
            return res.status(404).json({ error: 'Requested client not found' });
        } else {
            console.error('Unexpected error occurred', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

const getUser = async (req, res) => {
    try {
        const { clientID } = req.params;
        console.log(clientID);
        const client = await clientService.getUser(clientID);
        if (client) {
            return res.status(200).json(client);
        } else {
            return res.status(404).json({ message: 'Client not found' });
        }
    } catch (error) {
        console.error('Error occurred while trying to get user: ', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateUser = async (req, res) => {
    try {
        const { clientID } = req.params;
        const updateData = req.body;

        const updatedUser = await clientService.updateUser(
            clientID,
            updateData
        );
        if (updateUser) {
            return res.status(200).json(updatedUser);
        } else {
            return res.status(404).json({ message: 'Session not found' });
        }
    } catch (error) {
        console.error('Error occurred while trying to update user: ', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    createUser,
    updateUser,
    getUser,
};
