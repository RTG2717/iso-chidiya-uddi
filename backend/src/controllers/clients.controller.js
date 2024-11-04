const clientService = require('../services/clients.service');

const createUser = async (req, res) => {
    try {
        const { userName, sessionID } = req.body;

        const user = await clientService.createUser(userName, sessionID);

        res.status(200).json(user);
    } catch (error) {
        console.error('Unexpected error occurred', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createUser,
};
