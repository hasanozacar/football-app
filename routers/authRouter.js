const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Kullanıcı kaydı (signup) endpoint'i
router.post('/signup', authController.signup);

// Kullanıcı girişi (login) endpoint'i
router.post('/login', authController.login);

module.exports = router;
