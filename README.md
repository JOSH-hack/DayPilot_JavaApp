# DayPilot

**Application de Gestion de Tâches et Rappels Horaires**
**Auteur : Josh BEDEL**
**Technologie : Android (Java) / Full-Stack Web (Vue.js 3 + Node.js/Express + PostgreSQL)**
**Version : 0.2.0 — Phase MVVM & Architecture**
**Date de création : 2025-11-25**

---

# Description du Projet

DayPilot est une application permettant de gérer les tâches et rappels horaires de manière simple, ergonomique et réactive.

## Fonctionnalités principales

1. Créer et planifier des tâches avec un horaire précis et une durée définie.
2. Gérer plusieurs tâches et éviter les chevauchements horaires.
3. Programmer des rappels associés à chaque tâche, avec notifications réactives.
4. Synchroniser les interactions utilisateur via une architecture MVVM moderne et réactive.
5. Communication API REST entre frontend (Vue.js) et backend (Node.js/Express + PostgreSQL).

L’objectif est d’offrir une application fluide, réactive et adaptée à la gestion quotidienne du planning.

---

# Objectifs

### Objectifs généraux

- Proposer un outil simple et efficace pour organiser sa journée.
- Offrir une expérience utilisateur moderne et intuitive.
- Permettre l’extension vers une version web ou multiplateforme.

### Objectifs spécifiques

- Gérer les tâches et rappels avec intégrité des données (contrôles horaires, conflits, unicité).
- Assurer des notifications réactives pour chaque rappel ou début de tâche.
- Séparer clairement la logique métier et l’UI grâce à l’architecture MVVM.
- Préparer le backend pour une communication via API REST avec le frontend.

---

# Architecture Technique

### Plateforme principale

- **Frontend Web** : Vue.js 3 + HTML/CSS + Tailwind ou Vuetify
- **Backend** : Node.js + Express
- **Base de données** : PostgreSQL (MPD DayPilot)
- **Historique Android** : implémentation mobile possible en Java avec Room/SQLite

### Architecture logicielle

- **MVVM** (Model-View-ViewModel)
- **Repository Pattern** pour le backend
- **API REST** pour communication frontend ↔ backend

### Modules clés

- **Gestion des tâches**
- **Gestion des rappels** (création, suppression, activation, conflits)
- **Interface utilisateur réactive**
- **Services / notifications côté frontend et backend**
- **API REST pour toutes les opérations CRUD**

---

# Structure du projet (prévisionnelle)

DayPilot/
│
├── docs/
│   ├── Cahier_des_Charges.docx
│   ├── MCD/
│   ├── MLD/
│   └── MPD/
│
├── backend/                  # Node.js + Express
│   ├── app.js                # Point d'entrée du serveur
│   ├── package.json
│   ├── config/
│   │   └── db.js             # Connexion PostgreSQL
│   ├── controllers/          # Logique métier et validation
│   │   ├── tacheController.js
│   │   ├── rappelController.js
│   │   └── utilisateurController.js
│   ├── models/               # Modèles / ORM
│   │   ├── tache.js
│   │   ├── rappel.js
│   │   └── utilisateur.js
│   ├── routes/               # Endpoints API
│   │   ├── tacheRoutes.js
│   │   ├── rappelRoutes.js
│   │   └── utilisateurRoutes.js
│   ├── repository/           # Accès DB
│   │   ├── tacheRepository.js
│   │   ├── rappelRepository.js
│   │   └── utilisateurRepository.js
│   └── middleware/           # Middlewares Express
│       ├── errorHandler.js
│       └── authMiddleware.js
│
├── frontend/                 # Vue.js 3
│   ├── package.json
│   ├── vite.config.js
│   ├── public/
│   │   ├── favicon.ico
│   │   └── index.html
│   └── src/
│       ├── main.js           # Point d'entrée Vue
│       ├── App.vue           # Composant racine
│       ├── components/       # Composants réutilisables (View)
│       │   ├── TacheCard.vue
│       │   ├── RappelCard.vue
│       │   └── Navbar.vue
│       ├── viewmodels/       # Logique MVVM
│       │   ├── tacheViewModel.js
│       │   ├── rappelViewModel.js
│       │   └── utilisateurViewModel.js
│       ├── services/         # Services API
│       │   ├── api.js
│       │   ├── tacheService.js
│       │   ├── rappelService.js
│       │   └── utilisateurService.js
│       ├── assets/           # Styles, images, icônes
│       │   ├── styles/
│       │   │   ├── main.css
│       │   │   └── tailwind.css
│       │   └── images/
│       │       └── logo.png
│       └── router/           # Vue Router
│           └── index.js
│
├── database/
│   └── MPD_DAYPILOT_V3.sql   # Version finale MPD avec contraintes
│
└── README.md

---

# Technologies utilisées

