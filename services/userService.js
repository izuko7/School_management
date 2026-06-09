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


// supprimer un utilisateur
const deleteUser = (id) => {
    return db.prepare(`
            DELETE FROM users WHERE id = ?
        `).run(id);
};


export  {createUser, getAllUsers, deleteUser}