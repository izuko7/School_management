import { question }  from "../interface.js";
import { gestionUsers } from "../gestion/gestionUser.js";
import { gestionStudents } from "../gestion/gestionStudent.js";
import { gestionTeacher } from "../gestion/gestionTeacher.js";
import { gestionSubject } from "../gestion/gestionSubject.js";
import { gestionGrades } from "../gestion/gestionGrade.js";
import { gestionAbsence     } from "../gestion/gestionAbsence.js";
import { gestionStatistiques } from "../gestion/gestionStatistique.js";
import { logInfo, logWarn, logAuth } from "../../utils/logger.js";

const menuAdmin = async () => {
    logInfo("Entrée dans le menu administrateur");
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
                logInfo("Admin — accès : gestion des utilisateurs");
                await gestionUsers();
                break;

            case "2":
                logInfo("Admin — accès : gestion des étudiants");
                await gestionStudents();
                break;

            case "3":
                logInfo("Admin — accès : gestion des professeurs");
                await gestionTeacher();
                break;

            case "4":
                logInfo("Admin — accès : gestion des matières");
                await gestionSubject();
                break;

            case "5":
                logInfo("Admin — accès : gestion des notes");
                await gestionGrades();
                break;

            case "6":
                logInfo("Admin — accès : gestion des absences");
                await gestionAbsence();
                break;

            case "7":
                logInfo("Admin — accès : statistiques");
                await gestionStatistiques();
                break;

            case "0":
                actif = false;
                logAuth("Déconnexion administrateur");
                console.log(" Déconnexion.");
                break;

            default:
                logWarn(`Choix invalide dans le menu admin : "${choix}"`);
                console.log(" Choix invalide.");
        }
    }
};

export { menuAdmin }