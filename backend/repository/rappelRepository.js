// repository/rappelRepository.js

const pool = require('../config/db');

const findAll = async () => {
    const result = await pool.query('SELECT * FROM RAPPEL ORDER BY date_rappel, heure_rappel');
    return result.rows;
};

const findById = async (id) => {
    const result = await pool.query('SELECT * FROM RAPPEL WHERE id_rappel = $1', [id]);
    return result.rows[0] || null;
};

const findByTache = async (id_tache) => {
    const result = await pool.query(
        'SELECT * FROM RAPPEL WHERE id_tache = $1 ORDER BY date_rappel, heure_rappel',
        [id_tache]
    );
    return result.rows;
};

const findActifs = async () => {
    const result = await pool.query(
        'SELECT * FROM RAPPEL WHERE actif = TRUE ORDER BY date_rappel, heure_rappel'
    );
    return result.rows;
};

const create = async ({ date_rappel, heure_rappel, type_rappel, actif, id_tache }) => {
    // Vérification conflit (équivalent du trigger SQLite)
    const conflit = await pool.query(`
    SELECT 1 FROM RAPPEL
    WHERE id_tache = $1 AND date_rappel = $2 AND heure_rappel = $3 AND actif = TRUE
  `, [id_tache, date_rappel, heure_rappel]);

    if (conflit.rows.length > 0) {
        throw new Error('Conflit de rappel : un rappel actif existe déjà à cette date et heure pour cette tâche.');
    }

    const result = await pool.query(`
    INSERT INTO RAPPEL (date_rappel, heure_rappel, type_rappel, actif, id_tache)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `, [date_rappel, heure_rappel, type_rappel, actif !== undefined ? actif : true, id_tache]);
    return result.rows[0];
};

const update = async (id, { date_rappel, heure_rappel, type_rappel, actif }) => {
    const result = await pool.query(`
    UPDATE RAPPEL
    SET date_rappel  = COALESCE($1, date_rappel),
        heure_rappel = COALESCE($2, heure_rappel),
        type_rappel  = COALESCE($3, type_rappel),
        actif        = COALESCE($4, actif)
    WHERE id_rappel = $5
    RETURNING *
  `, [date_rappel, heure_rappel, type_rappel, actif, id]);
    return result.rows[0] || null;
};

const remove = async (id) => {
    const result = await pool.query(
        'DELETE FROM RAPPEL WHERE id_rappel = $1 RETURNING id_rappel',
        [id]
    );
    return result.rows[0] || null;
};

module.exports = { findAll, findById, findByTache, findActifs, create, update, remove };