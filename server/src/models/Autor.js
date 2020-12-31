const { Model } = require("./Model");

const table = "autor";
const cols = [
    "nombre",
    "nacionalidad",
    "imagen",
];

class Autor extends Model {
    constructor(){
        super(table, cols);
    }
}

module.exports = { Autor: new Autor() };