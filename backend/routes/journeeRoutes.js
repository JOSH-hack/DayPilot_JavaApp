// routes/journeeRoutes.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/journeeController');

router.get('/', ctrl.getAll);
router.get('/utilisateur/:id_utilisateur', ctrl.getByUtilisateur);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.findOrCreate);
router.delete('/:id', ctrl.remove);

module.exports = router;