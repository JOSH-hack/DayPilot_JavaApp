// repository/journeeRepository.js

const pool = require('../config/db');

const findAll = async () => {
    const result = await pool.query('SELECT * FROM JOURNEE ORDER BY date_journee DESC');
    return result.rows;
};

const findById = async (id) => {
    const result = await pool.query('SELECT * FROM JOURNEE WHERE id_journee = $1', [id]);
    return result.rows[0] || null;
};

const findByUtilisateur = async (id_utilisateur) => {
    const result = await pool.query(
        'SELECT * FROM JOURNEE WHERE id_utilisateur = $1 ORDER BY date_journee DESC',
        [id_utilisateur]
    );
    return result.rows;
};

const findByDateEtUtilisateur = async (date, id_utilisateur) => {
    const result = await pool.query(
        'SELECT * FROM JOURNEE WHERE date_journee = $1 AND id_utilisateur = $2',
        [date, id_utilisateur]
    );
    return result.rows[0] || null;
};

// Crée la journée si elle n'existe pas encore
const findOrCreate = async (date, id_utilisateur) => {
    let journee = await findByDateEtUtilisateur(date, id_utilisateur);
    if (!journee) {
        const result = await pool.query(
            'INSERT INTO JOURNEE (date_journee, id_utilisateur) VALUES ($1, $2) RETURNING *',
            [date, id_utilisateur]
        );
        journee = result.rows[0];
    }
    return journee;
};

const remove = async (id) => {
    const result = await pool.query(
        'DELETE FROM JOURNEE WHERE id_journee = $1 RETURNING id_journee',
        [id]
    );
    return result.rows[0] || null;
};

module.exports = { findAll, findById, findByUtilisateur, findByDateEtUtilisateur, findOrCreate, remove };