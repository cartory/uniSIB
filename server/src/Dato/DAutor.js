const { Dato } = require("./Dato");

const table = "autor";
const cols = [
    "nombre",
    "nacionalidad",
    "biografia",
];

class DAutor extends Dato {
    constructor(){
        super(table, cols);
    }
}

module.exports = { DAutor: new DAutor() };