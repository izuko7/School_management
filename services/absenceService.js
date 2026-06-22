import db from "../db/database.js";
import Absence from "../models/absenceModel.js";
import { logInfo, logSucces, logWarn, logError } from "../utils/logger.js"

// Ajouter une absence
const createAbsence = (student_id, date, status) => {
    logInfo(`Tentative de création d'une absence — étudiant_id: ${student_id}, date: ${date}, status: ${status}`);

    const student = db.prepare("SELECT id FROM students WHERE id = ?").get(student_id);
    if (!student) {
        logWarn(`Création annulée — étudiant introuvable (id: ${student_id})`);
        throw new Error(`Etudiant avec l'id ${student_id} introuvable.`);
    }

    const absence = new Absence(student_id, date, status);
    const result = db.prepare(`
        INSERT INTO absences(student_id, date, status) VALUES(?, ?, ?)
    `).run(absence.student_id, absence.date, absence.status);

    logSucces(`Absence créée (id: ${result.lastInsertRowid}) pour l'étudiant id: ${student_id}`);
    return result;
};

// Afficher toutes les absences
const getAllAbsences = () => {
    logInfo("Récupération de toutes les absences");

    const absences = db.prepare(`
        SELECT absences.id, students.nom, students.prenom, absences.date, absences.status
        FROM absences
        JOIN students ON absences.student_id = students.id
        ORDER BY absences.date DESC
    `).all();

    logInfo(`${absences.length} absence(s) récupérée(s)`);
    return absences;
};

// Afficher une absence par son id
const getAbsenceById = (id) => {
    logInfo(`Récupération de l'absence id: ${id}`);

    const absence = db.prepare(`
        SELECT absences.id, students.nom, students.prenom, absences.date, absences.status
        FROM absences
        JOIN students ON absences.student_id = students.id
        WHERE absences.id = ?
    `).get(id);

    if (!absence) logWarn(`Absence id: ${id} introuvable`);
    return absence;
};

// Afficher toutes les absences d'un etudiant
const getAbsencesByStudent = (student_id) => {
    logInfo(`Récupération des absences de l'étudiant id: ${student_id}`);

    const student = db.prepare("SELECT id FROM students WHERE id = ?").get(student_id);
    if (!student) {
        logWarn(`Étudiant introuvable (id: ${student_id})`);
        throw new Error(`Etudiant avec l'id ${student_id} introuvable.`);
    }

    const absences = db.prepare(`
        SELECT absences.id, students.nom, students.prenom, absences.date, absences.status
        FROM absences
        JOIN students ON absences.student_id = students.id
        WHERE absences.student_id = ?
        ORDER BY absences.date DESC
    `).all(student_id);

    logInfo(`${absences.length} absence(s) trouvée(s) pour l'étudiant id: ${student_id}`);
    return absences;
};

// Modifier une absence
const updateAbsence = (id, data) => {
    logInfo(`Tentative de modification de l'absence id: ${id}`);

    const current = getAbsenceById(id);
    if (!current) {
        logWarn(`Modification annulée — absence introuvable (id: ${id})`);
        throw new Error(`Absence avec l'id ${id} introuvable.`);
    }

    const student_id = data.student_id ?? current.student_id;
    const date = data.date ?? current.date;
    const status = data.status ?? current.status;

    const result = db.prepare(`
        UPDATE absences SET student_id = ?, date = ?, status = ? WHERE id = ?
    `).run(student_id, date, status, id);

    logSucces(`Absence id: ${id} modifiée avec succès`);
    return result;
};

// Supprimer une absence
const deleteAbsence = (id) => {
    logInfo(`Tentative de suppression de l'absence id: ${id}`);

    const current = getAbsenceById(id);
    if (!current) {
        logWarn(`Suppression annulée — absence introuvable (id: ${id})`);
        throw new Error(`Absence avec l'id ${id} introuvable.`);
    }

    const result = db.prepare("DELETE FROM absences WHERE id = ?").run(id);
    logSucces(`Absence id: ${id} supprimée avec succès`);
    return result;
};

export { createAbsence, getAllAbsences, getAbsenceById, getAbsencesByStudent, updateAbsence, deleteAbsence };