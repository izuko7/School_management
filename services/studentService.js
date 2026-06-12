import db from "../db/database.js";
import Student from "../models/studentModel.js";

// Créer ou ajouter étudiant
const createStudent = (matricule, nom, prenom, age, classe) => {
    const student = new Student(matricule, nom, prenom, age, classe)
    const insertStudents = db.prepare(`
            INSERT OR IGNORE INTO students(matricule, nom, prenom, age, classe)
            VALUES(?, ?, ?, ?, ?)
        `);
        return insertStudents.run(student.matricule, student.nom, student.prenom, student.age, student.classe);
};


// afficher tout les étudiants
const getAllStudents = () => {
    return db.prepare(`
            SELECT * FROM students
        `).all();
};


// afficher un étuidant grâce à son id
const getStudentById = (id) => {
    return db.prepare(`
            SELECT * FROM students
            WHERE id = ?
        `).get(id);
};


// faire une mise à jour
const updateStudent = (id, data) => {
    const current = getStudentById(id);
    if (!current) {
        throw new Error(`Étudiant avec l'id ${id} introuvable.`);
    }

    const matricule = data.matricule ?? current.matricule;
    const nom = data.nom ?? current.nom;
    const prenom = data.prenom ?? current.prenom;
    const age = data.age ?? current.age;
    const classe = data.classe ?? current.classe;

    return db.prepare(`
        UPDATE students SET matricule = ?, nom = ?, prenom = ?, age = ?, classe = ?
        WHERE id = ?
    `).run(matricule, nom, prenom, age, classe, id);
};


// supprimer un étudiant
const deleteStudent = (id) => {
    return db.prepare(`
            DELETE FROM students WHERE id = ?
        `).run(id);
};

export  { createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent }