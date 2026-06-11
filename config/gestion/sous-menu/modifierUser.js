import { question } from "../../interface.js";
import { updateUser } from "../../../services/userService.js";

const modifierUser = async () => {
    let actif = true;
    while (actif) {
        console.log("--- MODIFIER UN UTILISATEUR ---")
        console.log("1. Modifier le nom & prénom");
        console.log("2. Modifier le rôle");
        console.log("3. Modifier le mot de passe");
        console.log("4. Modifier toutes les informations");
        console.log("0. Retour");

        const choix = await question("Choix: ");

        switch (choix) {
            case "1": {
                const id = await question("ID à modifier : ");
                const nom = await question("Nouveau nom : ");
                updateUser(Number(id), { name: nom });
                console.log("✏️  Nom mis à jour.");
                break;
            }
            case "2": {
                const id = await question("ID à modifier : ");
                const role = await question("Nouveau rôle : ");
                updateUser(Number(id), { role });
                console.log("✏️  Rôle mis à jour.");
                break;
            }
            case "3": {
                const id = await question("ID à modifier : ");
                const password = await question("Nouveau mot de passe : ");
                updateUser(Number(id), { motdepasse: password });
                console.log("✏️  Mot de passe mis à jour.");
                break;
            }
            case "4": {
                const id = await question("ID à modifier : ");
                const nom = await question("Nouveau nom : ");
                const role = await question("Nouveau rôle (admin | teacher | student) : ");
                const password = await question("Nouveau mot de passe : ");
                updateUser(Number(id), { name: nom, role, motdepasse: password });
                console.log("✏️  Utilisateur mis à jour.");
                break;
            }
            case "0":
                actif = false;
                break;
            default:
                console.log("❌ Choix invalide.");
        }
    }
}

export { modifierUser };