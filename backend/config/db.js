// config/db.js — Connexion PostgreSQL

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'daypilot',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
});

pool.on('connect', () => {
    console.log('✅ Connexion PostgreSQL établie');
});

pool.on('error', (err) => {
    console.error('Erreur PostgreSQL :', err.message);
    process.exit(1);
});

module.exports = pool;