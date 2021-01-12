const { Dato } = require("./Dato");

const table = "persona";
const cols = [
    "cedula",
    "nombre",
    "correo",
    "registro",
    "contrasenia"
];

class DEstudiante extends Dato {
    constructor() {
        super(table, cols);
    }
}

module.exports = { DEstudiante: new DEstudiante() }