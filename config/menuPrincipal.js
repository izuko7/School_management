import { question, fermerInterface } from "./interface.js";
import { seConnecter, session } from "./connexion.js";
import { menuAdmin } from "./menus/menuAdmin.js";
import { menuTeacher } from "./menus/menuTeacher.js";
import { menuStudent } from "./menus/menuStudent.js";
import { logInfo, logWarn, logError, logSucces } from "../utils/logger.js";

// Afficher le message de bienvenue
const menuPrincipal = async () => {
    logInfo(`Demarrage de l'application`);
    console.log("╔════════════════════════════════════════╗");
    console.log("║   BIENVENU SUR VOTRE APPLICATION       ║");
    console.log("║         DE GESTION D'ECOLE             ║");
    console.log("╚════════════════════════════════════════╝");

    let actif = true;
    while (actif) {
        console.log("\n〚=== GESTION SCOLAIRE ===〛");
        console.log("1. Connexion");
        console.log("0. Quitter");

        const choix = await question("Choix : ");

        switch (choix) {
            case "1": {
                logInfo(`Tentative de connexion`);
                const connecte = await seConnecter();
                if (connecte) {
                    logSucces(`Connexion réussie — utilisateur: ${session.userConnecter.name}, rôle: ${session.userConnecter.role}`); // ✅ .nom → .name
                    if (session.userConnecter.role === "admin") await menuAdmin();
                    else if (session.userConnecter.role === "teacher") await menuTeacher();
                    else if (session.userConnecter.role === "student") await menuStudent();
                    else {
                        console.log("Rôle inconnu.");
                        logError(`Rôle inconnu détecté : ${session.userConnecter.role}`);
                    }
                } else {
                    logWarn(`Échec de connexion`);
                }
                break;
            }
            case "0":
                actif = false;
                console.log("\nAu revoir ! Merci");
                logInfo(`Fermeture de l'application`);
                fermerInterface();
                break;
            default:
                logWarn(`Choix invalide saisi : "${choix}"`);
                console.log("Choix invalide.");
        }
    }
};

export { menuPrincipal };