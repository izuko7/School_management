import { question } from "../interface.js";
import { createTeacher, getAllTeachers, getTeacherById, deleteTeacher } from "../../services/teacherService.js";
import { createSubject, getSubjectByName } from "../../services/subjectService.js";
import { modifierTeacher } from "./sous-menu/modifierTeacher.js";

const gestionTeacher = async () => {
    let actif = true;
    while (actif) {
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
                const teachers = getAllTeachers();
                console.log("╔════════════════════════════════════════╗");
                console.log("║          LISTE DES ENSEIGNANTS         ║");
                console.log("╚════════════════════════════════════════╝\n");
                teachers.forEach(teacher => {
                    console.log("┌─────────────────────────────────────┐");
                    console.log(`│ ID : ${teacher.id}`);
                    console.log(`│ Nom : ${teacher.nom}`);
                    console.log(`│ Matière : ${teacher.matiere}`);
                    console.log("└─────────────────────────────────────┘");
                });
                break;
            }
            case "2": {
                const nom = await question("Nom : ");
                const matiere = await question("Matière : ");
                try {
                    const result = createTeacher(nom, matiere);
                    const teacherId = result.lastInsertRowid;
                    console.log("✅ Enseignant ajouté.");

                    const existingSubject = getSubjectByName(matiere);
                    if (existingSubject) {
                        console.log(`⚠️  La matière "${matiere}" existe déjà, aucune création.`);
                    } else {
                        createSubject(matiere, teacherId);
                        console.log(`✅ Matière "${matiere}" créée automatiquement.`);
                    }
                } catch (e) {
                    console.log(`❌ Erreur : ${e.message}`);
                }
                break;
            }
            case "3": {
                const id = await question("ID à supprimer : ");
                const teacher = getTeacherById(Number(id));
                if (!teacher) {
                    console.log("❌ Enseignant introuvable.");
                } else {
                    deleteTeacher(Number(id));
                    console.log("🗑️  Enseignant supprimé."); // ← corrigé (était "Étudiant")
                }
                break;
            }
            case "4": {
                const id = await question("ID de l'enseignant : "); // ← corrigé (était "étudiant")
                const teacher = getTeacherById(Number(id));
                if (!teacher) {
                    console.log("❌ Enseignant introuvable.");
                } else {
                    console.log("┌─────────────────────────────────────┐");
                    console.log(`│ ID : ${teacher.id}`);
                    console.log(`│ Nom : ${teacher.nom}`);
                    console.log(`│ Matière : ${teacher.matiere}`);
                    console.log("└─────────────────────────────────────┘");
                }
                break;
            }
            case "5": {
                await modifierTeacher();
                break;
            }
            case "0":
                actif = false;
                break;
            default:
                console.log("❌ Choix invalide.");
        }
    }
};

export { gestionTeacher };