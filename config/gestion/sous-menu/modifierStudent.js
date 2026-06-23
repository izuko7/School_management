import { question } from "../../interface.js";
import { updateStudent } from "../../../services/studentService.js";

const modifierStudent = async () => {
    let actif = true;
    while (actif) {
        console.log("--- MODIFIER UN ETUDIANT ---");
        console.log("1. Modifier le nom");
        console.log("2. Modifier le prénom");
        console.log("3. Modifier le matricule");
        console.log("4. Modifier l'age");
        console.log("5. Modifier la classe");
        console.log("6. Modifier toutes les informations");
        console.log("0. Retour");

        const choix = await question("Choix : ");

        switch (choix) {
            case "1": {
                const id = await question("ID à modifier : ");
                const nom = await question("Nouveau nom : ");
                try {
                    updateStudent(Number(id), { nom });
                    console.log("  Nom mis à jour.");
                } catch (e) {
                    console.log(`Erreur : ${e.message}`);
                }
                break;
            }
            case "2": {
                const id = await question("ID à modifier : ");
                const prenom = await question("Nouveau prénom : ");
                try {
                    updateStudent(Number(id), { prenom });
                    console.log("  Prénom mis à jour.");
                } catch (e) {
                    console.log(` Erreur : ${e.message}`);
                }
                break;
            }
            case "3": {
                const id = await question("ID à modifier : ");
                const matricule = await question("Nouveau matricule : ");
                try {
                    updateStudent(Number(id), { matricule });
                    console.log("  Matricule mis à jour.");
                } catch (e) {
                    console.log(` Erreur : ${e.message}`);
                }
                break;
            }
            case "4": {
                const id = await question("ID à modifier : ");
                const age = await question("Nouvel âge : ");
                try {
                    updateStudent(Number(id), { age: Number(age) });
                    console.log("  Age mis à jour.");
                } catch (e) {
                    console.log(` Erreur : ${e.message}`);
                }
                break;
            }
            case "5": {
                const id = await question("ID à modifier : ");
                const classe = await question("Nouvelle classe : ");
                try {
                    updateStudent(Number(id), { classe });
                    console.log(" Classe mise à jour.");
                } catch (e) {
                    console.log(` Erreur : ${e.message}`);
                }
                break;
            }
            case "6": {
                const id = await question("ID à modifier : ");
                const matricule = await question("Nouveau matricule : ");
                const nom = await question("Nouveau nom : ");
                const prenom = await question("Nouveau prénom : ");
                const age = await question("Nouvel âge : ");
                const classe = await question("Nouvelle classe : ");
                try {
                    updateStudent(Number(id), { matricule, nom, prenom, age: Number(age), classe });
                    console.log("  Étudiant mis à jour.");
                } catch (e) {
                    console.log(` Erreur : ${e.message}`);
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

export { modifierStudent };