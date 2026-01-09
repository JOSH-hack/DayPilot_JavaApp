# DayPilot

**Application Mobile de Gestion de Tâches et Rappels Horaires**
**Auteur : Josh BEDEL**
**Technologie : Android (Java)**
**Version : 0.1.0 — Phase d’Analyse**
**Date de création : 2025-11-25**

# Description du Projet

## DayPilot est une application mobile Android permettant de :

1. Créer des tâches assignées à une heure précise dans la journée.
2. Programmer plusieurs tâches avec un temps d’exécution défini (durée en heures).
3. Déclencher automatiquement des rappel grâce au système d’alarme du téléphone.
4. Notifier l’utilisateur au début d’une tâche via le système natif Android (AlarmManager + Notifications).

L’application vise à offrir une gestion simple, rapide et ergonomique du planning quotidien.

# Objectifs

### Objectifs généraux

- Proposer un outil minimaliste et efficace pour organiser sa journée.
- Offrir une expérience mobile fluide, légère et intuitive.

### Objectifs spécifiques

- Enregistrer localement les tâches grâce à une base de données (Room/SQLite).
- Déclencher automatiquement des alarmes à l’heure exacte des tâches programmées.
- Gérer l’édition, la suppression, la modification des tâches.
- Fournir une interface moderne inspirée du Material Design.

---

# Architecture Technique

### Plateforme principale

- Android (Java)

### Architecture logicielle

- MVVM
- Repository Pattern
- Base de données locale (Room ou SQLite)

### Modules clés

- Gestion des tâches
- Gestion des rappels / AlarmManager
- Interface utilisateur (XML + Material Design)
- Services + BroadcastReceiver
- Notifications natives Android

---

# Structure du projet (prévisionnelle)

DayPilot/
│
├── docs/
│ ├── Cahier_des_Charges.docx
│ ├── MCD.png
│ ├── MLD.png
│ ├── MPD.png
│ └── Plan_Projet.pdf
│
├── app/
│ ├── src/
│ │ ├── main/
│ │ │ ├── java/com/daypilot/
│ │ │ │ ├── model/
│ │ │ │ ├── database/
│ │ │ │ ├── repository/
│ │ │ │ ├── ui/
│ │ │ │ ├── viewmodel/
│ │ │ │ └── services/
│ │ │ └── res/
│ │ │ ├── layout/
│ │ │ ├── drawable/
│ │ │ ├── values/
│ │ │ └── mipmap/
│ │ └── AndroidManifest.xml
│ │
│ ├── build.gradle
│ └── settings.gradle
│
└── README.md

# Technologies utilisées

- Java 8+
- Android SDK
- Room / SQLite
- AlarmManager
- NotificationManager
- BroadcastReceiver
- Material Components
- Gradle

# État actuel du projet

**Phase : Analyse & Modélisation MERISE**

- Cahier des charges → Terminé
- MCD → Terminé
- MLD/MPD → Terminé
- Architecture → à définir ( En cours )
- Développement → pas encore commencé

# Prochaines étapes

1. Finalisation MERISE (MCD → MLD → MPD) - Etape terminée
2. Définition complète de l’architecture MVVM ( En cours )
3. Création du squelette Android
4. Mise en place de la base de données
5. Implémentation des alarmes et notifications
6. Développement de l’interface utilisateur

# Licence

Projet privé — Tous droits réservés.

