const { db } = require("../database")
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

    listar(res) {
        const sql = `
            select
                u.*,
                (select count(*) from ubicacion v where u.id = v.ubicacionID) as ubicaciones,
                (select w.nombre from ubicacion w where w.id = u.ubicacionID) as ubicacion
            from ubicacion u;
        `;
        db.query(sql, (err, rows) => res.json(err ? err : rows));
    }
}

module.exports = { Ubicacion: new Ubicacion() };