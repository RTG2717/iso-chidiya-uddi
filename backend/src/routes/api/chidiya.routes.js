const express = require('express');
const router = express.Router();

const {
    addChidiya,
    clearChidiyas,
} = require('../../controllers/chidiya.controller');

router.post('/:sessionID', addChidiya);
router.delete('/:sessionID', clearChidiyas);

module.exports = router;
