import { aujourdHui, hier, datePrecise } from "./config/date.js"; 
import { createUser, getAllUsers, deleteUser } from "./services/userService.js";
import { createTeacher, getAllTeachers, getTeacherById, updateTeacher, deleteTeacher } from "./services/teacherService.js";
import { createSubject, getAllSubjects, getSubjectById, updateSubject, deleteSubject } from "./services/subjectService.js";
import { createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent } from "./services/studentService.js";
import { createGrade, getAllGrades, getGradeById, updateGrade, deleteGrade } from "./services/gradeService.js";
import { createAbsence, getAllAbsences, getAbsenceById, updateAbsence, deleteAbsence } from "./services/absenceService.js";

async function runTests() {
    console.log("🚀 Démarrage des tests applicatifs...\n");

    try {
        // ==========================================
        // 1. TEST DES UTILISATEURS
        // ==========================================
        console.log("--- [Test Users] ---");
        createUser("Alice Admin", "admin", "leMotdepasseestla");
        createUser("Bob Prof", "professeur", "tuBob@124");
        console.log("Utilisateurs en DB :", getAllUsers());

        // ==========================================
        // 2. TEST DES ENSEIGNANTS
        // ==========================================
        console.log("\n--- [Test Teachers] ---");
        const resTeacher = createTeacher("M. Durand", "Mathématiques");
        const teacherId = resTeacher.lastInsertRowid; // Récupère l'ID généré automatiquement
        console.log(`Enseignant créé avec l'ID: ${teacherId}`);
        
        // Test Update Enseignant
        updateTeacher(teacherId, { nom: "M. Durand Jean", matiere: "Mathématiques Avancées" });
        console.log("Enseignant mis à jour :", getTeacherById(teacherId));

        // ==========================================
        // 3. TEST DES MATIÈRES
        // ==========================================
        console.log("\n--- [Test Subjects] ---");
        const resSubject = createSubject("Algèbre", teacherId); // Lié au professeur créé au-dessus
        const subjectId = resSubject.lastInsertRowid;
        console.log("Toutes les matières :", getAllSubjects());

        // ==========================================
        // 4. TEST DES ÉTUDIANTS
        // ==========================================
        console.log("\n--- [Test Students] ---");
        const resStudent = createStudent("MAT26_03", "Dupont", "Lucas", 16, "1ère S");
        const studentId = resStudent.lastInsertRowid;
        console.log("Profil de l'étudiant injecté :", getStudentById(studentId));

        // ==========================================
        // 5. TEST DES NOTES
        // ==========================================
        console.log("\n--- [Test Grades] ---");
        const resGrade = createGrade(studentId, subjectId, 15.5);
        const gradeId = resGrade.lastInsertRowid;
        console.log("Toutes les notes :", getAllGrades());

        // Modification de la note
        updateGrade(gradeId, { note: 17.0 });
        console.log("Note après modification :", getGradeById(gradeId));

        // ==========================================
        // 6. TEST DES ABSENCES (Avec tes variables Day.js)
        // ==========================================
        console.log("\n--- [Test Absences] ---");
        // Utilisation des variables sans guillemets pour envoyer la valeur
        createAbsence(studentId, aujourdHui, "Non justifiée");
        createAbsence(studentId, hier, "Justifiée");
        
        const resAbsenceSpecifique = createAbsence(studentId, datePrecise, "En attente");
        const absenceId = resAbsenceSpecifique.lastInsertRowid;
        
        console.log("Toutes les absences stockées :", getAllAbsences());

        // ==========================================
        // 7. TEST DES SUPPRESSIONS
        // ==========================================
        console.log("\n--- [Test Suppressions] ---");
        deleteAbsence(absenceId);
        console.log(`Absence ID ${absenceId} supprimée.`);
        
        // On vérifie que la liste a diminué
        console.log("Absences restantes :", getAllAbsences().length);

        console.log("\n✅ Tous les tests de comportement se sont déroulés sans accroc !");

    } catch (error) {
        console.error("\n❌ Échec d'un des tests :", error.message);
    }
}

// Lancement du scénario
runTests();