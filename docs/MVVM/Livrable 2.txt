Livrable 2 — Schéma d’architecture MVVM global
1. Introduction

Le schéma global représente l’ensemble des interactions entre les couches MVVM, le backend et la base de données.
Il permet de visualiser clairement :

Où se trouvent les données

Comment elles circulent

Comment les tâches et rappels sont gérés

La séparation View / ViewModel / Model

2. Schéma MVVM global (texte/diagramme)
                    +------------------+
                    |     PostgreSQL   |  <-- Base de données (MPD_DAYPILOT_V3.sql)
                    |------------------|
                    | UTILISATEUR      |
                    | TACHE            |
                    | RAPPEL           |
                    | PRIORITE         |
                    | CATEGORIE        |
                    +------------------+
                              ^
                              | Repository Pattern / Node.js Models
                              |
                    +------------------+
                    |   Backend Node.js |
                    |    + Express     |
                    |------------------|
                    | Controllers       |
                    | - tacheController |
                    | - rappelController|
                    | - utilisateurCtrl |
                    |------------------|
                    | Routes API REST   |
                    | - /taches         |
                    | - /rappels        |
                    | - /utilisateurs   |
                    +------------------+
                              ^
                              | API REST (JSON)
                              |
                    +------------------+
                    |  Frontend Vue.js  | <-- MVVM
                    |------------------|
                    | ViewModel         |
                    |------------------|
                    | - tacheViewModel  |
                    | - rappelViewModel |
                    | - utilisateurVM   |
                    |------------------|
                    | Services API      |
                    | - tacheService    |
                    | - rappelService   |
                    | - utilisateurSvc  |
                    +------------------+
                              ^
                              | Reactive Binding / Props
                              |
                    +------------------+
                    |      View        |
                    |------------------|
                    | Vue Components   |
                    |------------------|
                    | - TacheCard.vue  |
                    | - RappelCard.vue |
                    | - Navbar.vue     |
                    | - Formulaires    |
                    | - Modals         |
                    +------------------+

3. Explications
3.1 Backend

Stocke et manipule toutes les données via PostgreSQL

Applique les contraintes du MPD (pas de tâches à même heure, rappels uniques)

Expose les endpoints REST pour le frontend

3.2 Frontend

ViewModel : récupère les données via services API, applique la logique de transformation, gère l’état

View : composants Vue.js réactifs qui affichent les tâches, rappels et notifications

3.3 Communication

Le flux principal est : View → ViewModel → Service API → Backend → Base de données

Les réponses suivent le chemin inverse, avec mise à jour réactive de la View

3.4 Gestion des rappels

Les rappels sont liés aux tâches via le backend et le MPD

Le ViewModel assure que la View reçoit uniquement les rappels actifs et valides

4. Bénéfices du schéma

Visualisation claire des responsabilités de chaque couche

Séparation stricte entre interface, logique et données

Permet de préparer le développement avec une structure rigoureuse

Facilite la maintenance et l’ajout de nouvelles fonctionnalités