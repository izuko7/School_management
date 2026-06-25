import db from "../db/database.js";
import Subject from "../models/subjectModel.js";
import { logInfo, logSucces, logError } from "../utils/logger.js";

// Ajouter une matière
const createSubject = (nom, classe, teacher_id) => {
    logInfo(`Tentative création matière : ${nom} (${classe} - teacher_id ${teacher_id})`);

    const teacher = db.prepare(`SELECT id FROM teachers WHERE id = ?`).get(teacher_id);
    if (!teacher) {
        logError(`Professeur id ${teacher_id} introuvable.`);
        throw new Error(`Professeur avec l'id ${teacher_id} introuvable.`);
    }

    const subject = new Subject(nom, classe, teacher_id);
    const result = db.prepare(`
        INSERT INTO subjects(nom, classe, teacher_id) VALUES(?, ?, ?)
    `).run(subject.nom, subject.classe, subject.teacher_id);
    logSucces(`Matière créée : ${nom} (${classe})`);
    return result;
};

// Afficher toutes les matières
const getAllSubjects = () => {
    logInfo("Récupération de toutes les matières.");
    return db.prepare(`SELECT * FROM subjects`).all();
};

// Afficher une matière par son id
const getSubjectById = (id) => {
    logInfo(`Recherche matière : id ${id}`);
    const subject = db.prepare(`SELECT * FROM subjects WHERE id = ?`).get(id);
    if (!subject) logError(`Matière id ${id} introuvable.`);
    return subject;
};

// Rechercher une matière par son nom et sa classe
const getSubjectByName = (nom, classe) => {
    logInfo(`Recherche matière par nom : "${nom}" (${classe})`);
    const subject = db.prepare(`
        SELECT * FROM subjects WHERE nom = ? AND classe = ?
    `).get(nom, classe);
    if (!subject) logError(`Matière "${nom}" (${classe}) introuvable.`);
    return subject;
};

// Modifier une matière
const updateSubject = (id, data) => {
    logInfo(`Tentative modification matière : id ${id}`);
    const current = getSubjectById(id);
    if (!current) throw new Error(`Matière avec l'id ${id} introuvable.`);

    const nom = data.nom ?? current.nom;
    const classe = data.classe ?? current.classe;
    const teacher_id = data.teacher_id ?? current.teacher_id;

    const result = db.prepare(`
        UPDATE subjects SET nom = ?, classe = ?, teacher_id = ? WHERE id = ?
    `).run(nom, classe, teacher_id, id);
    logSucces(`Matière modifiée : id ${id}`);
    return result;
};

// Supprimer une matière
const deleteSubject = (id) => {
    logInfo(`Tentative suppression matière : id ${id}`);
    const current = getSubjectById(id);
    if (!current) throw new Error(`Matière avec l'id ${id} introuvable.`);

    db.prepare(`UPDATE teachers SET matiere = NULL WHERE id = ?`).run(current.teacher_id);
    const result = db.prepare(`DELETE FROM subjects WHERE id = ?`).run(id);
    logSucces(`Matière supprimée : ${current.nom} (id ${id})`);
    return result;
};

export { createSubject, getAllSubjects, getSubjectById, getSubjectByName, updateSubject, deleteSubject };