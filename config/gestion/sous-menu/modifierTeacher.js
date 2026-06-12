import { question } from "../../interface.js";
import { updateTeacher } from "../../../services/teacherService.js";

const modifierTeacher = async () => {
    let actif = true;
    while(actif) {
        console.log("--- MODIFIER UN ENSEIGNANT ---")
        console.log("1. Modifier le nom ");
        console.log("2. Modifier la matière ");
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
            case "0":
                actif = false;
                break;
            default:
                console.log("❌ Choix invalide.");
        }
    }
}

export { modifierStudent }