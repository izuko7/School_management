import { question, fermerInterface } from "./interface.js";
import { seConnecter, userConnecter } from "./connexion.js";

// Afficher le message de bienvenue
const menuPrincipal = async () => {
    console.log( "╔════════════════════════════════════════╗")
     console.log("║   BIENVENU SUR VOTRE APPLICATION       ║")            
     console.log("║         DE GESTION D'ECOLE             ║")
     console.log("╚════════════════════════════════════════╝")
    let actif = true;
    while (actif) {
        console.log("〚=== GESTION SCOLAIRE ===〛");
        console.log("1. Connexion");
        console.log("0. Quitter");

        const choix = await question("Choix : ");

        switch (choix) {
            case "1":
                const connecte = await seConnecter();
                if(connecte) {
                    if(userConnecter.role === "admin") console.log("Menu admin à venir...");
                    else if(userConnecter.role === "teacher") console.log("Menu professeur à venir...");
                    else if(userConnecter.role === "student") console.log("Menu étudiant à venir...");
                }
                break;
            case "0":
                actif = false;
                console.log("\nAu revoir ! 👋 Merci");
                fermerInterface();
                break;
            default:
                console.log("❌ Choix invalide.");
        }
    }
};

export { menuPrincipal }