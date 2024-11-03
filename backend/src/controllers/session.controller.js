const sessionService = require('../services/session.service');

// Create new session function
const createSession = async (req, res) => {
    try {
        const { users } = req.body;
        const newSession = await sessionService.createSession(users);
        res.status(201).json(newSession);
    } catch (error) {
        console.error('Error creating session:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getSessionbyID = async (req, res) => {
    try {
        const { sessionID } = req.params;

        const session = await sessionService.getSessionbyID(sessionID);
        if (session) res.status(200).json(session);
        else res.status(404).json({ message: 'Session not found' });
    } catch (error) {
        console.error('Error occurred while trying to find session: ', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getSessionbyCode = async (req, res) => {
    try {
        const { sessionCode } = req.params;

        const session = await sessionService.getSessionbyCode(sessionCode);
        if (session) res.status(200).json(session);
        else res.status(404).json({ message: 'Session not found' });
    } catch (error) {
        console.error('Error occurred while trying to find session: ', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteSession = async (req, res) => {
    try {
        const { sessionID } = req.params;

        const session = await sessionService.deleteSession(sessionID);
        if (session) res.status(204).json(session);
        else
            res.status(404).json({
                message: 'Session not found: No such sessionID to delete',
            });
    } catch (error) {
        console.error('Error occurred while trying to delete session: ', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    createSession,
    getSessionbyID,
    getSessionbyCode,
    deleteSession,
};
