import { question } from "../interface.js";
import { createSubject, getAllSubjects, getSubjectByName, getSubjectById, deleteSubject } from "../../services/subjectService.js";
import { modifierSubject } from "./sous-menu/modifierSubject.js";

const gestionSubject = async () => {
    let actif = true;
    while (actif) {
        console.log("\n〚=== GESTION DES MATIERES ===〛");
        console.log("1. Lister toutes les matières");
        console.log("2. Ajouter une matière");
        console.log("3. Supprimer une matière");
        console.log("4. Rechercher une matière");
        console.log("5. Modifier une matière");
        console.log("0. Retour");

        const choix = await question("Choix : ");

        switch (choix) {
            case "1": {
                const subjects = getAllSubjects();
                console.log("╔════════════════════════════════════════╗");
                console.log("║           LISTE DES MATIERES           ║");
                console.log("╚════════════════════════════════════════╝\n");

                if (subjects.length === 0) {
                    console.log("Aucune matière enregistrée.");
                    break;
                }

                subjects.forEach(subject => {
                    console.log("┌─────────────────────────────────────┐");
                    console.log(`│ ID            : ${subject.id}`);
                    console.log(`│ Nom           : ${subject.nom}`);
                    console.log(`│ Classe        : ${subject.classe}`); 
                    console.log(`│ Professeur ID : ${subject.teacher_id}`);
                    console.log("└─────────────────────────────────────┘");
                });
                break;
            }
            case "2": {
                const nom = await question("Nom de la matière : ");
                const classe = await question("Classe : ");    
                const teacher_id = await question("ID du professeur associé : ");
                try {
                    const existing = getSubjectByName(nom, classe);
                    if (existing) {
                        console.log(`La matière "${nom}" existe déjà pour la classe ${classe}.`);
                    } else {
                        createSubject(nom, classe, Number(teacher_id));
                        console.log(" Matière ajoutée.");
                    }
                } catch (e) {
                    console.log(` Erreur : ${e.message}`);
                }
                break;
            }
            case "3": {
                const id = await question("ID de la matière à supprimer : ");
                try {
                    deleteSubject(Number(id));
                    console.log("Matière supprimée.");
                } catch (e) {
                    console.log(` Erreur : ${e.message}`);
                }
                break;
            }
            case "4": {
                const id = await question("ID de la matière : ");
                const subject = getSubjectById(Number(id));
                if (!subject) {
                    console.log(" Matière introuvable.");
                } else {
                    console.log("┌─────────────────────────────────────┐");
                    console.log(`│ ID            : ${subject.id}`);
                    console.log(`│ Nom           : ${subject.nom}`);
                    console.log(`│ Classe        : ${subject.classe}`);
                    console.log(`│ Professeur ID : ${subject.teacher_id}`);
                    console.log("└─────────────────────────────────────┘");
                }
                break;
            }
            case "5": {
                await modifierSubject();
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

export { gestionSubject };