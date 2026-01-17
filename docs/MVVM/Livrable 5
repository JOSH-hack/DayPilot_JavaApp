Livrable 5 — Spécification des ViewModels
1. Introduction

La spécification des ViewModels détaille la logique applicative côté frontend dans l’architecture MVVM de DayPilot.
Chaque ViewModel est responsable de la gestion des données, de l’état de l’interface et de la communication avec les services backend.

L’objectif est de garantir une séparation stricte entre interface (View) et données (Model).

2. Liste des ViewModels et leurs responsabilités
 
 Image
 
3. Fonctionnement général

View → ViewModel

L’utilisateur interagit avec un composant Vue (ex: formulaire de tâche).

Le composant transmet les actions au ViewModel correspondant.

ViewModel → Service

Le ViewModel appelle le service REST approprié pour effectuer l’action (CRUD).

Service → Backend

Les services font l’appel API au backend Node.js/Express, qui applique les contraintes métier et interagit avec PostgreSQL.

Backend → Service → ViewModel → View

Les réponses (succès, données ou erreurs) remontent jusqu’au ViewModel.

Le ViewModel met à jour les données réactives pour que la View affiche les changements instantanément.

4. Exemple concret (tacheViewModel)

Méthodes :

getTaches(idJournee) : récupère les tâches pour une journée

addTache(tache) : ajoute une tâche après validation côté frontend

updateTache(tache) : modifie une tâche existante

deleteTache(idTache) : supprime une tâche

Données exposées à la View :

taches : liste réactive des tâches

isLoading : état de chargement

error : message d’erreur à afficher

5. Bénéfices attendus

Séparation nette de la logique entre View et Model

Réactivité totale de l’interface utilisateur

Pré-validation des données avant envoi au backend

Maintenabilité et extensibilité pour de futures fonctionnalités