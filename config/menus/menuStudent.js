import { question } from "../interface.js";

const menuStudent = async () => {
    let actif = true;
    while(actif) {
        console.log("\n〚=== MENU ETUDIANT ===〛");
        console.log("1. Voir les notes");
        console.log("2. Voir les moyenne");        
        console.log("3. Consulter les absences");
        console.log("0. Déconnexion");

        const choix = await question("Choix: ");

        switch(choix) {
            case "1": console.log("→ Gestion des notes à venir..."); break;
            case "2": console.log("→ Gestion des moyenne à venir..."); break;
            case "3": console.log("→ Gestion des absences à venir..."); break;
            case "0": 
                actif = false;
                console.log("👋 Déconnexion.");
                break;
            default:
                console.log("❌ Choix invalide.");
        }
    }
}


export { menuStudent }