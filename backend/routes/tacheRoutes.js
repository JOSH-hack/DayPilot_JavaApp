// routes/tacheRoutes.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/tacheController');

router.get('/', ctrl.getAll);
router.get('/journee/:id_journee', ctrl.getByJournee);
router.get('/utilisateur/:id_utilisateur/date/:date', ctrl.getByUtilisateurEtDate);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;