import { question } from "../interface.js";
import { createUser, getUserById, deleteUser, getAllUsers } from "../../services/userService.js";
import { modifierUser } from "./sous-menu/modifierUser.js";

const gestionUsers = async () => {
    let actif = true;
    while (actif) {
        console.log("\n〚=== GESTION DES UTILISATEURS ===〛");
        console.log("1. Lister tous les utilisateurs");
        console.log("2. Ajouter un utilisateur");
        console.log("3. Modifier un utilisateur");
        console.log("4. Supprimer un utilisateur");
        console.log("5. Recherhcer un utilisateur");
        console.log("0. Retour");

        const choix = await question("Choix: ");

        switch (choix) {
            case "1": {
                const users = getAllUsers();
                console.log("╔════════════════════════════════════════╗");
                console.log("║          LISTE DES UTILISATEURS        ║");
                console.log("╚════════════════════════════════════════╝\n");

                users.forEach(user => {
                    console.log("┌─────────────────────────────────────┐");
                    console.log(`│ ID : ${user.id}`);
                    console.log(`│ Nom : ${user.name}`);
                    console.log(`│ Rôle : ${user.role}`);
                    console.log(`│ Mot de passe : ${user.motdepasse}`);
                    console.log("└─────────────────────────────────────┘");
                });
                break;
            }
            case "2": {
                const nom = await question("Nom : ");
                const role = await question("Rôle (admin | teacher | student) : ");
                const password = await question("Mot de passe : ");
                createUser(nom, role, password);
                console.log(" Utilisateur ajouté.");
                break;
            }
            case "3": {
                await modifierUser();
                break;
            }
            case "4": {
                const id = await question("ID à supprimer : ");
                try{
                    deleteUser(Number(id));
                    console.log("  Utilisateur supprimé.");
                } catch (e) {
                    console.log(`Erreur : ${e.message}`)
                }
                break;
            }
            case "5": {
                const id = await question("ID de l'utilisateur : ");
                console.log(getUserById(Number(id)));
                break;
            }
            case "0":
                actif = false;
                break;
            default:
                console.log(" Choix invalide.")
        }
    }
};

export { gestionUsers }