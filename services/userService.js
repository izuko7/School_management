import db from "../db/database.js";
import User from "../models/userModel.js";
import { logSucces, logError } from "../utils/logger.js";

// Ajouter un utilisateur
const createUser = (name, role, motdepasse) => {
    const user = new User(name, role, motdepasse);
    const insertUser = db.prepare(`
        INSERT INTO users(name, role, motdepasse) 
        VALUES(?, ?, ?)
    `);
    const result = insertUser.run(user.name, user.role, user.motdepasse);
    logSucces(`Utilisateur cree : ${name} (${role})`); // ← deplace avant le return
    return result;
};

// Afficher tous les utilisateurs
const getAllUsers = () => {
    return db.prepare(`SELECT * FROM users`).all();
};

// Rechercher un utilisateur
const getUserById = (id) => {
    return db.prepare(`SELECT * FROM users WHERE id = ?`).get(id);
};

// Modifier un utilisateur
const updateUser = (id, data) => {
    const currentUser = getUserById(id);
    if (!currentUser) {
        logError(`Utilisateur avec l'id ${id} introuvable`);
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
    logSucces(`Utilisateur modifie : id ${id}`); // ← deplace apres le run
    return result;
};

// Supprimer un utilisateur
const deleteUser = (id) => {
    const current = getUserById(id);
    if (!current) {
        logError(`Echec suppression utilisateur : id ${id} introuvable`);
        throw new Error(`Utilisateur avec l'id : ${id} introuvable`);
    }
    const result = db.prepare(`DELETE FROM users WHERE id = ?`).run(id);
    logSucces(`Utilisateur supprime : ${current.name}`);
    return result;
};

export { createUser, getAllUsers, getUserById, updateUser, deleteUser };