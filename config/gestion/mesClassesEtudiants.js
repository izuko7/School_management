import { question } from "../interface.js";
import { session } from "../connexion.js";
import db from "../../db/database.js";
import { logInfo, logError } from "../../utils/logger.js";

const mesClassesEtudiants = async () => {
    let actif = true;
    while (actif) {
        console.log("\n〚=== MES CLASSES & ETUDIANTS ===〛");
        console.log("1. Voir mes matières et classes");
        console.log("2. Voir les étudiants d'une classe");
        console.log("3. Voir les notes de mes étudiants");
        console.log("0. Retour");

        const choix = await question("Choix : ");

        switch (choix) {
            case "1": {
                logInfo("Enseignant — consultation de ses matières et classes.");

                const matieres = db.prepare(`
                    SELECT sub.id, sub.nom, sub.classe
                    FROM subjects sub
                    JOIN teachers t ON sub.teacher_id = t.id
                    WHERE t.user_id = ?
                `).all(session.userConnecter.id);

                if (matieres.length === 0) {
                    console.log("Aucune matière assignée.");
                    break;
                }

                console.log("╔════════════════════════════════════════╗");
                console.log("║         MES MATIERES & CLASSES         ║");
                console.log("╚════════════════════════════════════════╝\n");

                matieres.forEach(m => {
                    console.log("┌─────────────────────────────────────┐");
                    console.log(`│ Matière : ${m.nom}`);
                    console.log(`│ Classe  : ${m.classe}`);
                    console.log("└─────────────────────────────────────┘");
                });
                break;
            }
            case "2": {
                logInfo("Enseignant — consultation des étudiants d'une classe.");

                // Afficher ses classes disponibles
                const classes = db.prepare(`
                    SELECT DISTINCT sub.classe
                    FROM subjects sub
                    JOIN teachers t ON sub.teacher_id = t.id
                    WHERE t.user_id = ?
                `).all(session.userConnecter.id);

                if (classes.length === 0) {
                    console.log("Aucune classe assignée.");
                    break;
                }

                console.log("\nVos classes :");
                classes.forEach(c => console.log(`  → ${c.classe}`));

                const classe = await question("Quelle classe ? ");

                // Vérifier que cette classe lui appartient
                const classeValide = classes.find(c => c.classe === classe);
                if (!classeValide) {
                    console.log("Cette classe ne vous est pas assignée.");
                    logError(`Enseignant tentative accès classe non assignée : ${classe}`);
                    break;
                }

                const etudiants = db.prepare(`
                    SELECT * FROM students WHERE classe = ?
                `).all(classe);

                if (etudiants.length === 0) {
                    console.log(`Aucun étudiant dans la classe ${classe}.`);
                    break;
                }

                console.log("╔════════════════════════════════════════╗");
                console.log(`║       ETUDIANTS DE LA CLASSE ${classe.padEnd(9)}║`);
                console.log("╚════════════════════════════════════════╝\n");

                etudiants.forEach(s => {
                    console.log("┌─────────────────────────────────────┐");
                    console.log(`│ Matricule : ${s.matricule}`);
                    console.log(`│ Nom       : ${s.nom}`);
                    console.log(`│ Prénom    : ${s.prenom}`);
                    console.log(`│ Age       : ${s.age}`);
                    console.log("└─────────────────────────────────────┘");
                });
                break;
            }
            case "3": {
                logInfo("Enseignant — consultation des notes de ses étudiants.");

                const notes = db.prepare(`
                    SELECT s.nom, s.prenom, s.classe, sub.nom as matiere, g.note
                    FROM grades g
                    JOIN students s ON g.student_id = s.id
                    JOIN subjects sub ON g.subject_id = sub.id
                    JOIN teachers t ON sub.teacher_id = t.id
                    WHERE t.user_id = ?
                    ORDER BY s.classe, s.nom
                `).all(session.userConnecter.id);

                if (notes.length === 0) {
                    console.log("Aucune note enregistrée pour vos étudiants.");
                    break;
                }

                console.log("╔════════════════════════════════════════╗");
                console.log("║         NOTES DE MES ETUDIANTS         ║");
                console.log("╚════════════════════════════════════════╝\n");

                notes.forEach(n => {
                    console.log("┌─────────────────────────────────────┐");
                    console.log(`│ Nom     : ${n.nom} ${n.prenom}`);
                    console.log(`│ Classe  : ${n.classe}`);
                    console.log(`│ Matière : ${n.matiere}`);
                    console.log(`│ Note    : ${n.note}/20`);
                    console.log("└─────────────────────────────────────┘");
                });
                break;
            }
            case "0":
                actif = false;
                break;
            default:
                console.log(" Choix invalide.");
        }
    }
};

export { mesClassesEtudiants };