import { question } from "../../interface.js";
import { updateStudent } from "../../../services/studentService.js";

const modifierStudent = async () => {
    let actif = true;
    while(actif) {
        console.log("--- MODIFIER UN ETUDIANT ---")
        console.log("1. Modifier le nom ");
        console.log("2. Modifier le prénom ");
        console.log("3. Modifier le matricule");
        console.log("4. Modifier l'age");
        console.log("5. Modifier la classe");
        console.log("6. Modifier toutes les informations");
        console.log("0. Retour");

        const choix = await question("Choix : ")

        switch(choix){
            case "1": {
                const id = await question("ID à modifier : ");
                const nom = await question("Nouveau nom : ");
                updateStudent(Number(id), { nom });
                console.log("✏️  Nom mis à jour.");
                break;
            }
            case "2": {
                const id = await question("ID à modifier : ");
                const prenom = await question("Nouveau prénom : ");
                updateStudent(Number(id), { prenom });
                console.log("✏️  Prénom mis à jour.");
                break;
            }
            case "3": {
                const id = await question("ID à modifier : ");
                const matricule = await question("Nouveau matricule : ");
                updateStudent(Number(id), { matricule });
                console.log("✏️  Matricule mis à jour.");
                break;
            }
            case "4": {
                const id = await question("ID à modifier : ");
                const age = await question("Nouvel âge: ");
                updateStudent(Number(id), { age });
                console.log("✏️  Age mis à jour.");
                break;
            }
            case "5": {
                const id = await question("ID à modifier : ");
                const classe = await question("Nouvelle classe: ");
                updateStudent(Number(id), { classe });
                console.log("✏️  Classe mise à jour.");
                break;
            }
            case "6": {
                const id = await question("ID à modifier : ");
                const matricule = await question("Nouveau matricule : ");
                const nom = await question("Nouveau nom : ");
                const prenom = await question("Nouveau prénom : ");
                const age = await question("Nouvel âge : ");
                const classe = await question("Nouvelle classe : ");
                updateStudent(Number(id), { matricule, nom, prenom, age: Number(age), classe });
                console.log("✏️  Étudiant mis à jour.");
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

export { modifierStudent }