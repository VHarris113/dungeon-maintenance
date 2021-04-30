const router = require('express').Router();
const characterRoutes = require('./characterRoutes');
const userRoutes = require('./userRoutes');

router.use('/character', characterRoutes);
router.use('/user', userRoutes);

module.exports = router;