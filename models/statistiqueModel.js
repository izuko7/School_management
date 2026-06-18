// Création de la classe stats

class Statistique {
    constructor(student_id, nom, prenom, moyenne, nb_absences, taux_presence){
        this.student_id = student_id;
        this.nom = nom;
        this.prenom = prenom;
        this.moyenne = moyenne;
        this.nb_absences =nb_absences;
        this.taux_presence = taux_presence;
    }
}

export default Statistique;