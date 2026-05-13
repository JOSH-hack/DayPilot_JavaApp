// app.js — Point d'entrée du serveur DayPilot

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passport');
const errorHandler = require('./middlewares/errorHandler');

// Routes
const utilisateurRoutes = require('./routes/utilisateurRoutes');
const journeeRoutes = require('./routes/journeeRoutes');
const tacheRoutes = require('./routes/tacheRoutes');
const rappelRoutes = require('./routes/rappelRoutes');
const prioriteRoutes = require('./routes/prioriteRoutes');
const categorieRoutes = require('./routes/categorieRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());

// Session & Passport
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'secret-dev-session',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // À mettre à true en production avec HTTPS
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes API
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/journees', journeeRoutes);
app.use('/api/taches', tacheRoutes);
app.use('/api/rappels', rappelRoutes);
app.use('/api/priorites', prioriteRoutes);
app.use('/api/categories', categorieRoutes);
app.use('/auth', authRoutes);

// Route de santé
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'DayPilot API is running' });
});

// Gestion des routes inexistantes
app.use((req, res) => {
    res.status(404).json({ error: 'Route non trouvée' });
});

// Gestionnaire d'erreurs global
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(` Serveur DayPilot démarré sur le port ${PORT}`);
});

module.exports = app;