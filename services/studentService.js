import db from "../db/database.js";
import Student from "../models/studentModel.js";
import { logInfo, logSucces, logError } from "../utils/logger.js";

// Créer un étudiant
const createStudent = (matricule, nom, prenom, age, classe, user_id) => {
    logInfo(`Tentative création étudiant : ${nom} ${prenom} (${matricule})`);

    // Vérifier que le user existe et est bien un student
    const user = db.prepare(`SELECT * FROM users WHERE id = ?`).get(user_id);
    if (!user) {
        logError(`user_id ${user_id} introuvable.`);
        throw new Error(`Aucun utilisateur trouvé avec l'id ${user_id}`);
    }
    if (user.role !== "student") {
        logError(`user_id ${user_id} n'est pas un étudiant.`);
        throw new Error(`L'utilisateur id ${user_id} n'a pas le rôle "student"`);
    }

    // Vérifier que ce user n'est pas déjà lié à un étudiant
    const dejaLie = db.prepare(`SELECT * FROM students WHERE user_id = ?`).get(user_id);
    if (dejaLie) {
        logError(`user_id ${user_id} déjà lié à un étudiant.`);
        throw new Error(`Ce compte est déjà lié à l'étudiant ${dejaLie.nom} ${dejaLie.prenom}`);
    }

    const student = new Student(matricule, nom, prenom, age, classe, user_id);
    const insertStudent = db.prepare(`
        INSERT OR IGNORE INTO students(matricule, nom, prenom, age, classe, user_id)
        VALUES(?, ?, ?, ?, ?, ?)
    `);
    const result = insertStudent.run(
        student.matricule, student.nom, student.prenom,
        student.age, student.classe, student.user_id
    );

    if (result.changes === 0) {
        logError(`Matricule "${matricule}" déjà existant.`);
        throw new Error(`Le matricule "${matricule}" existe déjà.`);
    }

    logSucces(`Étudiant créé : ${nom} ${prenom} (${matricule})`);
    return result;
};

// Afficher tous les étudiants
const getAllStudents = () => {
    logInfo("Récupération de tous les étudiants.");
    return db.prepare(`SELECT * FROM students`).all();
};

// Afficher un étudiant par son id
const getStudentById = (id) => {
    logInfo(`Recherche étudiant : id ${id}`);
    const student = db.prepare(`SELECT * FROM students WHERE id = ?`).get(id);
    if (!student) logError(`Étudiant id ${id} introuvable.`);
    return student;
};

// Modifier un étudiant
const updateStudent = (id, data) => {
    logInfo(`Tentative modification étudiant : id ${id}`);
    const current = getStudentById(id);
    if (!current) {
        throw new Error(`Étudiant avec l'id ${id} introuvable.`);
    }

    const matricule = data.matricule ?? current.matricule;
    const nom = data.nom ?? current.nom;
    const prenom = data.prenom ?? current.prenom;
    const age = data.age ?? current.age;
    const classe = data.classe ?? current.classe;

    const result = db.prepare(`
        UPDATE students SET matricule = ?, nom = ?, prenom = ?, age = ?, classe = ?
        WHERE id = ?
    `).run(matricule, nom, prenom, age, classe, id);

    logSucces(`Étudiant modifié : id ${id}`);
    return result;
};

// Supprimer un étudiant
const deleteStudent = (id) => {
    logInfo(`Tentative suppression étudiant : id ${id}`);
    const current = getStudentById(id);
    if (!current) {
        throw new Error(`Étudiant avec l'id ${id} introuvable.`);
    }
    const result = db.prepare(`DELETE FROM students WHERE id = ?`).run(id);
    logSucces(`Étudiant supprimé : ${current.nom} ${current.prenom} (id ${id})`);
    return result;
};

export { createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent };