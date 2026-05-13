// controllers/utilisateurController.js

const repo = require('../repository/utilisateurRepository');
const bcrypt = require('bcrypt');

const getAll = async (req, res, next) => {
    try {
        const utilisateurs = await repo.findAll();
        res.json(utilisateurs);
    } catch (err) {
        next(err);
    }
};

const getById = async (req, res, next) => {
    try {
        const utilisateur = await repo.findById(req.params.id);
        if (!utilisateur) return res.status(404).json({ error: 'Utilisateur non trouvé' });
        res.json(utilisateur);
    } catch (err) {
        next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const { nom, email, mot_de_passe, theme_prefere } = req.body;

        if (!nom || !email || !mot_de_passe) {
            return res.status(400).json({ error: 'nom, email et mot_de_passe sont requis' });
        }

        // Vérifier unicité email
        const existant = await repo.findByEmail(email);
        if (existant) return res.status(409).json({ error: 'Cet email est déjà utilisé' });

        const themeValides = ['clair', 'sombre', 'auto'];
        if (theme_prefere && !themeValides.includes(theme_prefere)) {
            return res.status(400).json({ error: 'theme_prefere doit être clair, sombre ou auto' });
        }

        const hash = await bcrypt.hash(mot_de_passe, 10);
        const utilisateur = await repo.create({ nom, email, mot_de_passe: hash, theme_prefere });
        res.status(201).json(utilisateur);
    } catch (err) {
        next(err);
    }
};

const update = async (req, res, next) => {
    try {
        const { nom, email, theme_prefere } = req.body;

        const themeValides = ['clair', 'sombre', 'auto'];
        if (theme_prefere && !themeValides.includes(theme_prefere)) {
            return res.status(400).json({ error: 'theme_prefere doit être clair, sombre ou auto' });
        }

        const utilisateur = await repo.update(req.params.id, { nom, email, theme_prefere });
        if (!utilisateur) return res.status(404).json({ error: 'Utilisateur non trouvé' });
        res.json(utilisateur);
    } catch (err) {
        next(err);
    }
};

const remove = async (req, res, next) => {
    try {
        const deleted = await repo.remove(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Utilisateur non trouvé' });
        res.json({ message: 'Utilisateur supprimé', id: deleted.id_utilisateur });
    } catch (err) {
        next(err);
    }
};

module.exports = { getAll, getById, create, update, remove };