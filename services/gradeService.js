import db from "../db/database.js";
import Grade from "../models/gradeModel.js";

// ajouter une note
const createGrade = (student_id, subject_id, note) => {
    // Vérifier que l'étudiant existe
    const student = db.prepare("SELECT id FROM students WHERE id = ?").get(student_id);
    if (!student) {
        throw new Error(`Etudiant avec l'id ${student_id} introuvable.`);
    }

    // Vérifier que la matière existe
    const subject = db.prepare("SELECT id FROM subjects WHERE id = ?").get(subject_id);
    if (!subject) {
        throw new Error(`Matière avec l'id ${subject_id} introuvable.`);
    }

    const grade = new Grade(student_id, subject_id, note);
    const stmt = db.prepare("INSERT INTO grades(student_id, subject_id, note) VALUES(?, ?, ?)");
    return stmt.run(grade.student_id, grade.subject_id, grade.note);
};

// afficher toutes les notes
const getAllGrades = () => {
    return db.prepare("SELECT * FROM grades").all();
};

// afficher une note grâce à son id
const getGradeById = (id) => {
    return db.prepare("SELECT * FROM grades WHERE id = ?").get(id);
};

// faire une mise à jour 
const updateGrade = (id, data) => {
    const currentGrade = getGradeById(id);
    if (!currentGrade) {
        throw new Error(`Note avec l'id ${id} introuvable.`);
    }

    const student_id = data.student_id ?? currentGrade.student_id;
    const subject_id = data.subject_id ?? currentGrade.subject_id;
    const note = data.note ?? currentGrade.note;

    const stmt = db.prepare(`
        UPDATE grades SET student_id = ?, subject_id = ?, note = ?
        WHERE id = ?
    `);
    return stmt.run(student_id, subject_id, note, id);
};

// supprimer une note
const deleteGrade = (id) => {
    return db.prepare("DELETE FROM grades WHERE id = ?").run(id);
};

export { createGrade, getAllGrades, getGradeById, updateGrade, deleteGrade };