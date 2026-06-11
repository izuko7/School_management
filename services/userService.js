import db from "../db/database.js";
import User from "../models/userModel.js"


// ajouter un utilisateur
const createUser = (name, role, motdepasse) => {
    const user = new User(name, role, motdepasse);
    const insertUser = db.prepare(`
        INSERT INTO users(name, role, motdepasse) 
        VALUES(?, ?, ?)
    `);
    return insertUser.run(user.name, user.role, user.motdepasse);
};


// afficher tout les utilisateurs
const getAllUsers = () => {
    return db.prepare(`
            SELECT * FROM users
        `).all();
};

// rechercher un utilisateur
const getUserById = (id) => {
    return db.prepare(`
        SELECT * FROM users
        WHERE id = ?
    `).get(id);
};


// modifier un utilisateur
const updateUser = (id, data) => {
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
    return stmt.run(name, role, motdepasse, id);
};

// supprimer un utilisateur
const deleteUser = (id) => {
    return db.prepare(`
            DELETE FROM users WHERE id = ?
        `).run(id);
};


export  {createUser, getAllUsers, getUserById, updateUser, deleteUser}