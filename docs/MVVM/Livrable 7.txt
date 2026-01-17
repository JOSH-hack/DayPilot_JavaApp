Livrable 7 — Règles métier appliquées dans l’architecture
1. Introduction

Les règles métier constituent le cœur fonctionnel du projet DayPilot.
Ce livrable identifie l’ensemble des règles métier, précise leur objectif, et surtout indique clairement à quel niveau de l’architecture MVVM elles sont appliquées.

L’objectif est de garantir :

L’intégrité des données

La cohérence fonctionnelle

Une application stricte des contraintes métier à tous les niveaux pertinents

2. Principe général d’application des règles métier

Dans le projet DayPilot, les règles métier sont appliquées selon le principe suivant :

Base de données : intégrité structurelle et contraintes fortes

Backend : validation métier stricte et gestion des conflits

Frontend (ViewModel) : pré-validation et amélioration de l’expérience utilisateur

Aucune règle métier critique ne dépend exclusivement du frontend.

3. Liste des règles métier
Règle 1 — Unicité de l’heure de début des tâches

Description
Pour une même journée, deux tâches ne peuvent pas avoir la même heure de début.

Objectif
Éviter les conflits de planning et garantir une organisation cohérente de la journée.

Niveaux d’application

Base de données : contrainte d’unicité (id_journee, heure_debut)

Backend : vérification avant insertion ou modification

ViewModel : alerte utilisateur avant soumission

Règle 2 — Cohérence des horaires d’une tâche

Description
L’heure de fin d’une tâche doit être strictement supérieure à son heure de début.

Objectif
Empêcher les tâches invalides ou incohérentes.

Niveaux d’application

Backend : validation logique

ViewModel : désactivation du bouton de validation si incohérent

Règle 3 — Un rappel doit être lié à une tâche existante

Description
Aucun rappel ne peut exister sans être associé à une tâche valide.

Objectif
Assurer la cohérence entre tâches et rappels.

Niveaux d’application

Base de données : clé étrangère id_tache

Backend : vérification d’existence

ViewModel : filtrage des tâches sélectionnables

Règle 4 — Absence de rappels conflictuels

Description
Deux rappels actifs ne peuvent pas être programmés à la même date et heure pour une même tâche.

Objectif
Éviter les notifications multiples inutiles.

Niveaux d’application

Base de données : contrainte d’unicité (id_tache, date_rappel, heure_rappel)

Backend : gestion des conflits métier (HTTP 409)

ViewModel : message d’erreur explicite

Règle 5 — Une journée appartient à un seul utilisateur

Description
Chaque journée est rattachée à un utilisateur unique.

Objectif
Garantir la séparation des données entre utilisateurs.

Niveaux d’application

Base de données : clé étrangère id_utilisateur

Backend : filtrage par utilisateur connecté

ViewModel : affichage contextuel

Règle 6 — Suppression en cascade

Description
La suppression d’une entité entraîne la suppression des entités dépendantes.

Objectif
Éviter les données orphelines.

Cas concernés

Suppression d’une tâche → suppression de ses rappels

Suppression d’un utilisateur → suppression de ses journées et tâches

Niveaux d’application

Base de données : ON DELETE CASCADE

Backend : cohérence des retours API

4. Tableau de synthèse des règles métier
Règle	Description	DB	Backend	ViewModel
R1	Unicité heure de début	✔	✔	✔
R2	Heure fin > heure début	✖	✔	✔
R3	Rappel lié à une tâche	✔	✔	✔
R4	Pas de rappels conflictuels	✔	✔	✔
R5	Journée → utilisateur unique	✔	✔	✔
R6	Suppression en cascade	✔	✔	✖
5. Bénéfices de cette approche

Robustesse des données

Sécurité fonctionnelle

Expérience utilisateur améliorée

Respect strict de l’architecture MVVM

Prévention des incohérences dès la conception

6. Conclusion

La définition et l’application des règles métier dans l’architecture MVVM de DayPilot garantissent une application fiable, cohérente et maintenable.
Ce livrable clôture la formalisation des contraintes fonctionnelles avant la phase de développement.