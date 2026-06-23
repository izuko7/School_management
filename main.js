import "./db/tables.js";
import { menuPrincipal } from "./config/menuPrincipal.js";
import { createUser } from "./services/userService.js";
import { createStudent } from "./services/studentService.js";
import db from "./db/database.js";

const seedData = () => { 
    const dejaInsere = db.prepare(`SELECT * FROM users`).all();
    if (dejaInsere.length > 0) return;

    console.log("🌱 Insertion des données de test...");

    const admin = createUser("Super Admin", "admin", "admin123", "admin1234");
    console.log("✅ Admin créé — pseudo: admin123 / mdp: admin1234");

    const userStudent = createUser("Jean Dupont", "student", "jean123", "jean1234");
    const user_id = userStudent.lastInsertRowid;
    console.log(`✅ User student créé — pseudo: jean123 / mdp: jean1234 / ID: ${user_id}`);

    createStudent("ETU001", "Dupont", "Jean", 20, "L1", user_id);
    console.log("✅ Étudiant créé — matricule: ETU001");
};

seedData();
menuPrincipal();