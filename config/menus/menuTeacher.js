import { question } from "../interface.js";
import { gestionGrades } from "../gestion/gestionGrade.js";
import { gestionAbsence } from "../gestion/gestionAbsence.js";
import { gestionStatistiques } from "../gestion/gestionStatistique.js";
import { logInfo, logWarn, logAuth } from "../../utils/logger.js";

const menuTeacher = async () => {
    logInfo("Entrée dans le menu enseignant");
    let actif = true;
    while(actif) {
        console.log("\n〚=== MENU ENSEIGNANT ===〛");
        console.log("1. Gestion des notes");        
        console.log("2. Gestion des absences");
        console.log("3. Statistiques");
        console.log("0. Déconnexion");

        const choix = await question("Choix: ");

        switch(choix) {
            case "1":
                logInfo("Enseignant — accès : gestion des notes");
                await gestionGrades();
                break;
            case "2":
                logInfo("Enseignant — accès : gestion des absences");
                await gestionAbsence();
                break;
            case "3":
                logInfo("Enseignant — accès : statistiques");
                await gestionStatistiques();
                break;
            case "0":
                actif = false;
                logAuth("Déconnexion enseignant");
                console.log(" Déconnexion.");
                break;
            default:
                logWarn(`Choix invalide dans le menu enseignant : "${choix}"`);
                console.log(" Choix invalide.");
        }
    } 
}

export { menuTeacher }