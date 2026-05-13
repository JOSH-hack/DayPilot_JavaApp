// middlewares/authMiddleware.js — Protéger les routes avec JWT

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        // Récupérer le header Authorization
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: 'Token manquant' });
        }

        // Vérifier le format Bearer <token>
        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({ error: 'Format invalide (Bearer <token> attendu)' });
        }

        const token = parts[1];

        // Vérifier et décoder le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret-dev-key');

        // Stocker le payload dans req.user
        req.user = decoded;

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expiré' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Token invalide' });
        }
        return res.status(401).json({ error: error.message });
    }
};

module.exports = authMiddleware;
