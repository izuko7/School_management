import { question, fermerInterface } from "./interface.js";
import { getAllUsers } from "../services/userService.js";

// Utilisateur connecté

let userConnecter = null;

// connexion à l'application
const seConnecter = async () => {
    console.log("\n≈≈≈ CONNEXION ≈≈≈");
    const nom = await question("Nom : ");
    const motdepasse = await question("Mot de passe : ");
 
    const users = getAllUsers();
    const user = users.find(u => u.name === nom && u.motdepasse === motdepasse);
 
    if (!user) {
        console.log("❌ Utilisateur introuvable. vérifiez votre nom et votre mot de passe.");
        return false;
    }
 
    userConnecter = user;
    console.log(`✅ Bienvenue ${userConnecter.name} (${userConnecter.role}) !`);
    return true;
}

export { seConnecter, userConnecter }