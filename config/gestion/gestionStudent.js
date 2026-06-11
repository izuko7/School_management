import { question } from "../interface.js";
import { createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent } from "../../services/studentService.js";

const gestionStudents = async () => {
    let actif = true;
    while(actif){
         console.log("\n〚=== GESTION DES ETUDIANTS ===〛");
        console.log("1. Voir tous les utilisateurs");
        console.log("2. Ajouter un utilisateur");
        console.log("3. Supprimer un utilisateur");
        console.log("0. Retour");
    }
}