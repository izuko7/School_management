import { question } from "../interface.js";
import { gestionGrades } from "../gestion/gestionGrade.js";
import { gestionAbsence } from "../gestion/gestionAbsence.js";
import { gestionStatistiques } from "../gestion/gestionStatistique.js";

const menuTeacher = async () => {
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
                await gestionGrades();
                break;
            case "2": 
                await gestionAbsence();
                break;
            case "3": 
                await gestionStatistiques();
                break;
            case "0": 
                actif = false;
                console.log(" Déconnexion.");
                break;
            default:
                console.log(" Choix invalide.");
        }
    } 
}

export { menuTeacher }