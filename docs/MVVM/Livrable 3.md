Livrable 3 — Tableau des responsabilités par couche MVVM
1. Introduction

Le tableau des responsabilités permet de définir clairement le rôle de chaque couche dans l’architecture MVVM du projet DayPilot.
Il garantit que toutes les fonctions sont bien assignées, évitant les confusions entre logique métier, interface et stockage de données.

2. Tableau des responsabilités

 MVVM/TableauDeResponsabilités.png

3. Observations importantes

Séparation stricte : aucune logique métier dans la View

Cohérence MVVM : ViewModel centralise l’état et les transformations

Respect des règles métier : contrôlé au niveau Model / Controller

Extensible : ajout futur de modules (ex: calendrier, filtres avancés) ne perturbe pas l’architecture

4. Conclusion

Ce tableau des responsabilités sert de référence opérationnelle pour le développement de DayPilot.
Il clarifie le rôle de chaque composant et prépare le terrain pour le développement frontend et backend en MVVM, en garantissant l’intégrité des données et la réactivité de l’interface.