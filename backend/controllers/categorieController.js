// controllers/categorieController.js

const repo = require('../repository/categorieRepository');

const getAll = async (req, res, next) => {
    try {
        res.json(await repo.findAll());
    } catch (err) { next(err); }
};

const getById = async (req, res, next) => {
    try {
        const cat = await repo.findById(req.params.id);
        if (!cat) return res.status(404).json({ error: 'Catégorie non trouvée' });
        res.json(cat);
    } catch (err) { next(err); }
};

const create = async (req, res, next) => {
    try {
        const { nom, couleur } = req.body;
        if (!nom || !couleur) return res.status(400).json({ error: 'nom et couleur sont requis' });
        const cat = await repo.create({ nom, couleur });
        res.status(201).json(cat);
    } catch (err) {
        if (err.code === '23505') return res.status(409).json({ error: 'Cette catégorie existe déjà' });
        next(err);
    }
};

const update = async (req, res, next) => {
    try {
        const { nom, couleur } = req.body;
        const cat = await repo.update(req.params.id, { nom, couleur });
        if (!cat) return res.status(404).json({ error: 'Catégorie non trouvée' });
        res.json(cat);
    } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
    try {
        const deleted = await repo.remove(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Catégorie non trouvée' });
        res.json({ message: 'Catégorie supprimée', id: deleted.id_categorie });
    } catch (err) {
        if (err.code === '23503') return res.status(409).json({ error: 'Cette catégorie est utilisée par des tâches' });
        next(err);
    }
};

module.exports = { getAll, getById, create, update, remove };