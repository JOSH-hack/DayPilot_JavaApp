// controllers/prioriteController.js

const repo = require('../repository/prioriteRepository');

const getAll = async (req, res, next) => {
    try {
        res.json(await repo.findAll());
    } catch (err) { next(err); }
};

const getById = async (req, res, next) => {
    try {
        const priorite = await repo.findById(req.params.id);
        if (!priorite) return res.status(404).json({ error: 'Priorité non trouvée' });
        res.json(priorite);
    } catch (err) { next(err); }
};

const create = async (req, res, next) => {
    try {
        const { libelle } = req.body;
        if (!libelle) return res.status(400).json({ error: 'libelle est requis' });
        const priorite = await repo.create({ libelle });
        res.status(201).json(priorite);
    } catch (err) {
        if (err.code === '23505') return res.status(409).json({ error: 'Ce libellé existe déjà' });
        next(err);
    }
};

const remove = async (req, res, next) => {
    try {
        const deleted = await repo.remove(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Priorité non trouvée' });
        res.json({ message: 'Priorité supprimée', id: deleted.id_priorite });
    } catch (err) {
        if (err.code === '23503') return res.status(409).json({ error: 'Cette priorité est utilisée par des tâches' });
        next(err);
    }
};

module.exports = { getAll, getById, create, remove };