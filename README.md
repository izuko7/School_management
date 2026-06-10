# Système de Gestion d'École

Application CLI (terminal) de gestion complète d'un système scolaire, développée en Node.js avec SQLite.

## Prérequis

- Node.js >= 18
- better-sqlite3
- Dayjs
- npm

## Installation

```bash
npm install
```

## Lancement

```bash
npm start
# ou
node main.js
```

## Structure du projet

```
school-management/
├── main.js                  # Point d'entrée + menu CLI
├── package.json
├── db/
│   └── database.js          # Connexion + initialisation SQLite
├── services/
│   ├── userService.js       # MODULE 1 — Utilisateurs
│   ├── studentService.js    # MODULE 2 — Étudiants
│   ├── teacherService.js    # MODULE 3 — Professeurs
│   ├── subjectService.js    # MODULE 4 — Matières
│   ├── gradeService.js      # MODULE 5 — Notes
│   ├── absenceService.js    # MODULE 6 — Absences
│   └── statsService.js      # MODULE 7 — Statistiques
├── utils/
│   └── logger.js            # Système de logs
├── config/
│   └── config.js            # Configuration (chemin DB)
└── logs/
    └── school.log           # Fichier de journalisation
```

## Modules

| Module | Fonctionnalités |
|--------|----------------|
| Utilisateurs | Ajouter, supprimer, lister — rôles : admin/professeur/etudiant |
| Étudiants | CRUD complet + recherche par nom/matricule |
| Professeurs | CRUD complet + recherche |
| Matières | Ajouter, lister, affecter un professeur |
| Notes | Ajouter, modifier, supprimer, calculer moyenne |
| Absences | Enregistrer, justifier, historique |
| Statistiques | Meilleur étudiant, moyenne générale, classement, résumé |

## Format des logs

```
2026-06-01 10:15:00 [INFO] Étudiant ajouté
2026-06-01 10:20:00 [WARNING] Note invalide rejetée
2026-06-01 10:30:00 [ERROR] Erreur base de données
```
