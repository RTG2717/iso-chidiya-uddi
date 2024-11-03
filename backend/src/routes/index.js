const express = require('express');
const router = express.Router();

const sessionRoutes = require('./api/session.routes');

router.use('/api/sessions', sessionRoutes);

module.exports = router;
