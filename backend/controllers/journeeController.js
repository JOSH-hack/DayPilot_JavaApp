// controllers/journeeController.js

const repo = require('../repository/journeeRepository');

const getAll = async (req, res, next) => {
    try {
        res.json(await repo.findAll());
    } catch (err) { next(err); }
};

const getById = async (req, res, next) => {
    try {
        const journee = await repo.findById(req.params.id);
        if (!journee) return res.status(404).json({ error: 'Journée non trouvée' });
        res.json(journee);
    } catch (err) { next(err); }
};

const getByUtilisateur = async (req, res, next) => {
    try {
        res.json(await repo.findByUtilisateur(req.params.id_utilisateur));
    } catch (err) { next(err); }
};

// POST — crée ou retourne la journée existante pour la date + utilisateur
const findOrCreate = async (req, res, next) => {
    try {
        const { date, id_utilisateur } = req.body;
        if (!date || !id_utilisateur) {
            return res.status(400).json({ error: 'date et id_utilisateur sont requis' });
        }
        const journee = await repo.findOrCreate(date, id_utilisateur);
        res.status(201).json(journee);
    } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
    try {
        const deleted = await repo.remove(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Journée non trouvée' });
        res.json({ message: 'Journée supprimée', id: deleted.id_journee });
    } catch (err) { next(err); }
};

module.exports = { getAll, getById, getByUtilisateur, findOrCreate, remove };