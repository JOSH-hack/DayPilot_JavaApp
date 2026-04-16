// app.js — Point d'entrée du serveur DayPilot

const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

// Routes
const utilisateurRoutes = require('./routes/utilisateurRoutes');
const journeeRoutes = require('./routes/journeeRoutes');
const tacheRoutes = require('./routes/tacheRoutes');
const rappelRoutes = require('./routes/rappelRoutes');
const prioriteRoutes = require('./routes/prioriteRoutes');
const categorieRoutes = require('./routes/categorieRoutes');

const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());

// Routes API
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/journees', journeeRoutes);
app.use('/api/taches', tacheRoutes);
app.use('/api/rappels', rappelRoutes);
app.use('/api/priorites', prioriteRoutes);
app.use('/api/categories', categorieRoutes);

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
    console.log(`🚀 Serveur DayPilot démarré sur le port ${PORT}`);
});

module.exports = app;