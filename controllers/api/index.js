const router = require('express').Router();
const characterRoutes = require('../api/characterRoutes');
const userRoutes = require('../api/userRoutes');

router.use('/character', characterRoutes);
router.use('/users', userRoutes);

module.exports = router;