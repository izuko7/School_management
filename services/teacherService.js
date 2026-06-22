import db from "../db/database.js";
import Teacher from "../models/teacherModel.js";
import { logInfo, logSucces, logError } from "../utils/logger.js";

// Ajouter un enseignant
const createTeacher = (nom, matiere) => {
    logInfo(`Tentative création enseignant : ${nom} (${matiere})`);
    const teacher = new Teacher(nom, matiere);
    const insertTeacher = db.prepare(`
        INSERT INTO teachers(nom, matiere) 
        VALUES(?, ?)
    `);
    const result = insertTeacher.run(teacher.nom, teacher.matiere);
    logSucces(`Enseignant créé : ${nom} (${matiere})`);
    return result;
};

// Afficher tous les enseignants
const getAllTeachers = () => {
    logInfo("Récupération de tous les enseignants.");
    return db.prepare(`SELECT * FROM teachers`).all();
};

// Afficher un enseignant par id
const getTeacherById = (id) => {
    logInfo(`Recherche enseignant : id ${id}`);
    const teacher = db.prepare(`SELECT * FROM teachers WHERE id = ?`).get(id);
    if (!teacher) logError(`Enseignant id ${id} introuvable.`);
    return teacher;
};

// Modifier un enseignant
const updateTeacher = (id, data) => {
    logInfo(`Tentative modification enseignant : id ${id}`);
    const current = getTeacherById(id);
    if (!current) throw new Error(`Professeur avec l'id ${id} introuvable.`);

    const nom = data.nom ?? current.nom;
    const matiere = data.matiere ?? current.matiere;

    const result = db.prepare(`
        UPDATE teachers SET nom = ?, matiere = ? WHERE id = ?
    `).run(nom, matiere, id);
    logSucces(`Enseignant modifié : id ${id}`);
    return result;
};

// Supprimer un enseignant
const deleteTeacher = (id) => {
    logInfo(`Tentative suppression enseignant : id ${id}`);
    const current = getTeacherById(id);
    if (!current) throw new Error(`Professeur avec l'id ${id} introuvable.`);

    db.prepare(`DELETE FROM subjects WHERE teacher_id = ?`).run(id);
    logInfo(`Matières supprimées pour enseignant id ${id}.`);

    const result = db.prepare(`DELETE FROM teachers WHERE id = ?`).run(id);
    logSucces(`Enseignant supprimé : ${current.nom} (id ${id})`);
    return result;
};

export { createTeacher, getAllTeachers, getTeacherById, updateTeacher, deleteTeacher };