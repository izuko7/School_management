import { question } from "../interface.js";
import { createSubject, getAllSubjects, getSubjectByName, getSubjectById, deleteSubject } from "../../services/subjectService.js";
import { modifierSubject } from "./sous-menu/modifierSubject.js";

const gestionSubject = async () => {
    let actif = true;
    while(actif) {
        console.log("\n〚=== GESTION DES MATIERES ===〛");
        console.log("1. Lister toute les matières");
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
                subjects.forEach(subject => {
                    console.log("┌─────────────────────────────────────┐");
                    console.log(`│ ID : ${subject.id}`);
                    console.log(`│ Nom : ${subject.nom}`);
                    console.log(`│ Professeur ID : ${subject.teacher_id}`);
                    console.log("└─────────────────────────────────────┘");
                });
                break;
            }
            case "2": {
                const nom = await question("Nom de la matière : ");
                const teacher_id = await question("ID du professeur associé : ");
                try {
                    const existing = getSubjectByName(nom);
                    if (existing) {
                        console.log(`⚠️  La matière "${nom}" existe déjà.`);
                    } else {
                        createSubject(nom, Number(teacher_id));
                        console.log("✅ Matière ajoutée.");
                    }
                } catch (e) {
                    console.log(`❌ Erreur : ${e.message}`);
                }
                break;
            }
            case "3": {
                const nom = await question("Nom de la matière à supprimer : ");
                try {
                    const subject = getSubjectByName(nom);
                    if(!subject) {
                        console.log(`❌ Matière "${nom}" introuvable.`);
                    } else {
                        deleteSubject(subject.id);
                        console.log(`🗑️  Matière "${nom}" supprimée.`)
                    }
                } catch(e) {
                    console.log(`❌ Erreur : ${e.message}`);
                }
                break;
            }
            case "4": {
                const id = await question("ID de la matière : ");
                const subject = getSubjectById(Number(id));
                if (!subject) {
                    console.log("❌ Matière introuvable.");
                } else {
                    console.log("┌─────────────────────────────────────┐");
                    console.log(`│ ID : ${subject.id}`);
                    console.log(`│ Nom : ${subject.nom}`);
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
                console.log("❌ Choix invalide.");
        }

    }
}

export { gestionSubject }