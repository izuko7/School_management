# Système de Gestion d'École

Application de gestion scolaire développée en **Node.js** utilisant **SQLite** comme système de gestion de base de données. Le projet fonctionne entièrement en **ligne de commande (CLI)** et permet de gérer les principales activités administratives d'un établissement scolaire : utilisateurs, étudiants, enseignants, matières, notes, absences et statistiques.

---

# Présentation du projet

Le **Système de Gestion d'École** est une application conçue pour faciliter la gestion quotidienne d'un établissement scolaire en centralisant toutes les informations importantes dans une base de données relationnelle.

L'application permet à différents types d'utilisateurs (administrateur, enseignant et étudiant) d'accéder uniquement aux fonctionnalités correspondant à leur rôle grâce à un système de gestion des permissions.

L'architecture du projet repose sur une séparation claire des responsabilités :

- Les **modèles** représentent les différentes entités du système.
- Les **services** contiennent toute la logique métier et les opérations sur la base de données.
- Le dossier **db** gère la connexion à SQLite ainsi que la création des tables.
- Les **utilitaires et configurations** regroupent les fonctionnalités communes comme les permissions, la journalisation et les interfaces de saisie.

Toutes les opérations importantes effectuées par les utilisateurs sont enregistrées dans un fichier de journalisation afin de faciliter le suivi des activités du système.

Ce projet met en pratique plusieurs notions fondamentales du développement :

- Programmation orientée objet (POO)
- Architecture modulaire
- Manipulation de bases de données SQLite
- Gestion des relations entre tables
- Opérations CRUD
- Gestion des rôles et permissions
- Journalisation (Logs)
- Application CLI interactive

---

# Fonctionnalités

Le système permet de :

- Authentifier les utilisateurs
- Gérer plusieurs rôles
- Ajouter, modifier et supprimer des étudiants
- Ajouter, modifier et supprimer des enseignants
- Gérer les matières
- Associer des enseignants aux matières
- Gérer les notes des étudiants
- Calculer les moyennes
- Gérer les absences
- Consulter des statistiques
- Journaliser toutes les opérations importantes

---

# Technologies utilisées

- Node.js
- JavaScript (ES Modules)
- SQLite
- Better-SQLite3
- Day.js
- Fs
- npm

---

# Prérequis

Avant de lancer le projet, assurez-vous d'avoir installé :

- Node.js (version 18 ou supérieure)
- npm

Vérification :

```bash
node -v
npm -v
```

---

# Installation

Cloner le projet :

```bash
git clone <url-du-projet>
```

Entrer dans le dossier :

```bash
cd school-management
```

Installer les dépendances :

```bash
npm install
```

Installer les bibliothèques utilisées :

```bash
npm install better-sqlite3
npm install dayjs
```

---

# Lancement

Depuis le terminal :

```bash
node main.js
```

---

# Structure du projet

```text
school-management/
│
├── config/
│   │
│   ├── gestion/
│   │   │
│   │   ├── sous-menu/
│   │   │   ├── modifierStudent.js
│   │   │   ├── modifierSubject.js
│   │   │   ├── modifierTeacher.js
│   │   │   └── modifierUser.js
│   │   │
│   │   ├── gestionAbsence.js
│   │   ├── gestionGrade.js
│   │   ├── gestionStatistique.js
│   │   ├── gestionStudent.js
│   │   ├── gestionSubject.js
│   │   ├── gestionTeacher.js
│   │   ├── gestionUser.js
│   │   └── mesClassesEtudiant.js
│   │
│   └── menus/
│       ├── menuAdmin.js
│       ├── menuStudent.js
│       ├── menuTeacher.js
│       ├── connexion.js
│       ├── date.js
│       ├── interface.js
│       └── menuPrincipal.js
│
├── db/
│   ├── database.js
│   └── tables.js
│
├── logs/
│   ├── .gitkeep
│   └── app.log
│
├── models/
│   ├── absenceModel.js
│   ├── gradeModel.js
│   ├── statistiqueModel.js
│   ├── studentModel.js
│   ├── subjectModel.js
│   ├── teacherModel.js
│   └── userModel.js
│
├── node_modules/
│
├── services/
│   ├── absenceService.js
│   ├── gradeService.js
│   ├── statistiqueService.js
│   ├── studentService.js
│   ├── subjectService.js
│   ├── teacherService.js
│   └── userService.js
│
├── utils/
│   ├── logger.js
│   ├── permission.js
│   └── role.js
│
├── .gitignore
├── database.db
├── main.js
├── package.json
├── package-lock.json
└── README.md
```

