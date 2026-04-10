const express = require('express');
const router = express.Router();
const { register, login, switchRole } = require('../controllers/authController');
const verifyToken = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/switch-role', verifyToken, switchRole);

module.exports = router;
