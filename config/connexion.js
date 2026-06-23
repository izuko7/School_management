import { question } from "./interface.js";
import db from "../db/database.js";
import { logAuth, logWarn, logError } from "../utils/logger.js";

export const session = { userConnecter: null, student: null };

const seConnecter = async () => {
    console.log("\n≈≈≈ CONNEXION ≈≈≈");
    const pseudoname = await question("Pseudo : ");
    const motdepasse = await question("Mot de passe : ");

    // Vérification 
    const user = db.prepare(`
        SELECT * FROM users WHERE pseudoname = ?
    `).get(pseudoname);

    if (!user || user.motdepasse !== motdepasse) {
        console.log("Pseudo ou mot de passe incorrect.");
        logWarn(`Tentative de connexion échouée — pseudo : "${pseudoname}"`);
        return false;
    }

    session.userConnecter = user;

    if (user.role === "student") {
        const student = db.prepare(`
            SELECT * FROM students WHERE user_id = ?
        `).get(user.id);

        if (!student) {
            console.log("Aucun étudiant trouvé correspondant à votre compte.");
            logError(`Compte étudiant sans correspondance — user_id : ${user.id}`);
            session.userConnecter = null;
            return false;
        }

        session.student = student;
        console.log(`Bienvenue ${student.nom} ${student.prenom} (${user.role}) !`);
        logAuth(`Connexion réussie — ${student.nom} ${student.prenom} (étudiant)`);
    } else {
        console.log(`Bienvenue ${user.name} (${user.role}) !`);
        logAuth(`Connexion réussie — ${user.name} (${user.role})`);
    }

    return true;
};

export { seConnecter };