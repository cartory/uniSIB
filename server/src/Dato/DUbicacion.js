const { db } = require("../Conexion")
const { Dato } = require("./Dato");

const table = "ubicacion";
const cols = [
    "tipo",
    "nombre",
    "descripcion",
    "ubicacionID"
];

class DUbicacion extends Dato {
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

module.exports = { DUbicacion: new DUbicacion() };