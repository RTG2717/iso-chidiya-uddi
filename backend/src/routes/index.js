const express = require('express');
const router = express.Router();

const sessionRoutes = require('./api/session.routes');
const clientRoutes = require('./api/client.routes');
const chidiyaRoutes = require('./api/chidiya.routes');

router.use('/api/sessions', sessionRoutes);
router.use('/api/clients', clientRoutes);
router.use('/api/chidiyas', chidiyaRoutes);

module.exports = router;
