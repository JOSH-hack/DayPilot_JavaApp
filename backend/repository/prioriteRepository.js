// repository/prioriteRepository.js

const pool = require('../config/db');

const findAll = async () => {
    const result = await pool.query('SELECT * FROM PRIORITE ORDER BY id_priorite');
    return result.rows;
};

const findById = async (id) => {
    const result = await pool.query('SELECT * FROM PRIORITE WHERE id_priorite = $1', [id]);
    return result.rows[0] || null;
};

const create = async ({ libelle }) => {
    const result = await pool.query(
        'INSERT INTO PRIORITE (libelle) VALUES ($1) RETURNING *',
        [libelle]
    );
    return result.rows[0];
};

const remove = async (id) => {
    const result = await pool.query(
        'DELETE FROM PRIORITE WHERE id_priorite = $1 RETURNING id_priorite',
        [id]
    );
    return result.rows[0] || null;
};

module.exports = { findAll, findById, create, remove };