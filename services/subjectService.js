import db from "../db/database.js";
import Subject from "../models/subjectModel.js";

// Ajouter une matière
const createSubject = (nom, teacher_id) => {
    const teacher = db.prepare(`SELECT id FROM teachers WHERE id = ?`).get(teacher_id);
    if (!teacher) {
        throw new Error(`Professeur avec l'id ${teacher_id} introuvable.`);
    }

    const subject = new Subject(nom, teacher_id);
    return db.prepare(`
        INSERT INTO subjects(nom, teacher_id) VALUES(?, ?)
    `).run(subject.nom, subject.teacher_id);
};

// Afficher toutes les matières
const getAllSubjects = () => {
    return db.prepare(`SELECT * FROM subjects`).all();
};

// Afficher une matière par son id
const getSubjectById = (id) => {
    return db.prepare(`SELECT * FROM subjects WHERE id = ?`).get(id);
};

// Rechercher une matière par son nom
const getSubjectByName = (nom) => {
    return db.prepare(`SELECT * FROM subjects WHERE nom = ?`).get(nom);
};

// Modifier une matière
const updateSubject = (id, data) => {
    const current = getSubjectById(id);
    if (!current) throw new Error(`Matière avec l'id ${id} introuvable.`);

    const nom = data.nom ?? current.nom;
    const teacher_id = data.teacher_id ?? current.teacher_id;

    return db.prepare(`
        UPDATE subjects SET nom = ?, teacher_id = ? WHERE id = ?
    `).run(nom, teacher_id, id);
};

// Supprimer une matière
const deleteSubject = (id) => {
    const current = getSubjectById(id);
    if (!current) throw new Error(`Matière avec l'id ${id} introuvable.`);

    db.prepare(`
        UPDATE teachers SET matiere  = NULL WHERE id = ?
        `).run(current.teacher_id);

    return db.prepare(`DELETE FROM subjects WHERE id = ?`).run(id);
};

export { createSubject, getAllSubjects, getSubjectById, getSubjectByName, updateSubject, deleteSubject };