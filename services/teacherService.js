import db from "../db/database.js";
import Teacher from "../models/teacherModel.js";
import { logInfo, logSucces, logError } from "../utils/logger.js";

// Ajouter un enseignant
const createTeacher = (nom, matiere, user_id) => {
    logInfo(`Tentative création enseignant : ${nom} (${matiere})`);

    // Vérifier que le user existe et est bien un teacher
    const user = db.prepare(`SELECT * FROM users WHERE id = ?`).get(user_id);
    if (!user) {
        logError(`user_id ${user_id} introuvable.`);
        throw new Error(`Aucun utilisateur trouvé avec l'id ${user_id}`);
    }
    if (user.role !== "teacher") {
        logError(`user_id ${user_id} n'est pas un enseignant.`);
        throw new Error(`L'utilisateur id ${user_id} n'a pas le rôle "teacher"`);
    }

    // Vérifier que ce user n'est pas déjà lié à un enseignant
    const dejaLie = db.prepare(`SELECT * FROM teachers WHERE user_id = ?`).get(user_id);
    if (dejaLie) {
        logError(`user_id ${user_id} déjà lié à un enseignant.`);
        throw new Error(`Ce compte est déjà lié à l'enseignant ${dejaLie.nom}`);
    }

    const teacher = new Teacher(nom, matiere, user_id);
    const insertTeacher = db.prepare(`
        INSERT OR IGNORE INTO teachers(nom, matiere, user_id) 
        VALUES(?, ?, ?)
    `);
    const result = insertTeacher.run(teacher.nom, teacher.matiere, teacher.user_id);

    if (result.changes === 0) {
        logError(`Enseignant "${nom}" déjà existant ou conflit détecté.`);
        throw new Error(`L'enseignant "${nom}" n'a pas pu être créé (conflit détecté).`);
    }

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
    if (!current) throw new Error(`Enseignant avec l'id ${id} introuvable.`);

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
    if (!current) throw new Error(`Enseignant avec l'id ${id} introuvable.`);

    db.prepare(`DELETE FROM subjects WHERE teacher_id = ?`).run(id);
    logInfo(`Matières supprimées pour enseignant id ${id}.`);

    const result = db.prepare(`DELETE FROM teachers WHERE id = ?`).run(id);
    logSucces(`Enseignant supprimé : ${current.nom} (id ${id})`);
    return result;
};

export { createTeacher, getAllTeachers, getTeacherById, updateTeacher, deleteTeacher };