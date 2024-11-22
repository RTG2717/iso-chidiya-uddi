const express = require('express');
const router = express.Router();

const {
    createUser,
    updateUser,
    getUser,
} = require('../../controllers/clients.controller');

router.post('/', createUser);
router.put('/:clientID', updateUser);
router.get('/:clientID', getUser);

module.exports = router;
