// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');

//Google OAuth - Redirection vers Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth - Callback après authentification Google
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/google/error' }),
    authController.googleCallback
);

//Mobile Token - Pour React Native (token directement)
router.post('/mobile-token', authController.mobileToken);

//Logout
router.post('/logout', authController.logout);

// Erreur Google
router.get('/google/error', (req, res) => {
    res.status(401).json({ error: 'Authentification Google échouée' });
});

module.exports = router;
