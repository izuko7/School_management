import db from "./database.js";
import { aujourdHui, hier, datePrecise } from "../config/date.js";

// TABLE USERS

const tableUsers = `
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        motdepasse TEXT NOT NULL
    )
`;
db.exec(tableUsers);


// TABLE STUDENTS

const tableStudents = `
    CREATE TABLE IF NOT EXISTS students(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        matricule TEXT UNIQUE NOT NULL,
        nom TEXT NOT NULL,
        prenom TEXT NOT NULL,
        age INTEGER NOT NULL,
        classe TEXT NOT NULL
    )
`;
db.exec(tableStudents);


// TABLE TEACHERS

const tableTeachers = `
     CREATE TABLE IF NOT EXISTS teachers(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        matiere TEXT NOT NULL
    )
`;
db.exec(tableTeachers);


// TABLE SUBJECTS


const tableSubjects = `
    CREATE TABLE IF NOT EXISTS subjects(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT UNIQUE NOT NULL,
        teacher_id INTEGER,
        FOREIGN KEY (teacher_id) REFERENCES teachers(id)
    )
`;
db.exec(tableSubjects);


// TABLE GRADES

const tableGrades = `
    CREATE TABLE IF NOT EXISTS grades(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER NOT NULL,
        subject_id INTEGER NOT NULL,
        note REAL NOT NULL,
        FOREIGN KEY (student_id) REFERENCES students(id),
        FOREIGN KEY (subject_id) REFERENCES subjects(id)
    )
`;
db.exec(tableGrades);


// TABLE ABSENCES

const tableAbsences = `
     CREATE TABLE IF NOT EXISTS absences(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER NOT NULL,
        date TEXT NOT NULL,
        status TEXT NOT NULL,
        FOREIGN KEY (student_id) REFERENCES students(id)
    )
`;
db.exec(tableAbsences);



// ==========================================
// PREPARE : PREPARATION DES REQUTTES
// ==========================================

const insertUser = db.prepare(`
        INSERT INTO users (name, role, motdepasse) 
        VALUES (?, ?, ?)` 
);

const insertTeacher = db.prepare(`
        INSERT INTO teachers (nom, matiere) 
        VALUES (?, ?)`
);

const insertStudent = db.prepare(`
    INSERT INTO students (matricule, nom, prenom, age, classe) 
    VALUES (?, ?, ?, ?, ?)`
);

const insertSubject = db.prepare(`
    INSERT INTO subjects (nom, teacher_id) 
    VALUES (?, ?)`
);


const insertGrade = db.prepare(`
    INSERT INTO grades (student_id, subject_id, note) 
    VALUES (?, ?, ?)`
);


const insertAbsence = db.prepare(`
    INSERT INTO absences (student_id, date, status) 
    VALUES (?, ?, ?)`
);


// ==========================================
// RUN : INSERTIONS DANS LA DB
// ==========================================


// 1. TABLE USERS (Correction : ajout du motdepasse obligatoire)
    
    insertUser.run('Alice Martin', 'admin', 'password123');
    insertUser.run('Jean Dupont', 'professeur', 'profSecure!');
    insertUser.run('Lucie Bernard', 'scolarite', 'scol2026');

    // 2. TABLE TEACHERS
   
    insertTeacher.run('M. Durand', 'Mathématiques'); // Génère l'ID 1
    insertTeacher.run('Mme. Robert', 'Histoire');     // Génère l'ID 2

    // 3. TABLE STUDENTS
    
    insertStudent.run('MAT26_01', 'Petit', 'Thomas', 15, '2nde A'); // Génère l'ID 1
    insertStudent.run('MAT26_02', 'Moreau', 'Chloé', 16, '1ère S'); // Génère l'ID 2

    // 4. TABLE SUBJECTS (Liaison avec teacher_id)
    
    insertSubject.run('Mathématiques', 1); // ID 1 (M. Durand)
    insertSubject.run('Histoire', 2);      // ID 2 (Mme. Robert)

    // 5. TABLE GRADES (Liaison avec student_id et subject_id)
   
    insertGrade.run(1, 1, 14.5); // Thomas en Math -> 14.5
    insertGrade.run(2, 1, 18.0); // Chloé en Math -> 18.0
    insertGrade.run(1, 2, 12.0); // Thomas en Histoire -> 12.0

    // 6. TABLE ABSENCES (Liaison avec student_id)
   
    insertAbsence.run(1, aujourdHui, 'Justifiée');
    insertAbsence.run(1, hier, 'Non justifiée');

console.log("✅ Toutes les données de test ont été insérées avec succès !");


