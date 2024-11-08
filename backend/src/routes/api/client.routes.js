const express = require('express');
const router = express.Router();

const {
    createUser,
    getUser,
} = require('../../controllers/clients.controller');

router.post('/', createUser);
router.get('/:clientID', getUser);

module.exports = router;
