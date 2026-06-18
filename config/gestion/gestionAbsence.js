import { question } from "../interface.js";
import { createAbsence, getAllAbsences, getAbsenceById, getAbsencesByStudent, updateAbsence, deleteAbsence } from "../../services/absenceService.js";
import { aujourdHui } from "../date.js"; 

const gestionAbsence = async () => {
    let actif = true;
    while (actif) { 
        console.log("\n〚=== GESTION DES ABSENCES ===〛");
        console.log("1. Lister toutes les absences");
        console.log("2. Ajouter une absence");
        console.log("3. Afficher une absence par son ID");
        console.log("4. Mettre a jour une absence");
        console.log("5. Absences d'un etudiant");
        console.log("6. Supprimer une absence");
        console.log("0. Retour");

        const choix = await question("Choix : ");

        switch (choix) {
            case "1": {
                const absences = getAllAbsences();
                console.log("╔════════════════════════════════════════╗");
                console.log("║           LISTE DES ABSENCES           ║"); 
                console.log("╚════════════════════════════════════════╝\n");
                if (absences.length === 0) {
                    console.log("Aucune absence enregistree.");
                } else {
                    absences.forEach(absence => {
                        console.log("┌─────────────────────────────────────┐");
                        console.log(`│ ID : ${absence.id}`);
                        console.log(`│ Etudiant : ${absence.nom} ${absence.prenom}`);
                        console.log(`│ Date : ${absence.date}`);
                        console.log(`│ Status : ${absence.status}`);
                        console.log("└─────────────────────────────────────┘");
                    });
                }
                break;
            }
            case "2": {
                const student_id = await question("ID de l'etudiant : ");
                console.log(`Date du jour : ${aujourdHui}`);
                const dateReponse = await question("Utiliser la date du jour ? (Y/n) : ");
                const date = dateReponse === "Y" ? aujourdHui() : await question("Date (YYYY-MM-DD) : ");
                const status = await question("Status (present/absent/retard) : ");
                createAbsence(Number(student_id), date, status);
                console.log("Absence ajoutee.");
                break;
            }
            case "3": {
                const id = await question("ID de l'absence : ");
                const absence = getAbsenceById(Number(id));
                if (!absence) {
                    console.log("Absence introuvable.");
                } else {
                    console.log("┌─────────────────────────────────────┐");
                    console.log(`│ ID : ${absence.id}`);
                    console.log(`│ Student ID : ${absence.student_id}`);
                    console.log(`│ Date : ${absence.date}`);
                    console.log(`│ Status : ${absence.status}`);
                    console.log("└─────────────────────────────────────┘");
                }
                break;
            }
            case "4": {
                const id = await question("ID de l'absence a modifier : ");
                const status = await question("Nouveau status (Justifiée/Non justifiée) : ");
                updateAbsence(Number(id), { status });
                console.log("Absence mise a jour.");
                break;
            }
            case "5": {
                const student_id = await question("ID de l'etudiant : ");
                const absences = getAbsencesByStudent(Number(student_id));
                if (absences.length === 0) {
                    console.log("Aucune absence pour cet etudiant.");
                } else {
                    console.log("╔════════════════════════════════════════╗");
                    console.log("║         ABSENCES DE L'ETUDIANT         ║");
                    console.log("╚════════════════════════════════════════╝\n");
                    absences.forEach(absence => {
                        console.log("┌─────────────────────────────────────┐");
                        console.log(`│ ID : ${absence.id}`);
                        console.log(`│ Etudiant : ${absence.nom} ${absence.prenom}`);
                        console.log(`│ Date : ${absence.date}`);
                        console.log(`│ Status : ${absence.status}`);
                        console.log("└─────────────────────────────────────┘");
                    });
                }
                break;
            }
            case "6": {
                const id = await question("ID de l'absence a supprimer : ");
                deleteAbsence(Number(id));
                console.log("Absence supprimee.");
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

export { gestionAbsence };