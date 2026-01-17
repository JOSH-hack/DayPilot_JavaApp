Livrable 4 — Structure de fichiers et répertoires
1. Introduction

Ce livrable définit l’arborescence complète du projet DayPilot, avec le rôle de chaque dossier et fichier.
L’objectif est de garantir :

Une organisation claire et cohérente

Une séparation stricte entre les différentes couches MVVM

Une référence pour tout développeur travaillant sur le projet

2 - Structure globale du projet






3. Explication des dossiers principaux
3.1 Backend

app.js : point d’entrée du serveur, initialise Express et les routes

config/db.js : configuration de la connexion PostgreSQL

controllers/ : logiques métiers, validation, règles de gestion

models/ : représentation des entités côté serveur

repository/ : couche d’accès aux données (CRUD)

routes/ : définition des endpoints REST

middleware/ : gestion des erreurs et authentification

3.2 Frontend

components/ : UI statique et réactive, aucune logique métier

viewmodels/ : centralise la logique MVVM, appelle les services, prépare les données pour la View

services/ : encapsule les appels API REST vers le backend

assets/ : styles, images, icônes

router/ : gestion des routes Vue.js

3.3 Database

Contient le fichier SQL final avec toutes les tables, relations, contraintes et triggers pour DayPilot

4. Bénéfices de cette structure

Organisation claire et cohérente pour un projet full-stack

Séparation stricte des responsabilités entre UI, logique applicative et données

Prêt pour l’implémentation MVVM complète

Facilité de maintenance et évolutivité pour ajout de nouvelles fonctionnalités