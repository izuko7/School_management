import { question } from "../interface.js";
import {
    createGrade, createManyGrades,
    getAllGrades, getGradeById,
    getGradesByStudent, getGradesBySubject, getGradesBySubjectName,
    getMoyenneBySubject, getMoyenneGenerale,
    updateGrade, deleteGrade
} from "../../services/gradeService.js";
import { getSubjectByName } from "../../services/subjectService.js";

const gestionGrades = async () => {
    let actif = true;
    while (actif) {
        console.log("\n〚=== GESTION DES NOTES ===〛");
        console.log("1. Lister toutes les notes");
        console.log("2. Ajouter une note");
        console.log("3. Ajouter plusieurs notes");
        console.log("4. Notes d'un etudiant");
        console.log("5. Notes par matiere");
        console.log("6. Moyenne par matiere pour un etudiant");
        console.log("7. Moyenne generale d'un etudiant");
        console.log("8. Modifier une note");
        console.log("9. Supprimer une note");
        console.log("0. Retour");

        const choix = await question("Choix: ");

        switch (choix) {
            case "1": {
                const grades = getAllGrades();
                console.log("╔════════════════════════════════════════╗");
                console.log("║            LISTE DES NOTES             ║");
                console.log("╚════════════════════════════════════════╝\n");
                if (grades.length === 0) {
                    console.log("Aucune note enregistree.");
                } else {
                    grades.forEach(grade => {
                        console.log("┌─────────────────────────────────────┐");
                        console.log(`│ ID : ${grade.id}`);
                        console.log(`│ Etudiant : ${grade.nom} ${grade.prenom}`);
                        console.log(`│ Matiere : ${grade.matiere}`);
                        console.log(`│ Note : ${grade.note}/20`);
                        console.log("└─────────────────────────────────────┘");
                    });
                }
                break;
            }
            case "2": {
                const student_id = await question("ID de l'etudiant : ");
                const subject_id = await question("ID de la matiere : ");
                const note = await question("Note sur 20 : ");
                createGrade(Number(student_id), Number(subject_id), Number(note));
                console.log("Note ajoutee.");
                break;
            }
            case "3": {
                const student_id = await question("ID de l'etudiant : ");
                const subject_id = await question("ID de la matiere : ");
                const saisie = await question("Notes separees par des virgules (ex: 12,14,16) : ");
                const notes = saisie.split(",").map(n => Number(n.trim()));
                createManyGrades(Number(student_id), Number(subject_id), notes);
                console.log(`${notes.length} note(s) ajoutee(s).`);
                break;
            }
            case "4": {
                const student_id = await question("ID de l'etudiant : ");
                const grades = getGradesByStudent(Number(student_id));
                if (grades.length === 0) {
                    console.log("Aucune note pour cet etudiant.");
                } else {
                    console.log("╔════════════════════════════════════════╗");
                    console.log("║           NOTES DE L'ETUDIANT          ║");
                    console.log("╚════════════════════════════════════════╝\n");
                    grades.forEach(grade => {
                        console.log("┌─────────────────────────────────────┐");
                        console.log(`│ ID : ${grade.id}`);
                        console.log(`│ Etudiant : ${grade.nom} ${grade.prenom}`);
                        console.log(`│ Matiere : ${grade.matiere}`);
                        console.log(`│ Note : ${grade.note}/20`);
                        console.log("└─────────────────────────────────────┘");
                    });
                }
                break;
            }
            case "5": {
                const nom = await question("Nom de la matiere : ");
                const grades = getGradesBySubjectName(nom);
                if (grades.length === 0) {
                    console.log("Aucune note pour cette matiere.");
                } else {
                    console.log("╔════════════════════════════════════════╗");
                    console.log("║           NOTES PAR MATIERE            ║");
                    console.log("╚════════════════════════════════════════╝\n");
                    grades.forEach(grade => {
                        console.log("┌─────────────────────────────────────┐");
                        console.log(`│ ID : ${grade.id}`);
                        console.log(`│ Etudiant : ${grade.nom} ${grade.prenom}`);
                        console.log(`│ Note : ${grade.note}/20`);
                        console.log("└─────────────────────────────────────┘");
                    });
                }
                break;
            }
            case "6": {
                const student_id = await question("ID de l'etudiant : ");
                const nom_matiere = await question("Nom de la matiere : ");
                const subject = getSubjectByName(nom_matiere);
                if (!subject) {
                    console.log(`Matiere "${nom_matiere}" introuvable.`);
                    break;
                }
                const moyenne = getMoyenneBySubject(Number(student_id), subject.id);
                if (moyenne === null) {
                    console.log("Aucune note trouvee.");
                } else {
                    console.log("┌─────────────────────────────────────┐");
                    console.log(`│ Moyenne : ${moyenne.toFixed(2)}/20`);
                    console.log("└─────────────────────────────────────┘");
                }
                break;
            }
            case "7": {
                const student_id = await question("ID de l'etudiant : ");
                const moyenne = getMoyenneGenerale(Number(student_id));
                if (moyenne === null) {
                    console.log("Aucune note trouvee.");
                } else {
                    console.log("┌─────────────────────────────────────┐");
                    console.log(`│ Moyenne generale : ${moyenne.toFixed(2)}/20`);
                    console.log("└─────────────────────────────────────┘");
                }
                break;
            }
            case "8": {
                const id = await question("ID de la note a modifier : ");
                const note = await question("Nouvelle note (0-20) : ");
                updateGrade(Number(id), { note: Number(note) });
                console.log("Note mise a jour.");
                break;
            }
            case "9": {
                const id = await question("ID de la note a supprimer : ");
                deleteGrade(Number(id));
                console.log("Note supprimee.");
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

export { gestionGrades };