// Création de la classe Matière

import { deflate } from "node:zlib";

class Subject {
    constructor(nom, teacher_id){
        this.nom = nom;
        this.teacher_id = teacher_id;
    }
}

export default Subject;