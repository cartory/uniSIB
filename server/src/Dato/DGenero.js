const { Dato } = require("./Dato");
const { db } = require("../Conexion");

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

    listar(res) {
        const sql = `
            select
                u.*,
                (select count(*) from genero v where u.id = v.generoID) as generos,
                (select w.nombre from genero w where w.id = u.generoID) as generos
            from genero u;
        `;
        db.query(sql, (err, rows) => res.json(err ? err : rows));
    }
}

module.exports = { DGenero: new DGenero() };