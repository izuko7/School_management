import { question } from "../interface.js";

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
            case "1": console.log("→ Gestion des notes à venir..."); break;
            case "2": console.log("→ Gestion des notes à venir..."); break;
            case "3": console.log("→ Gestion des statisques à venir..."); break;
            case "0": 
                actif = false;
                console.log("👋 Déconnexion.");
                break;
            default:
                console.log("❌ Choix invalide.");
        }
    } 
}

export { menuTeacher }