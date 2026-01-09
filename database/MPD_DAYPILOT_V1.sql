-- MPD_DAYPILOT_V1.sql 

CREATE TABLE UTILISATEUR (
    id_utilisateur INTEGER PRIMARY KEY AUTOINCREMENT,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    theme_prefere VARCHAR(50),
    CHECK (theme_prefere IN ('clair', 'sombre', 'auto') OR theme_prefere IS NULL)
);

CREATE TABLE PRIORITE (
    id_priorite INTEGER PRIMARY KEY AUTOINCREMENT,
    libelle VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE CATEGORIE (
    id_categorie INTEGER PRIMARY KEY AUTOINCREMENT,
    nom VARCHAR(100) NOT NULL UNIQUE,
    couleur VARCHAR(20) NOT NULL
);

CREATE TABLE JOURNEE (
    id_journee INTEGER PRIMARY KEY AUTOINCREMENT,
    date_journee DATE NOT NULL,
    id_utilisateur INTEGER NOT NULL,
    FOREIGN KEY (id_utilisateur)
        REFERENCES UTILISATEUR(id_utilisateur)
        ON DELETE CASCADE,
    UNIQUE (date_journee, id_utilisateur)
);

CREATE TABLE TACHE (
    id_tache INTEGER PRIMARY KEY AUTOINCREMENT,
    titre VARCHAR(150) NOT NULL,
    description TEXT,
    heure_debut TIME NOT NULL,
    heure_fin TIME NOT NULL,
    statut VARCHAR(30) NOT NULL,
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
    UNIQUE (id_journee, heure_debut) -- Empêche deux tâches ayant la même heure de début dans une même journée
);

CREATE TABLE RAPPEL (
    id_rappel INTEGER PRIMARY KEY AUTOINCREMENT,
    date_rappel DATE NOT NULL,
    heure_rappel TIME NOT NULL,
    type_rappel VARCHAR(50) NOT NULL,
    actif BOOLEAN NOT NULL DEFAULT 1,
    id_tache INTEGER NOT NULL,
    FOREIGN KEY (id_tache)
        REFERENCES TACHE(id_tache)
        ON DELETE CASCADE,
    CHECK (type_rappel IN ('notification', 'email', 'popup'))
);

-- Trigger pour éviter les rappels conflictuels (même tâche, même date et heure)
CREATE TRIGGER trg_verif_rappel_conflit
BEFORE INSERT ON RAPPEL
FOR EACH ROW
BEGIN
    SELECT
    CASE
        WHEN EXISTS (
            SELECT 1 FROM RAPPEL
            WHERE id_tache = NEW.id_tache
              AND date_rappel = NEW.date_rappel
              AND heure_rappel = NEW.heure_rappel
              AND actif = 1
        )
        THEN RAISE(ABORT, 'Conflit de rappel: un rappel actif existe déjà à cette date et heure pour cette tâche.')
    END;
END;

