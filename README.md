# DayPilot

**Application de Gestion de Tâches, Rappels et Gamification**
**Auteur : Josh BEDEL**
**Technologie : React Native (Expo) + Node.js/Express + PostgreSQL**
**Version : 0.3.0 — Architecture Mobile First**
**Date de création : 2025-11-25**
**Dernière mise à jour : 2026**

---

## Description du Projet

DayPilot est une application multiplateforme (Android, iOS, Web) permettant de gérer les tâches et rappels horaires de manière simple, ergonomique et réactive, avec un système de gamification pour motiver l'utilisateur dans l'accomplissement de ses objectifs quotidiens.

---

## Fonctionnalités principales

1. Authentification sécurisée via Google OAuth 2.0.
2. Créer et planifier des tâches avec horaire, durée, priorité et difficulté.
3. Gérer plusieurs tâches et éviter les chevauchements horaires.
4. Programmer des rappels avec notifications push et emails.
5. Visualiser son planning via un calendrier interactif (vue mensuelle et vue ligne).
6. Suivre son accomplissement via un widget animé et interactif.
7. Gagner des points d'expérience (XP) et des pièces en complétant des tâches.
8. Personnaliser son avatar (cheveux, yeux, vêtements) débloqués avec l'XP.

---

## Plateformes cibles

| Plateforme | Technologie | Statut |
|------------|-------------|--------|
| Android | React Native + Expo | En développement |
| iOS | React Native + Expo | En développement |
| Web | Expo Web | En développement |

---

## Architecture Technique

### Stack complète

| Couche | Technologie | Rôle |
|--------|-------------|------|
| Mobile + Web | React Native + Expo (TypeScript) | Interface utilisateur multiplateforme |
| Navigation | Expo Router | Navigation par structure de fichiers |
| State Management | Zustand | ViewModel — gestion d'état global |
| Appels API | Axios | Communication avec le backend REST |
| Backend | Node.js + Express | API REST — logique serveur |
| Base de données | PostgreSQL | Persistance des données |
| Authentification | Google OAuth 2.0 + JWT | Sécurisation des accès |
| Notifications | Expo Notifications + Nodemailer | Push + Email |

### Architecture logicielle — MVVM

L'architecture **MVVM (Model – View – ViewModel)** est conservée et adaptée à React Native :

- **Model** : Services API (`services/`) + Backend Node.js + PostgreSQL
- **View** : Composants React Native (`.tsx`) dans `components/` et `app/`
- **ViewModel** : Stores Zustand (`store/`) + Custom Hooks (`hooks/`)

### Repository Pattern (Backend)

Le backend maintient le **Repository Pattern** pour séparer la logique métier de l'accès aux données :

```
Controller → Repository → PostgreSQL
```

---

## Structure du Projet

