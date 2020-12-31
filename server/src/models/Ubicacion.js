const { Model } = require("../models/Model");

const table = "ubicacion";
const cols = [
    "tipo",
    "nombre",
    "descripcion",
    "ubicacionID"
];

class Ubicacion extends Model {
    constructor() {
        super(table, cols);
    }
}

module.exports = { Ubicacion: new Ubicacion() };