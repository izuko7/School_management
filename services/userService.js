import db from "../db/database.js";
import User from "../models/userModel.js";
import { logInfo, logSucces, logError } from "../utils/logger.js";

// Ajouter un utilisateur
const createUser = (name, role, motdepasse) => {
    logInfo(`Tentative création utilisateur : ${name} (${role})`);
    const user = new User(name, role, motdepasse);
    const insertUser = db.prepare(`
        INSERT INTO users(name, role, motdepasse) 
        VALUES(?, ?, ?)
    `);
    const result = insertUser.run(user.name, user.role, user.motdepasse);
    logSucces(`Utilisateur créé : ${name} (${role})`);
    return result;
};

// Afficher tous les utilisateurs
const getAllUsers = () => {
    logInfo("Récupération de tous les utilisateurs.");
    return db.prepare(`SELECT * FROM users`).all();
};

// Rechercher un utilisateur
const getUserById = (id) => {
    logInfo(`Recherche utilisateur : id ${id}`);
    const user = db.prepare(`SELECT * FROM users WHERE id = ?`).get(id);
    if (!user) logError(`Utilisateur id ${id} introuvable.`);
    return user;
};

// Modifier un utilisateur
const updateUser = (id, data) => {
    logInfo(`Tentative modification utilisateur : id ${id}`);
    const currentUser = getUserById(id);
    if (!currentUser) {
        throw new Error(`Utilisateur avec l'id ${id} introuvable.`);
    }

    const name = data.name ?? currentUser.name;
    const role = data.role ?? currentUser.role;
    const motdepasse = data.motdepasse ?? currentUser.motdepasse;

    const stmt = db.prepare(`
        UPDATE users SET name = ?, role = ?, motdepasse = ?
        WHERE id = ?
    `);
    const result = stmt.run(name, role, motdepasse, id);
    logSucces(`Utilisateur modifié : id ${id}`);
    return result;
};

// Supprimer un utilisateur
const deleteUser = (id) => {
    logInfo(`Tentative suppression utilisateur : id ${id}`);
    const current = getUserById(id);
    if (!current) {
        throw new Error(`Utilisateur avec l'id : ${id} introuvable`);
    }
    const result = db.prepare(`DELETE FROM users WHERE id = ?`).run(id);
    logSucces(`Utilisateur supprimé : ${current.name} (id ${id})`);
    return result;
};

export { createUser, getAllUsers, getUserById, updateUser, deleteUser };