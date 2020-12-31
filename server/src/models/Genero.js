const { Model } = require("./Model");

const table = "genero";
const cols = [
    "nombre",
    "descripcion"
];

class Genero extends Model {
    constructor() {
        super(table, cols);
    }
}

module.exports = { Genero: new Genero() };