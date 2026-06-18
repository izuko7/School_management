import db from "../db/database.js";
import Absence from "../models/absenceModel.js";

// Ajouter une absence
const createAbsence = (student_id, date, status) => {
    const student = db.prepare("SELECT id FROM students WHERE id = ?").get(student_id);
    if (!student) throw new Error(`Etudiant avec l'id ${student_id} introuvable.`);

    const absence = new Absence(student_id, date, status);
    return db.prepare(`
        INSERT INTO absences(student_id, date, status) VALUES(?, ?, ?)
    `).run(absence.student_id, absence.date, absence.status);
};

// Afficher toutes les absences
const getAllAbsences = () => {
    return db.prepare(`
        SELECT absences.id, students.nom, students.prenom, absences.date, absences.status
        FROM absences
        JOIN students ON absences.student_id = students.id
        ORDER BY absences.date DESC
    `).all();
};

// Afficher une absence par son id
const getAbsenceById = (id) => {
    return db.prepare(`
        SELECT absences.id, students.nom, students.prenom, absences.date, absences.status
        FROM absences
        JOIN students ON absences.student_id = students.id
        WHERE absences.id = ?
    `).get(id);
};

// Afficher toutes les absences d'un etudiant
const getAbsencesByStudent = (student_id) => {
    const student = db.prepare("SELECT id FROM students WHERE id = ?").get(student_id);
    if (!student) throw new Error(`Etudiant avec l'id ${student_id} introuvable.`);

    return db.prepare(`
        SELECT absences.id, students.nom, students.prenom, absences.date, absences.status
        FROM absences
        JOIN students ON absences.student_id = students.id
        WHERE absences.student_id = ?
        ORDER BY absences.date DESC
    `).all(student_id);
};

// Modifier une absence
const updateAbsence = (id, data) => {
    const current = getAbsenceById(id);
    if (!current) throw new Error(`Absence avec l'id ${id} introuvable.`);

    const student_id = data.student_id ?? current.student_id;
    const date = data.date ?? current.date;
    const status = data.status ?? current.status;

    return db.prepare(`
        UPDATE absences SET student_id = ?, date = ?, status = ? WHERE id = ?
    `).run(student_id, date, status, id);
};

// Supprimer une absence
const deleteAbsence = (id) => {
    const current = getAbsenceById(id);
    if (!current) throw new Error(`Absence avec l'id ${id} introuvable.`);
    return db.prepare("DELETE FROM absences WHERE id = ?").run(id);
};

export { createAbsence, getAllAbsences, getAbsenceById, getAbsencesByStudent, updateAbsence, deleteAbsence };