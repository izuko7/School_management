import { question }  from "../interface.js";
import { gestionUsers } from "../gestion/gestionUser.js";

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
                await gestionUsers(choix);
                break;
            case "2": console.log("→ Gestion étudiants à venir..."); break;
            case "3": console.log("→ Gestion des professeurs à venir..."); break;
            case "4": console.log("→ Gestion des matières à venir..."); break;
            case "5": console.log("→ Gestion des notes à venir..."); break;
            case "6": console.log("→  Gestion des absences à venir..."); break;
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