import readline from "readline";

// Créer une interface pour écrire dans la console 
// tester si on peut écrire dans la console

const reponse = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const question = (texte) => new Promise((resolve) =>
    reponse.question(texte, resolve)
);

const fermerInterface = () => reponse.close();

export { question, fermerInterface }