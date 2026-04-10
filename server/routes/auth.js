const express = require('express');
const passport = require('passport');
const router = express.Router();
const { getCurrentUser, switchRole, updateGstin, logout } = require('../controllers/authController');
const verifyToken = require('../middleware/auth');

// Google OAuth routes
router.get('/google', 
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: `${process.env.CLIENT_URL || 'http://localhost:5176'}/login` }),
    (req, res) => {
        // Successful authentication, redirect to client
        res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5176'}/dashboard`);
    }
);

// Protected routes
router.get('/me', verifyToken, getCurrentUser);
router.post('/switch-role', verifyToken, switchRole);
router.put('/gstin', verifyToken, updateGstin);
router.post('/logout', logout);

module.exports = router;
