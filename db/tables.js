import db from "./database.js";
import { aujourdHui, hier, datePrecise } from "../config/date.js";

// TABLE USERS
const tableUsers = `
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        pseudoname TEXT NOT NULL,
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
        classe TEXT NOT NULL,
        user_id INTEGER UNIQUE,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )
`;
db.exec(tableStudents);


// TABLE TEACHERS
const tableTeachers = `
     CREATE TABLE IF NOT EXISTS teachers(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        matiere TEXT,
        user_id INTEGER UNIQUE,
        FOREIGN KEY (user_id) REFERENCES users(id)
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