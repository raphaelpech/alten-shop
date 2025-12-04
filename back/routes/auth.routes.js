const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// Routes création de compte + login
// publiques, pas de protection
router.post('/account', authController.createAccount);
router.post('/token', authController.login);

module.exports = router;