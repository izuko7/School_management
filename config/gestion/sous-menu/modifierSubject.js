import { question } from "../../interface.js";
import { updateSubject, getSubjectById } from "../../../services/subjectService.js";

const modifierSubject = async () => {
    let actif = true;
    while (actif) {
        console.log("--- MODIFIER UNE MATIERE ---");
        console.log("1. Modifier le nom");
        console.log("2. Modifier la classe"); 
        console.log("3. Modifier le professeur associé");
        console.log("0. Retour");

        const choix = await question("Choix : ");

        switch (choix) {
            case "1": {
                const id = await question("ID de la matière à modifier : ");
                const subject = getSubjectById(Number(id));
                if (!subject) { console.log(" Matière introuvable."); break; }
                const nom = await question("Nouveau nom : ");
                try {
                    updateSubject(Number(id), { nom });
                    console.log("  Nom mis à jour.");
                } catch (e) {
                    console.log(` Erreur : ${e.message}`);
                }
                break;
            }
            case "2": {               
                const id = await question("ID de la matière à modifier : ");
                const subject = getSubjectById(Number(id));
                if (!subject) { console.log(" Matière introuvable."); break; }
                const classe = await question("Nouvelle classe : ");
                try {
                    updateSubject(Number(id), { classe });
                    console.log("  Classe mise à jour.");
                } catch (e) {
                    console.log(` Erreur : ${e.message}`);
                }
                break;
            }
            case "3": {                              
                const id = await question("ID de la matière à modifier : ");
                const subject = getSubjectById(Number(id));
                if (!subject) { console.log(" Matière introuvable."); break; }
                const teacher_id = await question("Nouvel ID du professeur : ");
                try {
                    updateSubject(Number(id), { teacher_id: Number(teacher_id) });
                    console.log("  Professeur associé mis à jour.");
                } catch (e) {
                    console.log(` Erreur : ${e.message}`);
                }
                break;
            }
            case "0":
                actif = false;
                break;
            default:
                console.log(" Choix invalide.");
        }
    }
};

export { modifierSubject };