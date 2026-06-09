import db from "../db/database.js";
import Teacher from "../models/teacherModel.js";

// ajouter un enseignant
const createTeacher = (nom, matiere) => {
    const teacher = new Teacher(nom, matiere);
    const insertTeacher = db.prepare(`
        INSERT INTO teachers(nom, matiere) 
        VALUES(?, ?)
    `);
    return insertTeacher.run(teacher.nom, teacher.matiere);
}



// afficher tout les enseignants
const getAllTeachers = () => {
    return db.prepare(`
            SELECT * FROM teachers
        `).all();
};


// afficher un enseignant grâce à son id
const getTeacherById = (id) => {
    return db.prepare(`
            SELECT * FROM teachers
            WHERE id = ?
        `).get(id);
};


// faire une mise à jour
const updateTeacher = (id, data) => {
const updateTeacherStmt = db.prepare(`
        UPDATE teachers SET nom = ?, matiere = ?
        WHERE id = ?
    `);
    return updateTeacherStmt.run(data.nom, data.matiere, id);
}


// supprimer un enseignant
const deleteTeacher = (id) => {
    return db.prepare(`
            DELETE FROM teachers WHERE id = ?
        `).run(id);
};


export { createTeacher, getAllTeachers, getTeacherById, updateTeacher, deleteTeacher }