// routes/rappelRoutes.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/rappelController');

router.get('/', ctrl.getAll);
router.get('/actifs', ctrl.getActifs);
router.get('/tache/:id_tache', ctrl.getByTache);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;