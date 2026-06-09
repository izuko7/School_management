import db from "../db/database.js";
import Absence from "../models/absenceModel.js";

// ajouter une absence
const createAbsence = (student_id, date, status) => {
    // Vérifier que l'étudiant existe
    const student = db.prepare("SELECT id FROM students WHERE id = ?").get(student_id);
    if (!student) {
        throw new Error(`Etudiant avec l'id ${student_id} introuvable.`);
    }

     const absence = new Absence(student_id, date, status);
    const stmt = db.prepare(`
        INSERT INTO absences(student_id, date, status) 
        VALUES(?, ?, ?)
        `);
    return stmt.run(absence.student_id, absence.date, absence.status);
};

// afficher toutes les absences
const getAllAbsences = () => {
    return db.prepare("SELECT * FROM absences").all();
};

// afficher une absence grâce à son id
const getAbsenceById = (id) => {
    return db.prepare("SELECT * FROM absences WHERE id = ?").get(id);
};

// faire une mise à jour (sécurisé)
const updateAbsence = (id, data) => {
    const currentAbsence = getAbsenceById(id);
    if (!currentAbsence) {
        throw new Error(`Absence avec l'id ${id} introuvable.`);
    }

    const student_id = data.student_id ?? currentAbsence.student_id;
    const date = data.date ?? currentAbsence.date;
    const status = data.status ?? currentAbsence.status;

    const stmt = db.prepare(`
        UPDATE absences SET student_id = ?, date = ?, status = ?
        WHERE id = ?
    `);
    return stmt.run(student_id, date, status, id);
};

// supprimer une absence
const deleteAbsence = (id) => {
    return db.prepare("DELETE FROM absences WHERE id = ?").run(id);
};


export { createAbsence, getAllAbsences, getAbsenceById, updateAbsence, deleteAbsence };