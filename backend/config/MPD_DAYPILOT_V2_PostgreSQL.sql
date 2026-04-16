-- MPD_DAYPILOT_V2_PostgreSQL.sql
-- Version adaptée pour PostgreSQL (SERIAL, contraintes corrigées)

CREATE TABLE UTILISATEUR (
    id_utilisateur SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    theme_prefere VARCHAR(50),
    CHECK (theme_prefere IN ('clair', 'sombre', 'auto') OR theme_prefere IS NULL)
);

CREATE TABLE PRIORITE (
    id_priorite SERIAL PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE CATEGORIE (
    id_categorie SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL UNIQUE,
    couleur VARCHAR(20) NOT NULL
);

CREATE TABLE JOURNEE (
    id_journee SERIAL PRIMARY KEY,
    date_journee DATE NOT NULL,
    id_utilisateur INTEGER NOT NULL,
    FOREIGN KEY (id_utilisateur)
        REFERENCES UTILISATEUR(id_utilisateur)
        ON DELETE CASCADE,
    UNIQUE (date_journee, id_utilisateur)
);

CREATE TABLE TACHE (
    id_tache SERIAL PRIMARY KEY,
    titre VARCHAR(150) NOT NULL,
    description TEXT,
    heure_debut TIME NOT NULL,
    heure_fin TIME NOT NULL,
    statut VARCHAR(30) NOT NULL DEFAULT 'en attente',
    id_journee INTEGER NOT NULL,
    id_priorite INTEGER NOT NULL,
    id_categorie INTEGER NOT NULL,
    FOREIGN KEY (id_journee)
        REFERENCES JOURNEE(id_journee)
        ON DELETE CASCADE,
    FOREIGN KEY (id_priorite)
        REFERENCES PRIORITE(id_priorite)
        ON DELETE RESTRICT,
    FOREIGN KEY (id_categorie)
        REFERENCES CATEGORIE(id_categorie)
        ON DELETE RESTRICT,
    CHECK (heure_fin > heure_debut),
    CHECK (statut IN ('en attente', 'en cours', 'terminée', 'annulée')),
    UNIQUE (id_journee, heure_debut)
);

CREATE TABLE RAPPEL (
    id_rappel SERIAL PRIMARY KEY,
    date_rappel DATE NOT NULL,
    heure_rappel TIME NOT NULL,
    type_rappel VARCHAR(50) NOT NULL,
    actif BOOLEAN NOT NULL DEFAULT TRUE,
    id_tache INTEGER NOT NULL,
    FOREIGN KEY (id_tache)
        REFERENCES TACHE(id_tache)
        ON DELETE CASCADE,
    CHECK (type_rappel IN ('notification', 'email', 'popup')),
    UNIQUE (id_tache, date_rappel, heure_rappel)
);