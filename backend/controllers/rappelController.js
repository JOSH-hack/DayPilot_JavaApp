// controllers/rappelController.js

const repo = require('../repository/rappelRepository');

const TYPES_VALIDES = ['notification', 'email', 'popup'];

const getAll = async (req, res, next) => {
    try {
        const rappels = await repo.findAll();
        res.json(rappels);
    } catch (err) {
        next(err);
    }
};

const getById = async (req, res, next) => {
    try {
        const rappel = await repo.findById(req.params.id);
        if (!rappel) return res.status(404).json({ error: 'Rappel non trouvé' });
        res.json(rappel);
    } catch (err) {
        next(err);
    }
};

const getByTache = async (req, res, next) => {
    try {
        const rappels = await repo.findByTache(req.params.id_tache);
        res.json(rappels);
    } catch (err) {
        next(err);
    }
};

const getActifs = async (req, res, next) => {
    try {
        const rappels = await repo.findActifs();
        res.json(rappels);
    } catch (err) {
        next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const { date_rappel, heure_rappel, type_rappel, actif, id_tache } = req.body;

        if (!date_rappel || !heure_rappel || !type_rappel || !id_tache) {
            return res.status(400).json({ error: 'date_rappel, heure_rappel, type_rappel et id_tache sont requis' });
        }

        if (!TYPES_VALIDES.includes(type_rappel)) {
            return res.status(400).json({ error: `type_rappel invalide. Valeurs acceptées : ${TYPES_VALIDES.join(', ')}` });
        }

        const rappel = await repo.create({ date_rappel, heure_rappel, type_rappel, actif, id_tache });
        res.status(201).json(rappel);
    } catch (err) {
        if (err.message.includes('Conflit de rappel')) {
            return res.status(409).json({ error: err.message });
        }
        next(err);
    }
};

const update = async (req, res, next) => {
    try {
        const { date_rappel, heure_rappel, type_rappel, actif } = req.body;

        if (type_rappel && !TYPES_VALIDES.includes(type_rappel)) {
            return res.status(400).json({ error: `type_rappel invalide. Valeurs acceptées : ${TYPES_VALIDES.join(', ')}` });
        }

        const rappel = await repo.update(req.params.id, { date_rappel, heure_rappel, type_rappel, actif });
        if (!rappel) return res.status(404).json({ error: 'Rappel non trouvé' });
        res.json(rappel);
    } catch (err) {
        next(err);
    }
};

const remove = async (req, res, next) => {
    try {
        const deleted = await repo.remove(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Rappel non trouvé' });
        res.json({ message: 'Rappel supprimé', id: deleted.id_rappel });
    } catch (err) {
        next(err);
    }
};

module.exports = { getAll, getById, getByTache, getActifs, create, update, remove };