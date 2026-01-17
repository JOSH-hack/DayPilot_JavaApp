Livrable 6 — Spécification de l’API REST
1. Introduction

Dans l’architecture MVVM du projet DayPilot, l’API REST constitue l’interface officielle entre le ViewModel (frontend) et le Model (backend + base de données).
Ce livrable définit l’ensemble des endpoints, leurs rôles, les méthodes HTTP utilisées et les données échangées.

L’objectif est de :

Garantir une communication claire et standardisée

Servir de contrat entre frontend et backend

Préparer l’implémentation sans ambiguïté

2. Principes généraux de l’API

Architecture RESTful

Échanges de données au format JSON

Endpoints organisés par ressource métier

Validation des règles métier côté backend

Codes HTTP normalisés (200, 201, 400, 404, 500…)

3. Ressource : Utilisateur
Endpoints
Endpoint	Méthode	Description
/utilisateurs	POST	Créer un utilisateur
/utilisateurs/{id}	GET	Récupérer un utilisateur
/utilisateurs/{id}	PUT	Mettre à jour un utilisateur
/utilisateurs/{id}	DELETE	Supprimer un utilisateur
Données échangées (exemple)
{
  "nom": "Josh",
  "email": "josh@email.com",
  "mot_de_passe": "********",
  "theme_prefere": "dark"
}

4. Ressource : Tâche
Endpoints
Endpoint	Méthode	Description
/taches	POST	Créer une tâche
/taches/{id}	GET	Récupérer une tâche
/taches/journee/{idJournee}	GET	Lister les tâches d’une journée
/taches/{id}	PUT	Modifier une tâche
/taches/{id}	DELETE	Supprimer une tâche
Contraintes métier appliquées

Aucune tâche ne peut avoir la même heure de début pour une même journée

heure_fin doit être strictement supérieure à heure_debut

Données échangées (exemple)
{
  "titre": "Révision Java",
  "description": "MVVM et API REST",
  "heure_debut": "08:00",
  "heure_fin": "10:00",
  "statut": "PLANIFIEE",
  "id_journee": 1,
  "id_priorite": 2,
  "id_categorie": 1
}

5. Ressource : Rappel
Endpoints
Endpoint	Méthode	Description
/rappels	POST	Créer un rappel
/rappels/{id}	GET	Récupérer un rappel
/rappels/tache/{idTache}	GET	Lister les rappels d’une tâche
/rappels/{id}	PUT	Modifier un rappel
/rappels/{id}	DELETE	Supprimer un rappel
Contraintes métier

Pas de rappels conflictuels pour une même tâche

Un rappel doit être lié obligatoirement à une tâche existante

Données échangées (exemple)
{
  "date_rappel": "2026-02-01",
  "heure_rappel": "07:45",
  "type_rappel": "NOTIFICATION",
  "actif": true,
  "id_tache": 5
}

6. Ressource : Priorité
Endpoints
Endpoint	Méthode	Description
/priorites	GET	Lister les priorités
/priorites	POST	Ajouter une priorité
7. Ressource : Catégorie
Endpoints
Endpoint	Méthode	Description
/categories	GET	Lister les catégories
/categories	POST	Ajouter une catégorie
8. Gestion des erreurs
Code HTTP	Signification
200	Succès
201	Ressource créée
400	Données invalides
404	Ressource introuvable
409	Conflit métier
500	Erreur serveur

Les erreurs sont retournées au format JSON :

{
  "error": "Conflit : tâche déjà existante à cette heure"
}

9. Rôle de l’API dans l’architecture MVVM

Le ViewModel ne communique jamais directement avec la base de données

Toute règle métier critique est validée côté backend

L’API REST constitue le point unique d’accès aux données

10. Conclusion

La spécification de l’API REST définit un contrat clair et structuré entre le frontend et le backend du projet DayPilot.
Elle garantit la cohérence des échanges, le respect des règles métier et la bonne application de l’architecture MVVM.