import { question } from "../interface.js";
import {
    getClassement, getNbAbsenceParEtudiant, getTauxPresence,
    getMeilleurParMatiere, getPireParMatiere,
    getMeilleurEtudiant, getPireEtudiant
} from "../../services/statistiqueService.js";
import { getSubjectByName } from "../../services/subjectService.js";

const gestionStatistiques = async () => {
    let actif = true;
    while (actif) {
        console.log("\n〚=== STATISTIQUES ===〛");
        console.log("1. Classement des etudiants par moyenne");
        console.log("2. Nombre d'absences par etudiant");
        console.log("3. Taux de presence par etudiant");
        console.log("4. Meilleur/Pire etudiant par matiere");
        console.log("5. Meilleur etudiant general");
        console.log("6. Pire etudiant general");
        console.log("0. Retour");

        const choix = await question("Choix : ");

        switch (choix) {
            case "1": {
                const classement = getClassement();
                console.log("╔════════════════════════════════════════╗");
                console.log("║      CLASSEMENT PAR MOYENNE            ║");
                console.log("╚════════════════════════════════════════╝\n");
                if (classement.length === 0) {
                    console.log("Aucune donnee disponible.");
                } else {
                    classement.forEach((s, index) => {
                        console.log("┌─────────────────────────────────────┐");
                        console.log(`│ #${index + 1} - ${s.nom} ${s.prenom}`);
                        console.log(`│ Moyenne : ${s.moyenne}/20`);
                        console.log("└─────────────────────────────────────┘");
                    });
                }
                break;
            }
            case "2": {
                const data = getNbAbsenceParEtudiant();
                console.log("╔════════════════════════════════════════╗");
                console.log("║       ABSENCES PAR ETUDIANT            ║");
                console.log("╚════════════════════════════════════════╝\n");
                if (data.length === 0) {
                    console.log("Aucune donnee disponible.");
                } else {
                    data.forEach(s => {
                        console.log("┌─────────────────────────────────────┐");
                        console.log(`│ Etudiant : ${s.nom} ${s.prenom}`);
                        console.log(`│ Absences : ${s.nb_absences}`);
                        console.log("└─────────────────────────────────────┘");
                    });
                }
                break;
            }
            case "3": {
                const data = getTauxPresence();
                console.log("╔════════════════════════════════════════╗");
                console.log("║        TAUX DE PRESENCE                ║");
                console.log("╚════════════════════════════════════════╝\n");
                if (data.length === 0) {
                    console.log("Aucune donnee disponible.");
                } else {
                    data.forEach(s => {
                        console.log("┌─────────────────────────────────────┐");
                        console.log(`│ Etudiant : ${s.nom} ${s.prenom}`);
                        console.log(`│ Taux de presence : ${s.taux_presence}%`);
                        console.log("└─────────────────────────────────────┘");
                    });
                }
                break;
            }
            case "4": {
                const nom = await question("Nom de la matiere : ");
                const classe = await question("Classe : "); 
                const subject = getSubjectByName(nom, classe);
                if (!subject) {
                    console.log(` Matiere "${nom}" (${classe}) introuvable.`);
                    break;
                }
                const meilleur = getMeilleurParMatiere(subject.id);
                const pire = getPireParMatiere(subject.id);
                console.log("╔════════════════════════════════════════╗");
                console.log(`║     STATS MATIERE : ${nom.toUpperCase().padEnd(18)}║`);
                console.log("╚════════════════════════════════════════╝\n");
                if (meilleur) {
                    console.log("┌─────────────────────────────────────┐");
                    console.log(`│ Meilleur : ${meilleur.nom} ${meilleur.prenom}`);
                    console.log(`│ Moyenne  : ${parseFloat(meilleur.moyenne).toFixed(2)}/20`);
                    console.log("└─────────────────────────────────────┘");
                }
                if (pire) {
                    console.log("┌─────────────────────────────────────┐");
                    console.log(`│ Pire    : ${pire.nom} ${pire.prenom}`);
                    console.log(`│ Moyenne : ${parseFloat(pire.moyenne).toFixed(2)}/20`);
                    console.log("└─────────────────────────────────────┘");
                }
                break;
            }
            case "5": {
                const meilleur = getMeilleurEtudiant();
                console.log("╔════════════════════════════════════════╗");
                console.log("║          MEILLEUR ETUDIANT             ║");
                console.log("╚════════════════════════════════════════╝\n");
                if (!meilleur) {
                    console.log("Aucune donnee disponible.");
                } else {
                    console.log("┌─────────────────────────────────────┐");
                    console.log(`│ Etudiant : ${meilleur.nom} ${meilleur.prenom}`);
                    console.log(`│ Moyenne generale : ${meilleur.moyenne}/20`);
                    console.log("└─────────────────────────────────────┘");
                }
                break;
            }
            case "6": {
                const pire = getPireEtudiant();
                console.log("╔════════════════════════════════════════╗");
                console.log("║            PIRE ETUDIANT               ║");
                console.log("╚════════════════════════════════════════╝\n");
                if (!pire) {
                    console.log("Aucune donnee disponible.");
                } else {
                    console.log("┌─────────────────────────────────────┐");
                    console.log(`│ Etudiant : ${pire.nom} ${pire.prenom}`);
                    console.log(`│ Moyenne generale : ${pire.moyenne}/20`);
                    console.log("└─────────────────────────────────────┘");
                }
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

export { gestionStatistiques };