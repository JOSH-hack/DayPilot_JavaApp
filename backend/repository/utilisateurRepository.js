// repository/utilisateurRepository.js

const pool = require('../config/db');

const findAll = async () => {
    const result = await pool.query(
        'SELECT id_utilisateur, nom, email, theme_prefere FROM UTILISATEUR ORDER BY id_utilisateur'
    );
    return result.rows;
};

const findById = async (id) => {
    const result = await pool.query(
        'SELECT id_utilisateur, nom, email, theme_prefere FROM UTILISATEUR WHERE id_utilisateur = $1',
        [id]
    );
    return result.rows[0] || null;
};

const findByEmail = async (email) => {
    const result = await pool.query(
        'SELECT * FROM UTILISATEUR WHERE email = $1',
        [email]
    );
    return result.rows[0] || null;
};

const findByGoogleId = async (google_id) => {
    const result = await pool.query(
        'SELECT * FROM UTILISATEUR WHERE google_id = $1',
        [google_id]
    );
    return result.rows[0] || null;
};

const create = async ({ nom, email, mot_de_passe, theme_prefere, google_id }) => {
    const result = await pool.query(
        `INSERT INTO UTILISATEUR (nom, email, mot_de_passe, theme_prefere, google_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id_utilisateur, nom, email, theme_prefere, google_id`,
        [nom, email, mot_de_passe, theme_prefere || null, google_id || null]
    );
    return result.rows[0];
};

const update = async (id, { nom, email, theme_prefere }) => {
    const result = await pool.query(
        `UPDATE UTILISATEUR
     SET nom = COALESCE($1, nom),
         email = COALESCE($2, email),
         theme_prefere = COALESCE($3, theme_prefere)
     WHERE id_utilisateur = $4
     RETURNING id_utilisateur, nom, email, theme_prefere`,
        [nom, email, theme_prefere, id]
    );
    return result.rows[0] || null;
};

const updateGoogleId = async (id, google_id) => {
    const result = await pool.query(
        `UPDATE UTILISATEUR
     SET google_id = $1
     WHERE id_utilisateur = $2
     RETURNING id_utilisateur, nom, email, theme_prefere, google_id`,
        [google_id, id]
    );
    return result.rows[0] || null;
};

const updateLastLogin = async (id) => {
    const result = await pool.query(
        `UPDATE UTILISATEUR
     SET last_login = NOW()
     WHERE id_utilisateur = $1
     RETURNING id_utilisateur, nom, email, theme_prefere, google_id, last_login`,
        [id]
    );
    return result.rows[0] || null;
};

const remove = async (id) => {
    const result = await pool.query(
        'DELETE FROM UTILISATEUR WHERE id_utilisateur = $1 RETURNING id_utilisateur',
        [id]
    );
    return result.rows[0] || null;
};

module.exports = { findAll, findById, findByEmail, findByGoogleId, create, update, updateGoogleId, updateLastLogin, remove };