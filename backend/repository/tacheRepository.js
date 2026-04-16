// repository/tacheRepository.js

const pool = require('../config/db');

const findAll = async () => {
    const result = await pool.query(`
    SELECT t.*, p.libelle AS priorite, c.nom AS categorie, c.couleur
    FROM TACHE t
    JOIN PRIORITE p ON t.id_priorite = p.id_priorite
    JOIN CATEGORIE c ON t.id_categorie = c.id_categorie
    ORDER BY t.heure_debut
  `);
    return result.rows;
};

const findById = async (id) => {
    const result = await pool.query(`
    SELECT t.*, p.libelle AS priorite, c.nom AS categorie, c.couleur
    FROM TACHE t
    JOIN PRIORITE p ON t.id_priorite = p.id_priorite
    JOIN CATEGORIE c ON t.id_categorie = c.id_categorie
    WHERE t.id_tache = $1
  `, [id]);
    return result.rows[0] || null;
};

const findByJournee = async (id_journee) => {
    const result = await pool.query(`
    SELECT t.*, p.libelle AS priorite, c.nom AS categorie, c.couleur
    FROM TACHE t
    JOIN PRIORITE p ON t.id_priorite = p.id_priorite
    JOIN CATEGORIE c ON t.id_categorie = c.id_categorie
    WHERE t.id_journee = $1
    ORDER BY t.heure_debut
  `, [id_journee]);
    return result.rows;
};

const findByUtilisateurEtDate = async (id_utilisateur, date) => {
    const result = await pool.query(`
    SELECT t.*, p.libelle AS priorite, c.nom AS categorie, c.couleur
    FROM TACHE t
    JOIN JOURNEE j ON t.id_journee = j.id_journee
    JOIN PRIORITE p ON t.id_priorite = p.id_priorite
    JOIN CATEGORIE c ON t.id_categorie = c.id_categorie
    WHERE j.id_utilisateur = $1 AND j.date_journee = $2
    ORDER BY t.heure_debut
  `, [id_utilisateur, date]);
    return result.rows;
};

const create = async ({ titre, description, heure_debut, heure_fin, statut, id_journee, id_priorite, id_categorie }) => {
    const result = await pool.query(`
    INSERT INTO TACHE (titre, description, heure_debut, heure_fin, statut, id_journee, id_priorite, id_categorie)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `, [titre, description || null, heure_debut, heure_fin, statut || 'en attente', id_journee, id_priorite, id_categorie]);
    return result.rows[0];
};

const update = async (id, { titre, description, heure_debut, heure_fin, statut, id_priorite, id_categorie }) => {
    const result = await pool.query(`
    UPDATE TACHE
    SET titre       = COALESCE($1, titre),
        description = COALESCE($2, description),
        heure_debut = COALESCE($3, heure_debut),
        heure_fin   = COALESCE($4, heure_fin),
        statut      = COALESCE($5, statut),
        id_priorite = COALESCE($6, id_priorite),
        id_categorie= COALESCE($7, id_categorie)
    WHERE id_tache = $8
    RETURNING *
  `, [titre, description, heure_debut, heure_fin, statut, id_priorite, id_categorie, id]);
    return result.rows[0] || null;
};

const remove = async (id) => {
    const result = await pool.query(
        'DELETE FROM TACHE WHERE id_tache = $1 RETURNING id_tache',
        [id]
    );
    return result.rows[0] || null;
};

module.exports = { findAll, findById, findByJournee, findByUtilisateurEtDate, create, update, remove };