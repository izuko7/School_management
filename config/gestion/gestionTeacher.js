import { question } from "../interface.js";
import { createTeacher, getAllTeachers, getTeacherById, deleteTeacher } from "../../services/teacherService.js";
import { modifierTeacher } from "./sous-menu/modifierTeacher.js";
import { logInfo, logSucces, logError, logWarn } from "../../utils/logger.js";

const gestionTeacher = async () => {
    let actif = true;
    while (actif) {
        logInfo("Affichage menu gestion enseignants.");
        console.log("\n〚=== GESTION DES ENSEIGNANTS ===〛");
        console.log("1. Lister tous les enseignants");
        console.log("2. Ajouter un enseignant");
        console.log("3. Supprimer un enseignant");
        console.log("4. Rechercher un enseignant");
        console.log("5. Modifier un enseignant");
        console.log("0. Retour");

        const choix = await question("Choix : ");

        switch (choix) {
            case "1": {
                logInfo("Listage de tous les enseignants.");
                const teachers = getAllTeachers();
                console.log("╔════════════════════════════════════════╗");
                console.log("║          LISTE DES ENSEIGNANTS         ║");
                console.log("╚════════════════════════════════════════╝\n");
                if (teachers.length === 0) {
                    logWarn("Aucun enseignant trouvé.");
                    console.log("Aucun enseignant enregistré.");
                } else {
                    teachers.forEach(teacher => {
                        console.log("┌─────────────────────────────────────┐");
                        console.log(`│ ID      : ${teacher.id}`);
                        console.log(`│ Nom     : ${teacher.nom}`);
                        console.log(`│ Matière : ${teacher.matiere}`);
                        console.log(`│ User ID : ${teacher.user_id ?? "Non lié"}`);
                        console.log("└─────────────────────────────────────┘");
                    });
                }
                break;
            }
            case "2": {
                const nom = await question("Nom : ");
                const matiere = await question("Matière : ");
                const user_id = await question("ID utilisateur (rôle teacher) : ");
                try {
                    const result = createTeacher(nom, matiere, Number(user_id));
                    const teacherId = result.lastInsertRowid;
                    logSucces(`Enseignant ajouté : ${nom} (user_id ${user_id}) — ID : ${teacherId}`);
                    // Suppression de la création automatique de matière
                    // Les matières sont créées depuis Gestion Matières avec la classe
                    console.log(` Enseignant ajouté — ID : ${teacherId}`);
                    console.log(`  Pensez à créer sa matière dans Gestion Matières avec sa classe.`);
                } catch (e) {
                    logError(`Échec ajout enseignant : ${e.message}`);
                    console.log(` Erreur : ${e.message}`);
                }
                break;
            }
            case "3": {
                const id = await question("ID à supprimer : ");
                try {
                    deleteTeacher(Number(id));
                    logSucces(`Enseignant supprimé : id ${id}`);
                    console.log("  Enseignant supprimé.");
                } catch (e) {
                    logError(`Échec suppression enseignant id ${id} : ${e.message}`);
                    console.log(` Erreur : ${e.message}`);
                }
                break;
            }
            case "4": {
                const id = await question("ID de l'enseignant : ");
                const teacher = getTeacherById(Number(id));
                if (!teacher) {
                    logWarn(`Enseignant id ${id} introuvable.`);
                    console.log(" Enseignant introuvable.");
                } else {
                    logInfo(`Enseignant trouvé : id ${id}`);
                    console.log("┌─────────────────────────────────────┐");
                    console.log(`│ ID      : ${teacher.id}`);
                    console.log(`│ Nom     : ${teacher.nom}`);
                    console.log(`│ Matière : ${teacher.matiere}`);
                    console.log(`│ User ID : ${teacher.user_id ?? "Non lié"}`);
                    console.log("└─────────────────────────────────────┘");
                }
                break;
            }
            case "5": {
                logInfo("Accès menu modification enseignant.");
                await modifierTeacher();
                break;
            }
            case "0":
                logInfo("Retour menu principal depuis gestion enseignants.");
                actif = false;
                break;
            default:
                logWarn(`Choix invalide dans gestion enseignants : "${choix}"`);
                console.log(" Choix invalide.");
        }
    }
};

export { gestionTeacher };