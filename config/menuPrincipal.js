import { question, fermerInterface } from "./interface.js";
import { seConnecter } from "./connexion.js";

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