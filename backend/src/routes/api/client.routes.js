const express = require('express');
const router = express.Router();

const { createUser } = require('../../controllers/clients.controller');

router.post('/', createUser);

module.exports = router;
