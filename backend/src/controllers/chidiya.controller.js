const chidiyaService = require('../services/chidiya.service');

const addChidiya = async (req, res) => {
    try {
        const { sessionID } = req.params;
        const { userID, chidiyaName, chidiyaAns } = req.body;

        chidiyaService.addChidiya(
            sessionID,
            userID,
            chidiyaName,
            chidiyaAns
        );

        return res.status(200).json({ message: 'Chidiya added successfully' });
    } catch (error) {
        if (error.message === 'Session not found') {
            return res.status(404).json({ message: 'Session not found' });
        }
        return res.status(500).json({ message: error.message });
    }
};

const pickRandomChidiya = async (req, res) => {
    try {
        const { sessionID } = req.params;

        const chidiya = chidiyaService.pickRandomChidiya(sessionID);

        if (!chidiya) {
            return res.status(404).json({ message: 'No Chidiya found' });
        }

        return res.status(200).json(chidiya);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const clearChidiyas = async (req, res) => {
    try {
        const { sessionID } = req.params;

        chidiyaService.clearChidiyas(sessionID);

        return res.status(200).json({ message: 'All Chidiyas cleared' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    addChidiya,
    pickRandomChidiya,
    clearChidiyas,
};
