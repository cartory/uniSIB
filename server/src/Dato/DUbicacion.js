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

    listar() {
        const sql = `
            select
                u.*,
                (select count(*) from ubicacion v where u.id = v.ubicacionID) as ubicaciones,
                (select w.nombre from ubicacion w where w.id = u.ubicacionID) as ubicacion
            from ubicacion u;
        `;
        return this.query(sql);
    }
}

module.exports = { DUbicacion: new DUbicacion() };