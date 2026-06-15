import { question } from "../../interface.js";
import { updateTeacher, getTeacherById } from "../../../services/teacherService.js"; // ← ajout

const modifierTeacher = async () => {
    let actif = true;
    while (actif) {
        console.log("--- MODIFIER UN ENSEIGNANT ---");
        console.log("1. Modifier le nom");
        console.log("2. Modifier la matière");
        console.log("0. Retour");

        const choix = await question("Choix : ");

        switch (choix) {
            case "1": {
                const id = await question("ID à modifier : ");
                const teacher = getTeacherById(Number(id));
                if (!teacher) {
                    console.log("❌ Enseignant introuvable.");
                    break;
                }
                const nom = await question("Nouveau nom : ");
                try {
                    updateTeacher(Number(id), { nom });
                    console.log("✏️  Nom mis à jour.");
                } catch (e) {
                    console.log(`❌ Erreur : ${e.message}`);
                }
                break;
            }
            case "2": {
                const id = await question("ID à modifier : ");
                const teacher = getTeacherById(Number(id));
                if (!teacher) {
                    console.log("❌ Enseignant introuvable.");
                    break;
                }
                const matiere = await question("Nouvelle matière : ");
                try {
                    updateTeacher(Number(id), { matiere });
                    console.log("✏️  Matière mise à jour.");
                } catch (e) {
                    console.log(`❌ Erreur : ${e.message}`);
                }
                break;
            }
            case "0":
                actif = false;
                break;
            default:
                console.log("❌ Choix invalide.");
        }
    }
};

export { modifierTeacher };