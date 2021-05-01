const router = require('express').Router();
const characterRoutes = require('./characterRoutes');
const userRoutes = require('./userRoutes');


router.use('/character', characterRoutes);

router.use('/users', userRoutes);

module.exports = router;
