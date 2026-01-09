--data_init.sql

--Ces données permettent de tester rapidement les fonctionnalités principales de l’application DayPilot.

INSERT INTO UTILISATEUR (nom, email, mot_de_passe, theme_prefere)
VALUES
('Josh', 'josh@daypilot.app', 'hashed_password_123', 'dark'),
('Alice', 'alice@daypilot.app', 'hashed_password_456', 'light');

INSERT INTO PRIORITE (libelle)
VALUES
('Faible'),
('Moyenne'),
('Élevée');

INSERT INTO CATEGORIE (nom, couleur)
VALUES
('Études', '#4CAF50'),
('Sport', '#2196F3'),
('Gaming', '#9C27B0'),
('Personnel', '#FF9800');

INSERT INTO JOURNEE (date_journee, id_utilisateur)
VALUES
('2026-01-09', 1),
('2026-01-10', 1),
('2026-01-09', 2);

INSERT INTO TACHE (
    titre,
    description,
    heure_debut,
    heure_fin,
    statut,
    id_journee,
    id_priorite,
    id_categorie
)
VALUES
(
    'Réviser MERISE',
    'MCD, MLD et MPD pour le projet DayPilot',
    '08:00',
    '10:00',
    'Prévue',
    1,
    3,
    1
),
(
    'Séance de sport',
    'Cardio et renforcement',
    '17:00',
    '18:30',
    'Prévue',
    1,
    2,
    2
),
(
    'Session gaming',
    'Call of Duty Mobile ranked',
    '21:00',
    '23:00',
    'Prévue',
    2,
    1,
    3
);

INSERT INTO RAPPEL (
    date_rappel,
    heure_rappel,
    type_rappel,
    actif,
    id_tache
)
VALUES
(
    '2026-01-09',
    '07:45',
    'Notification',
    1,
    1
),
(
    '2026-01-09',
    '16:45',
    'Notification',
    1,
    2
),
(
    '2026-01-10',
    '20:45',
    'Alarme',
    1,
    3
);

