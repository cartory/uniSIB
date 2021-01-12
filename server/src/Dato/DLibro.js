const { Dato } = require("./Dato");

const table = "libro";
const cols = [
    "titulo",
    "sinopsis",
    "fechaPublicacion",
    "cantidad",
    "estado",

    "autorID",
    "generoID",
    "ubicacionID",
];

class DLibro extends Dato {
    constructor() {
        super(table, cols);
    }
}

module.exports = { DLibro: new DLibro() };