```
DayPilot/
│
├── docs/                          # Documentation
│   ├── Cahier_des_Charges.docx
│   ├── Module0_Definition.docx
│   ├── MCD/
│   ├── MLD/
│   └── MPD/
│
├── backend/                       # Node.js + Express
│   ├── app.js
│   ├── package.json
│   ├── .env.example
│   ├── config/
│   │   ├── db.js
│   │   ├── passport.js
│   │   ├── MPD_DAYPILOT_V2_PostgreSQL.sql
│   │   └── data_init_v2.sql
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── tacheController.js
│   │   ├── rappelController.js
│   │   ├── utilisateurController.js
│   │   ├── journeeController.js
│   │   ├── prioriteController.js
│   │   └── categorieController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── tacheRoutes.js
│   │   ├── rappelRoutes.js
│   │   ├── utilisateurRoutes.js
│   │   ├── journeeRoutes.js
│   │   ├── prioriteRoutes.js
│   │   └── categorieRoutes.js
│   ├── repository/
│   │   ├── tacheRepository.js
│   │   ├── rappelRepository.js
│   │   ├── utilisateurRepository.js
│   │   ├── journeeRepository.js
│   │   ├── prioriteRepository.js
│   │   └── categorieRepository.js
│   └── middleware/
│       ├── errorHandler.js
│       └── authMiddleware.js
│
├── mobile/                        # React Native + Expo
│   ├── app.json
│   ├── package.json
│   ├── tsconfig.json
│   ├── babel.config.js
│   │
│   ├── app/                       # Expo Router — navigation par fichiers
│   │   ├── _layout.tsx            # Layout racine + providers
│   │   ├── index.tsx              # Page d'accueil (landing + Google OAuth)
│   │   ├── (auth)/
│   │   │   └── callback.tsx       # Traitement du token OAuth
│   │   └── (app)/                 # Routes protégées (auth requise)
│   │       ├── _layout.tsx        # Layout avec Navbar
│   │       ├── dashboard.tsx      # Tableau de bord
│   │       ├── taches.tsx         # Module 1 — Tâches & Calendrier
│   │       ├── rappels.tsx        # Module 2 — Rappels
│   │       ├── widget.tsx         # Module 3 — Widget interactif
│   │       ├── gamification.tsx   # Module 4 — Gamification & Avatar
│   │       └── profil.tsx         # Profil utilisateur
│   │
│   ├── components/
│   │   ├── ui/                    # Composants génériques
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Avatar.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── auth/
│   │   │   └── GoogleLoginButton.tsx
│   │   ├── taches/
│   │   │   ├── TacheCard.tsx
│   │   │   └── TacheForm.tsx
│   │   ├── calendrier/
│   │   │   ├── CalendrierMensuel.tsx
│   │   │   └── CalendrierLigne.tsx
│   │   ├── rappels/
│   │   │   └── RappelCard.tsx
│   │   ├── widget/
│   │   │   └── ProgressWidget.tsx
│   │   └── gamification/
│   │       ├── AvatarBuilder.tsx
│   │       └── XpBar.tsx
│   │
│   ├── store/                     # ViewModel — Zustand
│   │   ├── authStore.ts
│   │   ├── tacheStore.ts
│   │   ├── rappelStore.ts
│   │   └── gamificationStore.ts
│   │
│   ├── services/                  # Model — Appels API REST
│   │   ├── api.ts                 # Instance Axios + intercepteurs JWT
│   │   ├── authService.ts
│   │   ├── tacheService.ts
│   │   ├── rappelService.ts
│   │   └── utilisateurService.ts
│   │
│   ├── hooks/                     # Custom Hooks
│   │   ├── useAuth.ts
│   │   ├── useTaches.ts
│   │   └── useTheme.ts
│   │
│   ├── constants/
│   │   ├── colors.ts              # Palette de couleurs DayPilot
│   │   └── config.ts              # URL API, constantes globales
│   │
│   └── assets/
│       ├── images/
│       │   └── logo.png
│       └── fonts/
│
└── README.md
```

---

## Modules de l'Application

### Module 0 — Authentification & Profil
- Page d'accueil avec connexion Google OAuth 2.0
- Création automatique du profil utilisateur
- Gestion JWT + sessions sécurisées
- Sélection du thème (clair / sombre / auto)

### Module 1 — Tâches & Calendrier
- CRUD complet sur les tâches (titre, description, horaire, priorité, difficulté, catégorie)
- Calendrier interactif multi-années (vue mensuelle + vue ligne par jour)
- Gestion des chevauchements horaires
- Éviter les conflits de tâches

### Module 2 — Rappels
- Programmer des rappels sur l'heure de début d'une tâche
- Notifications push (Expo Notifications + Firebase FCM)
- Notifications email (Nodemailer)
- Sonneries personnalisables

### Module 3 — Widget Interactif
- Widget animé montrant l'état d'accomplissement des tâches
- Changement de couleur à l'approche de la prochaine tâche
- Animations fluides (React Native Reanimated)

### Module 4 — Gamification
- Système XP et pièces lié à la difficulté des tâches
- Création d'avatar personnalisé (cheveux, yeux, vêtements)
- Déblocage de looks via l'XP accumulé
- Pénalité XP en cas de suppression de tâche (-40 XP)
- Récompense à la création de l'avatar (+10 pièces, +500 XP)

