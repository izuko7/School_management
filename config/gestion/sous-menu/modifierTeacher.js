import { question } from "../../interface.js";
import { updateTeacher, getTeacherById } from "../../../services/teacherService.js";
import { logInfo, logSucces, logError, logWarn } from "../../../utils/logger.js";

const modifierTeacher = async () => {
    let actif = true;
    while (actif) {
        logInfo("Affichage menu modification enseignant.");
        console.log("\n--- MODIFIER UN ENSEIGNANT ---");
        console.log("1. Modifier le nom");
        console.log("2. Modifier la matière");
        console.log("0. Retour");

        const choix = await question("Choix : ");

        switch (choix) {
            case "1": {
                const id = await question("ID à modifier : ");
                const teacher = getTeacherById(Number(id));
                if (!teacher) {
                    logWarn(`Modification nom échouée : enseignant id ${id} introuvable.`);
                    console.log(" Enseignant introuvable.");
                    break;
                }
                const nom = await question("Nouveau nom : ");
                try {
                    updateTeacher(Number(id), { nom });
                    logSucces(`Nom enseignant id ${id} modifié : "${nom}"`);
                    console.log(" Nom mis à jour.");
                } catch (e) {
                    logError(`Échec modification nom enseignant id ${id} : ${e.message}`);
                    console.log(` Erreur : ${e.message}`);
                }
                break;
            }
            case "2": {
                const id = await question("ID à modifier : ");
                const teacher = getTeacherById(Number(id));
                if (!teacher) {
                    logWarn(`Modification matière échouée : enseignant id ${id} introuvable.`);
                    console.log(" Enseignant introuvable.");
                    break;
                }
                const matiere = await question("Nouvelle matière : ");
                try {
                    updateTeacher(Number(id), { matiere });
                    logSucces(`Matière enseignant id ${id} modifiée : "${matiere}"`);
                    console.log(" Matière mise à jour.");
                } catch (e) {
                    logError(`Échec modification matière enseignant id ${id} : ${e.message}`);
                    console.log(` Erreur : ${e.message}`);
                }
                break;
            }
            case "0":
                logInfo("Retour depuis menu modification enseignant.");
                actif = false;
                break;
            default:
                logWarn(`Choix invalide dans modification enseignant : "${choix}"`);
                console.log(" Choix invalide.");
        }
    }
};

export { modifierTeacher };