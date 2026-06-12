import { question } from "../interface.js";
import { createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent } from "../../services/studentService.js";
import { modifierStudent } from "./sous-menu/modifierStudent.js";

const gestionStudents = async () => {
    let actif = true;
    while(actif){
        console.log("\n〚=== GESTION DES ETUDIANTS ===〛");
        console.log("1. Lister tous les étudiants");
        console.log("2. Ajouter un étudiant");
        console.log("3. Supprimer un étudiant");
        console.log("4. Rechercher un étudiant");
        console.log("5. Modifier un étudiant");
        console.log("0. Retour");

        const choix = await question("Choix : ");

        switch (choix){
            case "1": {
                const students = getAllStudents();
                console.log("╔════════════════════════════════════════╗");
                console.log("║          LISTE DES ETUDIANTS           ║");
                console.log("╚════════════════════════════════════════╝\n");

                students.forEach(student => {
                    console.log("┌─────────────────────────────────────┐");
                    console.log(`│ ID : ${student.id}`);
                    console.log(`│ Matricule : ${student.matricule}`);
                    console.log(`│ Nom : ${student.nom}`);
                    console.log(`│ Prénom : ${student.prenom}`);
                    console.log(`│ Age : ${student.age}`);
                    console.log(`│ Classe : ${student.classe}`);
                    console.log("└─────────────────────────────────────┘");
                });
                break;
            }
            case "2": {
                const matricule = await question("Matricule :");
                const nom = await question("Nom :");
                const prenom = await question("Prénom :");
                const age = await question("Age :");
                const classe = await question("Classe :");
                createStudent(matricule, nom, prenom, Number(age), classe);
                console.log("✅ Étudiant ajouté.");
                break;
            }
            case "3": {
                const id = await question("ID à supprimer : ");
                const student = getStudentById(Number(id));
                if(!student){
                    console.log(`❌ Étudiant avec id ${id} introuvable`);
                } else {
                    deleteStudent(Number(id));
                    console.log("🗑️  Étudiant supprimé.");
                }
                break;
            }
            case "4":{
                const id = await question("ID de l'étudiant : ");
                const student = getStudentById(Number(id));
                if(!student){
                    console.log(`❌ Étudiant avec id ${id} introuvable`);
                } else{
                    console.log("┌─────────────────────────────────────┐");
                    console.log(`│ ID : ${student.id}`);
                    console.log(`│ Matricule : ${student.matricule}`);
                    console.log(`│ Nom : ${student.nom}`);
                    console.log(`│ Prénom : ${student.prenom}`);
                    console.log(`│ Âge : ${student.age}`);
                    console.log(`│ Classe : ${student.classe}`);
                    console.log("└─────────────────────────────────────┘");
                }
                break;
            }
            case "5": {
                await modifierStudent();
            }
            case "0":{
                actif = false;
                break;
            }
            default:
                console.log("❌ Choix invalide.");
        }
    }
}

export { gestionStudents }