- Java 8+ (historique Android)
- Vue.js 3 + Composition API
- Node.js + Express
- PostgreSQL
- Axios / fetch pour API REST
- Tailwind / Vuetify pour UI
- AlarmManager + Notifications (Android mobile)
- Gradle (Android) / npm (Node.js)

---

# État actuel du projet

**Phase : MVVM & Architecture Full-Stack**

- Cahier des charges → Terminé
- MCD → Terminé
- MLD/MPD → Terminé
- Architecture MVVM → Définie pour frontend et backend
- Gestion des tâches et rappels → Prise en compte dans le design
- Développement → Préparation du squelette backend/frontend

---

# Prochaines étapes

1. Développement du backend Node.js/Express avec API REST complète
2. Mise en place de PostgreSQL avec toutes les contraintes MPD
3. Développement du frontend Vue.js 3 avec MVVM et composants réactifs
4. Intégration des rappels et notifications côté frontend
5. Tests unitaires et intégration
6. Packaging et déploiement multiplateforme

---

------- Details portant sur le Définition de l'architecture MVVM

# **Livrable 1 — Définition de l’architecture MVVM**

## **1. Introduction**

Dans le cadre du projet  **DayPilot** , une application de gestion de planning et de rappels, il a été nécessaire de définir une architecture logicielle claire, modulaire et évolutive.

L’architecture **MVVM (Model – View – ViewModel)** a été retenue afin de séparer strictement les responsabilités, améliorer la maintenabilité du code et faciliter les évolutions futures de l’application.

---

## **2. Présentation du modèle MVVM**

L’architecture MVVM repose sur trois couches principales :

* **Model** : représente les données et la logique métier.
* **View** : représente l’interface utilisateur.
* **ViewModel** : agit comme un intermédiaire entre la View et le Model.

Contrairement aux architectures monolithiques, MVVM permet une **découplage fort** entre l’interface graphique et la logique applicative.

---

## **3. Justification du choix de l’architecture MVVM**

Le choix de l’architecture MVVM pour le projet DayPilot se justifie par les éléments suivants :

* Séparation claire des responsabilités
* Facilité de maintenance et d’évolution
* Réduction du couplage entre l’interface et la logique métier
* Adaptation naturelle aux frameworks frontend modernes
* Amélioration de la testabilité du code

Cette architecture est particulièrement adaptée aux applications interactives nécessitant une gestion dynamique de l’état, comme les applications de planification.

---

## **4. Description des couches de l’architecture**

### **4.1 Model**

La couche **Model** regroupe :

* Les entités métiers (Utilisateur, Tâche, Rappel, Planning, etc.)
* Les règles métier
* Les accès à la base de données
* Les contraintes d’intégrité des données

Dans le projet DayPilot, le Model est implémenté au niveau du backend à travers :

* La base de données relationnelle
* Les entités métier
* Les services de persistance

---

### **4.2 View**

La **View** correspond à l’interface utilisateur de l’application.

Elle est responsable de :

* L’affichage des données
* La gestion des interactions utilisateur
* La transmission des actions vers le ViewModel

La View ne contient  **aucune logique métier** . Elle se limite à la présentation et à l’expérience utilisateur.

---

### **4.3 ViewModel**

Le **ViewModel** constitue le cœur de la logique applicative côté frontend.

Il est chargé de :

* Récupérer les données depuis le Model via des API REST
* Transformer les données pour l’affichage
* Gérer l’état de l’interface
* Exposer des méthodes à la View

Le ViewModel assure ainsi l’indépendance entre la View et le Model.

---

## **5. Flux de communication dans l’architecture MVVM**

Le fonctionnement général de l’architecture MVVM dans le projet DayPilot est le suivant :

1. L’utilisateur interagit avec la View
2. La View déclenche une action vers le ViewModel
3. Le ViewModel traite la logique applicative
4. Le ViewModel communique avec le Model via des services
5. Les données sont retournées au ViewModel
6. La View est mise à jour automatiquement

Ce flux garantit un contrôle total des échanges et une meilleure gestion de l’état de l’application.

[Tableau De Responabilités](MVVM/TableauDeResponsabilités.png)

[Structure Globales des fichiers](MVVM/StructureGlobaleduSujet.png)

---

## **6. Bénéfices attendus pour le projet DayPilot**

L’adoption de l’architecture MVVM permet :

* Une structure logicielle robuste
* Une meilleure lisibilité du code
* Une évolutivité maîtrisée
* Une collaboration facilitée entre développeurs
* Une réduction des erreurs liées au couplage excessif

---

## **7. Conclusion**

La définition de l’architecture MVVM constitue une étape clé du projet DayPilot.

Elle pose les bases d’un développement structuré, cohérent et maintenable, et prépare efficacement les phases suivantes de conception détaillée et d’implémentation.

# Licence

Projet privé — Tous droits réservés.
