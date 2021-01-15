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

    listar() {
        const sql = `
            select
                u.*,
                (select count(*) from genero v where u.id = v.generoID) as generos,
                (select w.nombre from genero w where w.id = u.generoID) as genero
            from genero u;
        `;
        return this.query(sql);
    }
}

module.exports = { DGenero: new DGenero() };