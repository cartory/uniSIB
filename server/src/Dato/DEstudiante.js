const { Dato } = require("./Dato");

const table = "estudiante";
const cols = [
    "cedula",
    "nombre",
    "registro",
    "correo",
    "sexo"
];

class DEstudiante extends Dato {
    constructor() {
        super(table, cols);
    }
}

module.exports = { DEstudiante: new DEstudiante() }