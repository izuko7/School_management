import { question }  from "../interface.js";
import { gestionUsers } from "../gestion/gestionUser.js";
import { gestionStudents } from "../gestion/gestionStudent.js";
import { gestionTeacher } from "../gestion/gestionTeacher.js";
import { gestionSubject } from "../gestion/gestionSubject.js";
import { gestionGrades } from "../gestion/gestionGrade.js";
import { gestionAbsence     } from "../gestion/gestionAbsence.js";

const menuAdmin = async () => {
    let actif = true;
    while(actif) {
        console.log("\n〚=== MENU ADMINISTRATEUR ===〛");        
        console.log("1. Gestion des utilisateurs");
        console.log("2. Gestion des étudiants");
        console.log("3. Gestion des professeurs");
        console.log("4. Gestion des matières");
        console.log("5. Gestion des notes");
        console.log("6. Gestion des absences");
        console.log("7. Statistiques");
        console.log("0. Déconnexion");

        const choix = await question("Choix: ");

        switch (choix) {
            case "1": 
                await gestionUsers();
                break;

            case "2": 
                await gestionStudents();
                break;
            case "3": 
                await gestionTeacher();
                break;
            case "4": 
                await gestionSubject();
                break;
            case "5": 
                await gestionGrades();
                break;
            case "6": 
                await gestionAbsence();
            case "7": console.log("→  Gestion des statistiques à venir..."); break;
            case "0":
                actif = false;
                console.log("👋 Déconnexion.");
                break;
            default:
                console.log("❌ Choix invalide.");
        }
    }
};

export { menuAdmin }