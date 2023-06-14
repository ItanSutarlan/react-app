const express = require('express');
const AuthController = require('../controllers/auth');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');
const router = express.Router();

router.post(
  '/register',
  authentication,
  authorization,
  AuthController.register,
);
router.post('/login', AuthController.login);

module.exports = router;
