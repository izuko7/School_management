import { question } from "../../interface.js";
import { updateUser } from "../../../services/userService.js";

const modifierUser = async () => {
    let actif = true;
    while (actif) {
        console.log("--- MODIFIER UN UTILISATEUR ---");
        console.log("1. Modifier le nom");
        console.log("2. Modifier le rôle");
        console.log("3. Modifier le pseudo");
        console.log("4. Modifier le mot de passe");
        console.log("5. Modifier toutes les informations");
        console.log("0. Retour");

        const choix = await question("Choix: ");

        switch (choix) {
            case "1": {
                const id = await question("ID à modifier : ");
                const nom = await question("Nouveau nom : ");
                try {
                    updateUser(Number(id), { name: nom }); 
                    console.log("Nom mis à jour.");
                } catch (e) {
                    console.log(`Erreur : ${e.message}`);
                }
                break;
            }
            case "2": {
                const id = await question("ID à modifier : ");
                const role = await question("Nouveau rôle : ");
                try {
                    updateUser(Number(id), { role }); 
                    console.log("Rôle mis à jour.");
                } catch (e) {
                    console.log(`Erreur : ${e.message}`);
                }
                break;
            }
            case "3": {
                const id = await question("ID à modifier : ");
                const pseudoname = await question("Nouveau pseudo : ");
                try {
                    updateUser(Number(id), { pseudoname });
                    console.log("Pseudo mis à jour.");
                } catch (e) {
                    console.log(`Erreur : ${e.message}`);
                }
                break;
            }
            case "4": {
                const id = await question("ID à modifier : ");
                const password = await question("Nouveau mot de passe : ");
                try {
                    updateUser(Number(id), { motdepasse: password }); 
                    console.log("Mot de passe mis à jour.");
                } catch (e) {
                    console.log(`Erreur : ${e.message}`);
                }
                break;
            }
            case "5": {
                const id = await question("ID à modifier : ");
                const nom = await question("Nouveau nom : ");
                const role = await question("Nouveau rôle (admin | teacher | student) : ");
                const pseudoname = await question("Nouveau pseudo : ");
                const password = await question("Nouveau mot de passe : ");
                try {
                    updateUser(Number(id), { name: nom, role, pseudoname, motdepasse: password });
                    console.log("Utilisateur mis à jour.");
                } catch (e) {
                    console.log(`Erreur : ${e.message}`);
                }
                break;
            }
            case "0":
                actif = false;
                break;
            default:
                console.log("Choix invalide.");
        }
    }
};

export { modifierUser };