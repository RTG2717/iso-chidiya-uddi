const express = require('express');
const router = express.Router();
const {
    createSession,
    getSessionbyID,
    getSessionbyCode,
    deleteSession,
} = require('../../controllers/session.controller');

// Route to create new session
router.post('/', createSession);

// Get session from given session ID
router.get('/:sessionID', getSessionbyID);

// Get session from given code
router.get('/code/:sessionCode', getSessionbyCode);

// Delete a session from data
router.delete('/:sessionID', deleteSession);

module.exports = router;
