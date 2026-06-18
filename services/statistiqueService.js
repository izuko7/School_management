import db from "../db/database.js";
import { getMoyenneGenerale } from "./gradeService.js";

// Classement des étudiants par moyenne
const getClassement = () => {
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

    return classement.filter(s => s.moyenne !== null).sort((a, b) => b.moyenne - a.moyenne);
};

// Nombre d'absences par étudiant
const getNbAbsenceParEtudiant = () => {
    return db.prepare(`
        SELECT students.id, students.nom, students.prenom, COUNT(absences.id) AS nb_absences
        FROM students
        LEFT JOIN absences ON absences.student_id = students.id
        GROUP BY students.id
        ORDER BY nb_absences DESC
    `).all(); 
};

// Taux de présence par étudiant
const getTauxPresence = () => {
    return db.prepare(`
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
};

// Meilleur étudiant par matière
const getMeilleurParMatiere = (subject_id) => { 
    return db.prepare(`
        SELECT students.id, students.nom, students.prenom, AVG(grades.note) AS moyenne
        FROM grades
        JOIN students ON grades.student_id = students.id
        WHERE grades.subject_id = ?
        GROUP BY grades.student_id
        ORDER BY moyenne DESC
        LIMIT 1
    `).get(subject_id) ?? null;
};

// Pire étudiant par matière
const getPireParMatiere = (subject_id) => {
    return db.prepare(`
        SELECT students.id, students.nom, students.prenom, AVG(grades.note) AS moyenne
        FROM grades
        JOIN students ON grades.student_id = students.id
        WHERE grades.subject_id = ?
        GROUP BY grades.student_id
        ORDER BY moyenne ASC
        LIMIT 1
    `).get(subject_id) ?? null;
};

// Meilleur étudiant général
const getMeilleurEtudiant = () => {
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
    return meilleur;
};

// Pire étudiant général
const getPireEtudiant = () => {
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
    return pire;
};

export {
    getClassement, getNbAbsenceParEtudiant, getTauxPresence,
    getMeilleurParMatiere, getPireParMatiere,
    getMeilleurEtudiant, getPireEtudiant
};