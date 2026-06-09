import db from "../db/database.js";
import User from "../models/userModel.js"


// ajouter un utilisateur
const createUser = (name, role) => {
    const user = new User(name, role);
    const insertUser = db.prepare(`
        INSERT INTO users(name, role) 
        VALUES(?, ?)
    `);
    return insertUser.run(user.name, user.role);
};


// afficher tout les utilisateurs
const getAllUsers = () => {
    return db.prepare(`
            SELECT * FROM users
        `).all();
};


// supprimer un utilisateur
const deleteUser = (id) => {
    return db.prepare(`
            DELETE FROM users WHERE id = ?
        `).run(id);
};


export  {createUser, getAllUsers, deleteUser}