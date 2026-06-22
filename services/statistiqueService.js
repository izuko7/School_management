import db from "../db/database.js";
import { getMoyenneGenerale } from "./gradeService.js";
import { logInfo, logWarn } from "../utils/logger.js";

// Classement des étudiants par moyenne
const getClassement = () => {
    logInfo("Calcul du classement des étudiants.");
    const students = db.prepare("SELECT id, nom, prenom FROM students").all();

    const classement = students.map(student => {
        const moyenne = getMoyenneGenerale(student.id);
        return {
            student_id: student.id,
            nom: student.nom,
            prenom: student.prenom,
            moyenne: moyenne !== null ? parseFloat(moyenne.toFixed(2)) : null
        };
    });

    const result = classement.filter(s => s.moyenne !== null).sort((a, b) => b.moyenne - a.moyenne);
    if (result.length === 0) logWarn("Classement vide : aucun étudiant avec des notes.");
    return result;
};

// Nombre d'absences par étudiant
const getNbAbsenceParEtudiant = () => {
    logInfo("Récupération du nombre d'absences par étudiant.");
    const result = db.prepare(`
        SELECT students.id, students.nom, students.prenom, COUNT(absences.id) AS nb_absences
        FROM students
        LEFT JOIN absences ON absences.student_id = students.id
        GROUP BY students.id
        ORDER BY nb_absences DESC
    `).all();
    if (result.length === 0) logWarn("Aucune donnée d'absence trouvée.");
    return result;
};

// Taux de présence par étudiant
const getTauxPresence = () => {
    logInfo("Calcul du taux de présence par étudiant.");
    const result = db.prepare(`
        SELECT students.id, students.nom, students.prenom,
        COUNT(absences.id) AS total,
        SUM(CASE WHEN absences.status = 'Justifiée' THEN 1 ELSE 0 END) AS presents,
        ROUND(
            100.0 * SUM(CASE WHEN absences.status = 'Justifiée' THEN 1 ELSE 0 END) / COUNT(absences.id),
            2
        ) AS taux_presence
        FROM students
        JOIN absences ON absences.student_id = students.id
        GROUP BY students.id
        ORDER BY taux_presence DESC
    `).all();
    if (result.length === 0) logWarn("Aucune donnée de présence trouvée.");
    return result;
};

// Meilleur étudiant par matière
const getMeilleurParMatiere = (subject_id) => {
    logInfo(`Recherche meilleur étudiant pour matière id ${subject_id}.`);
    const result = db.prepare(`
        SELECT students.id, students.nom, students.prenom, AVG(grades.note) AS moyenne
        FROM grades
        JOIN students ON grades.student_id = students.id
        WHERE grades.subject_id = ?
        GROUP BY grades.student_id
        ORDER BY moyenne DESC
        LIMIT 1
    `).get(subject_id) ?? null;
    if (!result) logWarn(`Aucun étudiant trouvé pour matière id ${subject_id}.`);
    return result;
};

// Pire étudiant par matière
const getPireParMatiere = (subject_id) => {
    logInfo(`Recherche pire étudiant pour matière id ${subject_id}.`);
    const result = db.prepare(`
        SELECT students.id, students.nom, students.prenom, AVG(grades.note) AS moyenne
        FROM grades
        JOIN students ON grades.student_id = students.id
        WHERE grades.subject_id = ?
        GROUP BY grades.student_id
        ORDER BY moyenne ASC
        LIMIT 1
    `).get(subject_id) ?? null;
    if (!result) logWarn(`Aucun étudiant trouvé pour matière id ${subject_id}.`);
    return result;
};

// Meilleur étudiant général
const getMeilleurEtudiant = () => {
    logInfo("Recherche du meilleur étudiant général.");
    const students = db.prepare("SELECT id, nom, prenom FROM students").all();
    let meilleur = null;

    for (const student of students) {
        const moyenne = getMoyenneGenerale(student.id);
        if (moyenne !== null) {
            if (!meilleur || moyenne > meilleur.moyenne) {
                meilleur = { ...student, moyenne: parseFloat(moyenne.toFixed(2)) };
            }
        }
    }
    if (!meilleur) logWarn("Aucun meilleur étudiant trouvé : données insuffisantes.");
    return meilleur;
};

// Pire étudiant général
const getPireEtudiant = () => {
    logInfo("Recherche du pire étudiant général.");
    const students = db.prepare("SELECT id, nom, prenom FROM students").all();
    let pire = null;

    for (const student of students) {
        const moyenne = getMoyenneGenerale(student.id);
        if (moyenne !== null) {
            if (!pire || moyenne < pire.moyenne) {
                pire = { ...student, moyenne: parseFloat(moyenne.toFixed(2)) };
            }
        }
    }
    if (!pire) logWarn("Aucun pire étudiant trouvé : données insuffisantes.");
    return pire;
};

export {
    getClassement, getNbAbsenceParEtudiant, getTauxPresence,
    getMeilleurParMatiere, getPireParMatiere,
    getMeilleurEtudiant, getPireEtudiant
};