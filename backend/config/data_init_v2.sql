-- data_init_v2.sql — Données de test corrigées pour PostgreSQL
-- Corrections : statut et type_rappel alignés avec les contraintes CHECK du MPD

INSERT INTO UTILISATEUR (nom, email, mot_de_passe, theme_prefere) VALUES
('Josh',  'josh@daypilot.app',  'hashed_password_123', 'sombre'),
('Claire', 'alice@daypilot.app', 'hashed_password_456', 'clair');

INSERT INTO PRIORITE (libelle) VALUES
('Faible'),
('Moyenne'),
('Élevée');

INSERT INTO CATEGORIE (nom, couleur) VALUES
('Études',    '#4CAF50'),
('Sport',     '#2196F3'),
('Gaming',    '#9C27B0'),
('Personnel', '#FF9800');

INSERT INTO JOURNEE (date_journee, id_utilisateur) VALUES
('2026-01-09', 1),
('2026-01-10', 1),
('2026-01-09', 2);

INSERT INTO TACHE (titre, description, heure_debut, heure_fin, statut, id_journee, id_priorite, id_categorie) VALUES
('Réviser MERISE',   'MCD, MLD et MPD pour le projet DayPilot', '08:00', '10:00', 'en attente', 1, 3, 1),
('Séance de sport',  'Cardio et renforcement des jambes',                  '17:00', '18:30', 'en attente', 1, 2, 2),
('Session gaming',   'Call of Duty Mobile ranked',              '21:00', '23:00', 'en attente', 2, 1, 3);

INSERT INTO RAPPEL (date_rappel, heure_rappel, type_rappel, actif, id_tache) VALUES
('2026-01-09', '07:45', 'notification', TRUE, 1),
('2026-01-09', '16:45', 'notification', TRUE, 2),
('2026-01-10', '20:45', 'popup',        TRUE, 3);