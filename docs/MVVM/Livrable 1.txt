Livrable 1 — Définition de l’architecture MVVM

    1. Introduction

Dans le cadre du projet DayPilot, une application de gestion de planning et de rappels, il a été nécessaire de définir une architecture logicielle claire, modulaire et évolutive.
L’architecture MVVM (Model – View – ViewModel) a été retenue afin de séparer strictement les responsabilités, améliorer la maintenabilité du code et faciliter les évolutions futures de l’application.

    2. Présentation du modèle MVVM

L’architecture MVVM repose sur trois couches principales :

Model : représente les données et la logique métier.

View : représente l’interface utilisateur.

ViewModel : agit comme un intermédiaire entre la View et le Model.

Contrairement aux architectures monolithiques, MVVM permet une découplage fort entre l’interface graphique et la logique applicative.

    3. Justification du choix de l’architecture MVVM

Le choix de l’architecture MVVM pour le projet DayPilot se justifie par les éléments suivants :

Séparation claire des responsabilités

Facilité de maintenance et d’évolution

Réduction du couplage entre l’interface et la logique métier

Adaptation naturelle aux frameworks frontend modernes

Amélioration de la testabilité du code

Cette architecture est particulièrement adaptée aux applications interactives nécessitant une gestion dynamique de l’état, comme les applications de planification.

    4. Description des couches de l’architecture
        4.1 Model

La couche Model regroupe :

Les entités métiers (Utilisateur, Tâche, Rappel, Planning, etc.)

Les règles métier

Les accès à la base de données

Les contraintes d’intégrité des données

Dans le projet DayPilot, le Model est implémenté au niveau du backend à travers :

La base de données relationnelle

Les entités métier

Les services de persistance

    4.2 View

La View correspond à l’interface utilisateur de l’application.

Elle est responsable de :

L’affichage des données

La gestion des interactions utilisateur

La transmission des actions vers le ViewModel

La View ne contient aucune logique métier. Elle se limite à la présentation et à l’expérience utilisateur.

    4.3 ViewModel

Le ViewModel constitue le cœur de la logique applicative côté frontend.

Il est chargé de :

Récupérer les données depuis le Model via des API REST

Transformer les données pour l’affichage

Gérer l’état de l’interface

Exposer des méthodes à la View

Le ViewModel assure ainsi l’indépendance entre la View et le Model.

    5. Flux de communication dans l’architecture MVVM

Le fonctionnement général de l’architecture MVVM dans le projet DayPilot est le suivant :

L’utilisateur interagit avec la View

La View déclenche une action vers le ViewModel

Le ViewModel traite la logique applicative

Le ViewModel communique avec le Model via des services

Les données sont retournées au ViewModel

La View est mise à jour automatiquement

Ce flux garantit un contrôle total des échanges et une meilleure gestion de l’état de l’application.

    6. Bénéfices attendus pour le projet DayPilot

L’adoption de l’architecture MVVM permet :

Une structure logicielle robuste

Une meilleure lisibilité du code

Une évolutivité maîtrisée

Une collaboration facilitée entre développeurs

Une réduction des erreurs liées au couplage excessif

    7. Conclusion

La définition de l’architecture MVVM constitue une étape clé du projet DayPilot.
Elle pose les bases d’un développement structuré, cohérent et maintenable, et prépare efficacement les phases suivantes de conception détaillée et d’implémentation.