---

## Technologies utilisées

### Mobile (React Native + Expo)
- React Native 0.74+
- Expo SDK 51+
- Expo Router (navigation)
- Zustand (state management / ViewModel)
- Axios (requêtes HTTP)
- Expo Auth Session (Google OAuth)
- Expo Notifications (push notifications)
- Expo Secure Store (stockage sécurisé du JWT)
- React Native Reanimated (animations)
- NativeWind (Tailwind pour React Native)

### Backend (Node.js + Express)
- Node.js 20+
- Express 4+
- PostgreSQL 15+
- Passport.js + passport-google-oauth20
- JSON Web Token (JWT)
- Bcrypt
- Nodemailer (emails)
- CORS, dotenv

---

## Installation et Démarrage

### Prérequis
- Node.js 20+
- PostgreSQL 15+
- Expo CLI (`npm install -g expo-cli`)
- Compte Google Cloud Console (pour OAuth)

### Backend
```bash
cd backend
npm install
cp .env.example .env   # Remplir les variables
# Exécuter MPD_DAYPILOT_V2_PostgreSQL.sql dans PostgreSQL
# Exécuter data_init_v2.sql (optionnel)
npm run dev
```

### Mobile
```bash
cd mobile
npm install
npx expo start
# Scanner le QR code avec Expo Go (Android/iOS)
# Appuyer sur 'w' pour ouvrir dans le navigateur (Web)
```

---

## Variables d'environnement Backend (.env)

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=daypilot
DB_USER=postgres
DB_PASSWORD=votre_mot_de_passe

GOOGLE_CLIENT_ID=votre_client_id_google
GOOGLE_CLIENT_SECRET=votre_client_secret_google
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

JWT_SECRET=chaine_secrete_longue_et_aleatoire
JWT_EXPIRES_IN=7d
SESSION_SECRET=autre_chaine_secrete
```

---

## État actuel du projet

**Phase : Architecture définie — Développement Module 0**

| Étape | Statut |
|-------|--------|
| Cahier des charges | ✅ Terminé |
| MCD / MLD / MPD | ✅ Terminé |
| Architecture MVVM | ✅ Définie |
| Backend Node.js (squelette) | ✅ Terminé |
| Base de données PostgreSQL | ✅ Prête |
| Module 0 — Auth & Profil | 🔄 En cours |
| Module 1 — Tâches & Calendrier | ⏳ À venir |
| Module 2 — Rappels | ⏳ À venir |
| Module 3 — Widget | ⏳ À venir |
| Module 4 — Gamification | ⏳ À venir |

---

## Prochaines étapes

1. Configurer Google Cloud Console (Client ID + Secret)
2. Développer Module 0 — Page d'accueil + Google OAuth (React Native)
3. Développer Module 0 — Backend auth (passport.js + JWT)
4. Développer Module 1 — Tâches & Calendrier
5. Développer Module 2 — Rappels & Notifications
6. Développer Module 3 — Widget animé
7. Développer Module 4 — Gamification & Avatar
8. Tests unitaires et d'intégration
9. Déploiement backend (Railway / Render)
10. Publication Android (Play Store) + iOS (App Store)

---

## Décisions d'architecture

| Décision | Choix retenu | Raison |
|----------|-------------|--------|
| Plateforme mobile | React Native + Expo | Android + iOS + Web en 1 codebase |
| Architecture | MVVM | Séparation claire Model/View/ViewModel |
| State management | Zustand | Léger, simple, adapté à React Native |
| Navigation | Expo Router | Navigation par fichiers, intuitif |
| Auth mobile | Google OAuth 2.0 uniquement | Simplicité UX, sécurité |
| Priorité vs Difficulté | Deux champs séparés | Priorité = urgence, Difficulté = XP |
| Avatar | Style à définir | Propositions en cours |

---

## Licence

Projet privé — Tous droits réservés © Josh BEDEL
