import { question }  from "../interface.js";

const afficherMenuAdmin = async () => {
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
            case "1": console.log("→ Gestion users à venir..."); break;
            case "2": console.log("→ Gestion étudiants à venir..."); break;
            case "3": console.log("→ Gestion professeurs à venir..."); break;
            case "4": console.log("→ Gestion matières à venir..."); break;
            case "5": console.log("→ Gestion notes à venir..."); break;
            case "6": console.log("→ Gestion absences à venir..."); break;
            case "7": console.log("→ Statistiques à venir..."); break;
            case "0":
                actif = false;
                console.log("👋 Déconnexion.");
                break;
            default:
                console.log("❌ Choix invalide.");
        }
    }
};

export { afficherMenuAdmin }