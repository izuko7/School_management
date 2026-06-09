import db from "../db/database.js";
import Subject from "../models/subjectModel.js";

// ajouter une matière
const createSubject = (nom, teacher_id) => {

    // Vérifier que le professeur existe afin d'éviter les ajouts de matières sans enseignant
    const teacher = db.prepare(`
        SELECT id FROM teachers 
        WHERE id = ?`).get(teacher_id);
    if (!teacher) {
        throw new Error(`Professeur avec l'id ${teacher_id} introuvable.`);
    }

    const subject = new Subject(nom, teacher_id);
    const insertSubject = db.prepare(`
        INSERT INTO subjects(nom, teacher_id) 
        VALUES(?, ?)
    `);
    return insertSubject.run(subject.nom, subject.teacher_id);
}



// afficher toutes les matières
const getAllSubjects = () => {
    return db.prepare(`
            SELECT * FROM subjects
        `).all();
};


// afficher une matière grâce à son id
const getSubjectById = (id) => {
    return db.prepare(`
            SELECT * FROM subjects
            WHERE id = ?
        `).get(id);
};


// faire une mise à jour
const updateSubject = (id, data) => {
const updateSubjectStmt = db.prepare(`
        UPDATE subjects SET nom = ?, teacher_id = ?
        WHERE id = ?
    `);
    return updateSubjectStmt.run(data.nom, data.teacher_id, id);
}


// supprimer une matière
const deleteSubject = (id) => {
    return db.prepare(`
            DELETE FROM subjects WHERE id = ?
        `).run(id);
};


export  { createSubject, getAllSubjects, getSubjectById, updateSubject, deleteSubject }