import { question } from "./interface.js";
import { getAllUsers } from "../services/userService.js";
import db from "../db/database.js";

export const session = { userConnecter: null, student: null };

const seConnecter = async () => {
    console.log("\n≈≈≈ CONNEXION ≈≈≈");
    const nom = await question("Nom : ");
    const motdepasse = await question("Mot de passe : ");

    const users = getAllUsers();
    const user = users.find(u => u.name === nom && u.motdepasse === motdepasse);

    if (!user) {
        console.log("Utilisateur introuvable. Verifiez votre nom et mot de passe.");
        return false;
    }

    session.userConnecter = user;

    if (user.role === "student") {
        const student = db.prepare(`
            SELECT * FROM students 
            WHERE LOWER(nom) = LOWER(?) 
            OR LOWER(prenom) = LOWER(?)
        `).get(user.name, user.name);

        if (!student) {
            console.log("Aucun etudiant trouve correspondant a votre compte.");
            session.userConnecter = null;
            return false;
        }

        session.student = student;
        console.log(`Bienvenue ${student.nom} ${student.prenom} (${user.role}) !`);
    } else {
        console.log(`Bienvenue ${user.name} (${user.role}) !`);
    }

    return true;
};

export { seConnecter };