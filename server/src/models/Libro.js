const { Model } = require("./Model");

const table = "libro";
const cols = [
    "nombre",
    "descripcion",
    "fechaPublicacion",
    "imagen",
    "estado",

    "autorID",
    "generoID",
    "ubicacionID",
];

class Libro extends Model {
    constructor() {
        super(table, cols);
    }
}

module.exports = { Libro: new Libro() };