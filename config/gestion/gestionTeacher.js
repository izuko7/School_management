import { question } from "../interface.js";
import { createTeacher, getAllTeachers, getTeacherById, deleteTeacher } from "../../services/teacherService.js";

const gestionTeacher = async () => {
    let actif = true;
    while(actif) {
        console.log("\n〚=== GESTION DES ENSEIGNANTS ===〛");
        console.log("1. Lister tous les enseignants");
        console.log("2. Ajouter un enseignants");
        console.log("3. Supprimer un enseignants");
        console.log("4. Rechercher un enseignants");
        console.log("5. Modifier un enseignants");
        console.log("0. Retour");

        const choix = await question("Choix : ");

        switch (choix){
            case "1": {
                 const teachers = gestionTeacher();
                console.log("╔════════════════════════════════════════╗");
                console.log("║          LISTE DES ENSEIGNANTS         ║");
                console.log("╚════════════════════════════════════════╝\n");

                teachers.forEach(teacher => {
                    console.log("┌─────────────────────────────────────┐");
                    console.log(`│ ID : ${teacher.id}`);
                    console.log(`│ Nom : ${teacher.nom}`);
                    console.log(`│ Matière associé : ${teacher.matiere}`);
                    console.log("└─────────────────────────────────────┘");
                });
                break;
            }
            case "2": {
                const nom = await question("Nom : ");
                const matiere = await question("Matière : ");
                createTeacher(nom, matiere);
                console.log("✅ Enseignant ajouté.");
                break;
            }
            case "3": {
                const id = await question("ID à supprimer : ");
                const teacher = getTeacherById(Number(id));
                if(!teacher){
                     console.log(`❌ Enseignant introuvable`);
                } else{
                    deleteTeacher(Number(id));
                    console.log("🗑️  Étudiant supprimé.");
                }
                break;
            }
            case "4": {
                const id = await question("ID de l'étudiant :");
                const teacher = getTeacherById(Number(id));
                if(!teacher){
                    console.log(`❌ Enseignant introuvable`);
                }else{
                    console.log("┌─────────────────────────────────────┐");
                    console.log(`│ ID : ${teacher.id}`);
                    console.log(`│ Nom : ${teacher.nom}`);
                    console.log(`│ Matière : ${teacher.matiere}`);
                    console.log("└─────────────────────────────────────┘");
                }
                break
            }
            case "5":
        }
    }
}