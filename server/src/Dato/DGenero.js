const { Dato } = require("./Dato");

const table = "genero";
const cols = [
    "nombre",
    "descripcion",
    "generoID"
];

class DGenero extends Dato {
    constructor() {
        super(table, cols);
    }
}

module.exports = { DGenero: new DGenero() };