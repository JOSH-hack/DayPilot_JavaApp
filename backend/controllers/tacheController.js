// controllers/tacheController.js

const repo = require('../repository/tacheRepository');
const journeeRepo = require('../repository/journeeRepository');

const STATUTS_VALIDES = ['en attente', 'en cours', 'terminée', 'annulée'];

const getAll = async (req, res, next) => {
    try {
        const taches = await repo.findAll();
        res.json(taches);
    } catch (err) {
        next(err);
    }
};

const getById = async (req, res, next) => {
    try {
        const tache = await repo.findById(req.params.id);
        if (!tache) return res.status(404).json({ error: 'Tâche non trouvée' });
        res.json(tache);
    } catch (err) {
        next(err);
    }
};

const getByJournee = async (req, res, next) => {
    try {
        const taches = await repo.findByJournee(req.params.id_journee);
        res.json(taches);
    } catch (err) {
        next(err);
    }
};

// GET /api/taches/utilisateur/:id_utilisateur/date/:date
const getByUtilisateurEtDate = async (req, res, next) => {
    try {
        const { id_utilisateur, date } = req.params;
        const taches = await repo.findByUtilisateurEtDate(id_utilisateur, date);
        res.json(taches);
    } catch (err) {
        next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const { titre, description, heure_debut, heure_fin, statut, id_journee, id_priorite, id_categorie } = req.body;

        if (!titre || !heure_debut || !heure_fin || !id_journee || !id_priorite || !id_categorie) {
            return res.status(400).json({ error: 'titre, heure_debut, heure_fin, id_journee, id_priorite et id_categorie sont requis' });
        }

        if (statut && !STATUTS_VALIDES.includes(statut)) {
            return res.status(400).json({ error: `statut invalide. Valeurs acceptées : ${STATUTS_VALIDES.join(', ')}` });
        }

        if (heure_fin <= heure_debut) {
            return res.status(400).json({ error: 'heure_fin doit être postérieure à heure_debut' });
        }

        const tache = await repo.create({ titre, description, heure_debut, heure_fin, statut, id_journee, id_priorite, id_categorie });
        res.status(201).json(tache);
    } catch (err) {
        // Conflit d'heure de début (contrainte UNIQUE)
        if (err.code === '23505') {
            return res.status(409).json({ error: 'Une tâche commence déjà à cette heure dans cette journée' });
        }
        next(err);
    }
};

const update = async (req, res, next) => {
    try {
        const { titre, description, heure_debut, heure_fin, statut, id_priorite, id_categorie } = req.body;

        if (statut && !STATUTS_VALIDES.includes(statut)) {
            return res.status(400).json({ error: `statut invalide. Valeurs acceptées : ${STATUTS_VALIDES.join(', ')}` });
        }

        if (heure_debut && heure_fin && heure_fin <= heure_debut) {
            return res.status(400).json({ error: 'heure_fin doit être postérieure à heure_debut' });
        }

        const tache = await repo.update(req.params.id, { titre, description, heure_debut, heure_fin, statut, id_priorite, id_categorie });
        if (!tache) return res.status(404).json({ error: 'Tâche non trouvée' });
        res.json(tache);
    } catch (err) {
        if (err.code === '23505') {
            return res.status(409).json({ error: 'Une tâche commence déjà à cette heure dans cette journée' });
        }
        next(err);
    }
};

const remove = async (req, res, next) => {
    try {
        const deleted = await repo.remove(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Tâche non trouvée' });
        res.json({ message: 'Tâche supprimée', id: deleted.id_tache });
    } catch (err) {
        next(err);
    }
};

module.exports = { getAll, getById, getByJournee, getByUtilisateurEtDate, create, update, remove };