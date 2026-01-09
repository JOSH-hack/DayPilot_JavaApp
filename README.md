
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

# Licence

Projet privé — Tous droits réservés.
