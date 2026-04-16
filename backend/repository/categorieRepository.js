// repository/categorieRepository.js

const pool = require('../config/db');

const findAll = async () => {
    const result = await pool.query('SELECT * FROM CATEGORIE ORDER BY nom');
    return result.rows;
};

const findById = async (id) => {
    const result = await pool.query('SELECT * FROM CATEGORIE WHERE id_categorie = $1', [id]);
    return result.rows[0] || null;
};

const create = async ({ nom, couleur }) => {
    const result = await pool.query(
        'INSERT INTO CATEGORIE (nom, couleur) VALUES ($1, $2) RETURNING *',
        [nom, couleur]
    );
    return result.rows[0];
};

const update = async (id, { nom, couleur }) => {
    const result = await pool.query(
        `UPDATE CATEGORIE SET nom = COALESCE($1, nom), couleur = COALESCE($2, couleur)
     WHERE id_categorie = $3 RETURNING *`,
        [nom, couleur, id]
    );
    return result.rows[0] || null;
};

const remove = async (id) => {
    const result = await pool.query(
        'DELETE FROM CATEGORIE WHERE id_categorie = $1 RETURNING id_categorie',
        [id]
    );
    return result.rows[0] || null;
};

module.exports = { findAll, findById, create, update, remove };