---

# Base de données

Le projet utilise **SQLite**.

Les principales tables sont :

| Table | Description |
|--------|-------------|
| users  | Comptes des utilisateurs |
| students | Informations des étudiants |
| teachers | Informations des enseignants |
| subjects | Matières enseignées |
| grades | Notes des étudiants |
| absences | Absences des étudiants |

Les relations entre les tables sont assurées grâce aux clés étrangères afin de garantir l'intégrité des données.

---

# Modules

## 1. Gestion des utilisateurs

Fonctionnalités :

- Ajouter un utilisateur
- Supprimer un utilisateur
- Consulter la liste des utilisateurs
- Authentification
- Gestion des rôles

---

## 2. Gestion des étudiants

Fonctionnalités :

- Ajouter un étudiant
- Modifier un étudiant
- Supprimer un étudiant
- Rechercher un étudiant
- Afficher tous les étudiants

---

## 3. Gestion des enseignants

Fonctionnalités :

- Ajouter un enseignant
- Modifier un enseignant
- Supprimer un enseignant
- Rechercher un enseignant
- Afficher tous les enseignants

---

## 4. Gestion des matières

Fonctionnalités :

- Ajouter une matière
- Modifier une matière
- Supprimer une matière
- Associer un enseignant
- Consulter toutes les matières

---

## 5. Gestion des notes

Fonctionnalités :

- Ajouter une note
- Modifier une note
- Supprimer une note
- Consulter les notes d'un étudiant
- Calculer les moyennes

---

## 6. Gestion des absences

Fonctionnalités :

- Ajouter une absence
- Modifier une absence
- Supprimer une absence
- Consulter les absences d'un étudiant

---

## 7. Statistiques

Le système permet de consulter :

- Nombre total d'étudiants
- Nombre total d'enseignants
- Nombre total de matières
- Nombre d'absences
- Moyenne générale
- Meilleur étudiant
- Classement des étudiants
- Résumé général de l'établissement

---

# Gestion des rôles

Le système comporte trois rôles principaux.

## Administrateur

Accès complet à l'application.

Fonctionnalités :

- Gestion des utilisateurs
- Gestion des étudiants
- Gestion des enseignants
- Gestion des matières
- Gestion des notes
- Gestion des absences
- Consultation des statistiques
- Accès aux journaux d'activités

---

## Enseignant

L'enseignant peut :

- Consulter les étudiants
- Consulter les matières
- Ajouter des notes
- Modifier des notes
- Consulter les statistiques liées à ses matières

---

## Étudiant

L'étudiant peut uniquement :

- Consulter ses informations
- Consulter ses notes
- Consulter ses absences

---

# Authentification

Le système utilise une authentification basée sur :

- Pseudonyme
- Mot de passe
- Rôle

Les mots de passe sont destinés à être stockés de manière sécurisée à l'aide d'un mécanisme de hachage afin de protéger les comptes utilisateurs.

---

# Journalisation (Logs)

Toutes les actions importantes réalisées dans l'application sont enregistrées dans :

```text
logs/app.log
```

Exemple :

```text
[2026-06-01 08:15:23] Campbell s'est connecté
[2026-06-01 08:20:15] Étudiant MAT001 ajouté
[2026-06-01 08:25:40] Note ajoutée à l'étudiant MAT001
[2026-06-01 08:30:11] Absence enregistrée
[2026-06-01 08:35:10] Campbell s'est déconnecté
```

Cette journalisation facilite le suivi des opérations effectuées dans le système.

---

# Architecture

Le projet suit une architecture modulaire.

- **db/** : connexion et initialisation de la base de données.
- **models/** : représentation des entités métier.
- **services/** : logique métier et accès aux données.
- **menus/** : interfaces utilisateur en ligne de commande.
- **utils/** : outils communs (permissions, logs, interface, connexion).
- **config/** : outils (permissions, logs, interface, connexion).

Cette organisation facilite la maintenance, la réutilisation du code et les évolutions futures du projet.

---

# Ajout possibles

Le projet peut être enrichi avec les fonctionnalités suivantes :

- Interface graphique Web
- API REST avec Express.js
- Tableau de bord administrateur
- Export PDF des bulletins
- Export Excel des notes
- Gestion des emplois du temps
- Gestion des parents d'élèves
- Notifications
- Tests unitaires

---

# Auteur

Projet réalisé dans le cadre de l'apprentissage du développement d'applications en **Node.js** avec **SQLite**.

---

# Licence

Ce projet est distribué à des fins pédagogiques.
