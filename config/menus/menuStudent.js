import { question } from "../interface.js";
import { session } from "../connexion.js";
import { getGradesByStudent, getMoyenneGenerale, getMoyenneBySubject } from "../../services/gradeService.js";
import { getAbsencesByStudent } from "../../services/absenceService.js";
import { getSubjectByName } from "../../services/subjectService.js";

const menuStudent = async () => {
    const student = session.student;
    const student_id = student.id;

    let actif = true;
    while (actif) {
        console.log("\n〚=== MENU ETUDIANT ===〛");
        console.log(`Connecte en tant que : ${student.nom} ${student.prenom} | Classe : ${student.classe}`);
        console.log("1. Voir mes notes");
        console.log("2. Voir ma moyenne generale");
        console.log("3. Voir ma moyenne par matiere");
        console.log("4. Consulter mes absences");
        console.log("0. Deconnexion");

        const choix = await question("Choix: ");

        switch (choix) {
            case "1": {
                const grades = getGradesByStudent(student_id);
                if (grades.length === 0) {
                    console.log("Aucune note enregistree.");
                } else {
                    console.log("╔════════════════════════════════════════╗");
                    console.log("║              MES NOTES                 ║");
                    console.log("╚════════════════════════════════════════╝\n");
                    grades.forEach(grade => {
                        console.log("┌─────────────────────────────────────┐");
                        console.log(`│ Matiere : ${grade.matiere}`);
                        console.log(`│ Note : ${grade.note}/20`);
                        console.log("└─────────────────────────────────────┘");
                    });
                }
                break;
            }
            case "2": {
                const moyenne = getMoyenneGenerale(student_id);
                if (moyenne === null) {
                    console.log("Aucune note enregistree.");
                } else {
                    console.log("┌─────────────────────────────────────┐");
                    console.log(`│ Moyenne generale : ${moyenne.toFixed(2)}/20`);
                    console.log("└─────────────────────────────────────┘");
                }
                break;
            }
            case "3": {
                const nom_matiere = await question("Nom de la matiere : ");
                const subject = getSubjectByName(nom_matiere);
                if (!subject) {
                    console.log(`Matiere "${nom_matiere}" introuvable.`);
                    break;
                }
                const moyenne = getMoyenneBySubject(student_id, subject.id);
                if (moyenne === null) {
                    console.log("Aucune note pour cette matiere.");
                } else {
                    console.log("┌─────────────────────────────────────┐");
                    console.log(`│ Matiere : ${nom_matiere}`);
                    console.log(`│ Moyenne : ${moyenne.toFixed(2)}/20`);
                    console.log("└─────────────────────────────────────┘");
                }
                break;
            }
            case "4": {
                const absences = getAbsencesByStudent(student_id);
                if (absences.length === 0) {
                    console.log("Aucune absence enregistree.");
                } else {
                    console.log("╔════════════════════════════════════════╗");
                    console.log("║            MES ABSENCES                ║");
                    console.log("╚════════════════════════════════════════╝\n");
                    absences.forEach(absence => {
                        console.log("┌─────────────────────────────────────┐");
                        console.log(`│ Date : ${absence.date}`);
                        console.log(`│ Status : ${absence.status}`);
                        console.log("└─────────────────────────────────────┘");
                    });
                }
                break;
            }
            case "0":
                actif = false;
                console.log("Deconnexion.");
                break;
            default:
                console.log("Choix invalide.");
        }
    }
};

export { menuStudent };