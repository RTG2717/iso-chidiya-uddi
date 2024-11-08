const express = require('express');
const router = express.Router();

const sessionRoutes = require('./api/session.routes');
const clientRoutes = require('./api/client.routes');

router.use('/api/sessions', sessionRoutes);
router.use('/api/clients', clientRoutes);

module.exports = router;
