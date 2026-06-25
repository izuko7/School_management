import "./db/tables.js";
import { menuPrincipal } from "./config/menuPrincipal.js";
import { createUser } from "./services/userService.js";
import { createStudent } from "./services/studentService.js";
import { createTeacher } from "./services/teacherService.js";
import { createSubject } from "./services/subjectService.js";
import { logInfo, logSucces, logWarn } from "./utils/logger.js";
import db from "./db/database.js";

const seedData = () => {
    const dejaInsere = db.prepare(`SELECT * FROM users`).all();
    if (dejaInsere.length > 0) {
        logWarn("Données déjà présentes, seed ignoré.");
        return;
    }

    logInfo("Insertion des données de test...");

    // Admin
    const admin = createUser("Super Admin", "admin", "admin123", "admin1234");
    logSucces(`Admin créé — pseudo: admin123 / mdp: admin1234 / ID: ${admin.lastInsertRowid}`);

    // Student
    const userStudent = createUser("Jean Dupont", "student", "jean123", "jean1234");
    const studentUserId = userStudent.lastInsertRowid;
    logSucces(`User student créé — pseudo: jean123 / mdp: jean1234 / ID: ${studentUserId}`);

    createStudent("ETU001", "Dupont", "Jean", 20, "L1", studentUserId);
    logSucces("Étudiant créé — matricule: ETU001");

    // Teacher
    const userTeacher = createUser("Marie Curie", "teacher", "marie123", "marie1234");
    const teacherUserId = userTeacher.lastInsertRowid;
    logSucces(`User teacher créé — pseudo: marie123 / mdp: marie1234 / ID: ${teacherUserId}`);

    const teacher = createTeacher("Curie", "Physique", teacherUserId);
    const teacherId = teacher.lastInsertRowid;
    logSucces(`Enseignant créé — nom: Curie / matière: Physique / ID: ${teacherId}`);

    // Matière liée au prof et à la classe L1 ✅
    createSubject("Physique", "L1", teacherId);
    logSucces("Matière créée — Physique / L1");
};

seedData();
menuPrincipal();