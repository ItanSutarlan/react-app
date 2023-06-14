const express = require('express');
const authRoutes = require('./auth');
const postRoutes = require('./post');
const categoryRoutes = require('./category');
const authentication = require('../middlewares/authentication');
const publicRoutes = require('./public');

const router = express.Router();

router.use('/', authRoutes);

router.use('/posts', authentication, postRoutes);
router.use('/categories', authentication, categoryRoutes);

router.use('/public', publicRoutes);

module.exports = router;
