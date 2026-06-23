import { question } from "../interface.js";
import { createStudent, getAllStudents, getStudentById, deleteStudent } from "../../services/studentService.js";
import { modifierStudent } from "./sous-menu/modifierStudent.js";

const gestionStudents = async () => {
    let actif = true;
    while (actif) {
        console.log("\n〚=== GESTION DES ETUDIANTS ===〛");
        console.log("1. Lister tous les étudiants");
        console.log("2. Ajouter un étudiant");
        console.log("3. Supprimer un étudiant");
        console.log("4. Rechercher un étudiant");
        console.log("5. Modifier un étudiant");
        console.log("0. Retour");

        const choix = await question("Choix : ");

        switch (choix) {
            case "1": {
                const students = getAllStudents();
                console.log("╔════════════════════════════════════════╗");
                console.log("║          LISTE DES ETUDIANTS           ║");
                console.log("╚════════════════════════════════════════╝\n");

                if (students.length === 0) {
                    console.log("Aucun étudiant enregistré.");
                    break;
                }

                students.forEach(student => {
                    console.log("┌─────────────────────────────────────┐");
                    console.log(`│ ID       : ${student.id}`);
                    console.log(`│ Matricule: ${student.matricule}`);
                    console.log(`│ Nom      : ${student.nom}`);
                    console.log(`│ Prénom   : ${student.prenom}`);
                    console.log(`│ Age      : ${student.age}`);
                    console.log(`│ Classe   : ${student.classe}`);
                    console.log(`│ User ID  : ${student.user_id}`);
                    console.log("└─────────────────────────────────────┘");
                });
                break;
            }
            case "2": {
                console.log("\n--- AJOUTER UN ÉTUDIANT ---");
                console.log(" Créez d'abord un compte utilisateur (role: student) dans Gestion Users.\n");

                const matricule = await question("Matricule : ");
                const nom = await question("Nom : ");
                const prenom = await question("Prénom : ");
                const age = await question("Age : ");
                const classe = await question("Classe : ");
                const user_id = await question("ID du compte utilisateur (role student) : ");

                try {
                    createStudent(matricule, nom, prenom, Number(age), classe, Number(user_id));
                    console.log(" Étudiant ajouté et lié au compte utilisateur.");
                } catch (e) {
                    console.log(` Erreur : ${e.message}`);
                }
                break;
            }
            case "3": {
                const id = await question("ID à supprimer : ");
                try {
                    deleteStudent(Number(id));
                    console.log("  Étudiant supprimé.");
                } catch (e) {
                    console.log(` Erreur : ${e.message}`);
                }
                break;
            }
            case "4": {
                const id = await question("ID de l'étudiant : ");
                const student = getStudentById(Number(id));
                if (!student) {
                    console.log(` Étudiant avec id ${id} introuvable.`);
                } else {
                    console.log("┌─────────────────────────────────────┐");
                    console.log(`│ ID       : ${student.id}`);
                    console.log(`│ Matricule: ${student.matricule}`);
                    console.log(`│ Nom      : ${student.nom}`);
                    console.log(`│ Prénom   : ${student.prenom}`);
                    console.log(`│ Âge      : ${student.age}`);
                    console.log(`│ Classe   : ${student.classe}`);
                    console.log(`│ User ID  : ${student.user_id}`);
                    console.log("└─────────────────────────────────────┘");
                }
                break;
            }
            case "5": {
                await modifierStudent();
                break; 
            }
            case "0": {
                actif = false;
                break;
            }
            default:
                console.log(" Choix invalide.");
        }
    }
};

export { gestionStudents };