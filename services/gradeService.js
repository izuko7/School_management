import db from "../db/database.js";
import Grade from "../models/gradeModel.js";

// Ajouter une note
const createGrade = (student_id, subject_id, note) => {
    const student = db.prepare("SELECT id FROM students WHERE id = ?").get(student_id);
    if (!student) throw new Error(`Étudiant avec l'id ${student_id} introuvable.`);

    const subject = db.prepare("SELECT id FROM subjects WHERE id = ?").get(subject_id);
    if (!subject) throw new Error(`Matière avec l'id ${subject_id} introuvable.`);

    if (note < 0 || note > 20) throw new Error(`La note doit être entre 0 et 20.`);

    const grade = new Grade(student_id, subject_id, note);
    return db.prepare("INSERT INTO grades(student_id, subject_id, note) VALUES(?, ?, ?)").run(grade.student_id, grade.subject_id, grade.note);
};

// Ajouter plusieurs notes d'un coup
const createManyGrades = (student_id, subject_id, notes) => {
    const student = db.prepare("SELECT id FROM students WHERE id = ?").get(student_id);
    if (!student) throw new Error(`Étudiant avec l'id ${student_id} introuvable.`);

    const subject = db.prepare("SELECT id FROM subjects WHERE id = ?").get(subject_id);
    if (!subject) throw new Error(`Matière avec l'id ${subject_id} introuvable.`);

    const insert = db.prepare("INSERT INTO grades(student_id, subject_id, note) VALUES(?, ?, ?)");

    const insertMany = db.transaction((notes) => {
        for (const note of notes) {
            if (note < 0 || note > 20) throw new Error(`La note ${note} doit être entre 0 et 20.`);
            insert.run(student_id, subject_id, note);
        }
    });

    insertMany(notes);
};

// Afficher toutes les notes
const getAllGrades = () => {
    return db.prepare(`
        SELECT grades.id, students.nom, students.prenom, subjects.nom AS matiere, grades.note
        FROM grades
        JOIN students ON grades.student_id = students.id
        JOIN subjects ON grades.subject_id = subjects.id
        ORDER BY students.nom, subjects.nom
    `).all();
};

// Afficher une note par son id
const getGradeById = (id) => {
    return db.prepare("SELECT * FROM grades WHERE id = ?").get(id);
};

// Afficher les notes d'un étudiant
const getGradesByStudent = (student_id) => {
    const student = db.prepare("SELECT id FROM students WHERE id = ?").get(student_id);
    if (!student) throw new Error(`Étudiant avec l'id ${student_id} introuvable.`);

    return db.prepare(`
        SELECT grades.id, subjects.nom AS matiere, grades.note
        FROM grades
        JOIN subjects ON grades.subject_id = subjects.id
        WHERE grades.student_id = ?
        ORDER BY subjects.nom
    `).all(student_id);
};

// Afficher les notes par matière
const getGradesBySubject = (subject_id) => {
    const subject = db.prepare("SELECT id FROM subjects WHERE id = ?").get(subject_id);
    if (!subject) throw new Error(`Matière avec l'id ${subject_id} introuvable.`);

    return db.prepare(`
        SELECT grades.id, students.nom, students.prenom, grades.note
        FROM grades
        JOIN students ON grades.student_id = students.id
        WHERE grades.subject_id = ?
        ORDER BY students.nom
    `).all(subject_id);
};

// Rechercher les notes par nom de matière
const getGradesBySubjectName = (nom) => {
    const subject = db.prepare("SELECT * FROM subjects WHERE nom = ?").get(nom);
    if (!subject) throw new Error(`Matiere "${nom}" introuvable.`);

    return db.prepare(`
        SELECT grades.id, students.nom, students.prenom, grades.note
        FROM grades
        JOIN students ON grades.student_id = students.id
        WHERE grades.subject_id = ?
        ORDER BY students.nom
    `).all(subject.id);
};

// Moyenne par matière pour un étudiant
const getMoyenneBySubject = (student_id, subject_id) => {
    const rows = db.prepare(`
        SELECT note FROM grades
        WHERE student_id = ? AND subject_id = ?
    `).all(student_id, subject_id);

    if (rows.length === 0) return null;

    const notes = rows.map(r => r.note);
    return notes.reduce((acc, n) => acc + n, 0) / notes.length;
};

// Moyenne générale d'un étudiant (basée sur getMoyenneBySubject avec les 0)
const getMoyenneGenerale = (student_id) => {
    const student = db.prepare("SELECT id FROM students WHERE id = ?").get(student_id);
    if (!student) throw new Error(`Étudiant avec l'id ${student_id} introuvable.`);

    const subjects = db.prepare(`
        SELECT DISTINCT subject_id FROM grades
    `).all();

    if (subjects.length === 0) return null;

    let total = 0;
    let count = 0;

    for (const { subject_id } of subjects) {
        const moyenne = getMoyenneBySubject(student_id, subject_id);
        total += moyenne ?? 0;
        count++;
    }

    return count === 0 ? null : total / count;
};

// Modifier une note
const updateGrade = (id, data) => {
    const currentGrade = getGradeById(id);
    if (!currentGrade) throw new Error(`Note avec l'id ${id} introuvable.`);

    const student_id = data.student_id ?? currentGrade.student_id;
    const subject_id = data.subject_id ?? currentGrade.subject_id;
    const note = data.note ?? currentGrade.note;

    if (note < 0 || note > 20) throw new Error(`La note doit être entre 0 et 20.`);

    return db.prepare(`
        UPDATE grades SET student_id = ?, subject_id = ?, note = ? WHERE id = ?
    `).run(student_id, subject_id, note, id);
};

// Supprimer une note
const deleteGrade = (id) => {
    const current = getGradeById(id);
    if (!current) throw new Error(`Note avec l'id ${id} introuvable.`);
    return db.prepare("DELETE FROM grades WHERE id = ?").run(id);
};

export {
    createGrade, createManyGrades,
    getAllGrades, getGradeById,
    getGradesByStudent, getGradesBySubject,
    getMoyenneBySubject, getMoyenneGenerale,
    updateGrade, deleteGrade, getGradesBySubjectName
};