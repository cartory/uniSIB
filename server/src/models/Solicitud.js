const { Model } = require("./Model");
const { db } = require("../database");

const table = "solicitud";
const subTable = "presta";

const cols = [
    "estado",
    "fechaSolicitud",
    "cantidadDias",

    "estudianteID",
];

const subCols = [
    "libroID",
    "solicitudID"
]

class Solicitud extends Model {
    constructor() {
        super(table, cols);
    }

    verSolicitudes(res) {
        const sql = `
            SELECT presta.libroID, presta.solicitudID,
                   p.nombre, p.registro, s.fechaSolicitud, 
                   l.nombre AS nombreLibro, l.imagen AS imagenLibro, s.cantidadDias, s.estado 
            FROM persona AS p, libro AS l, solicitud AS s, presta
            WHERE l.id = presta.libroID and presta.solicitudID = s.id and s.estudianteID = p.id;
        `;
        db.query(sql, (err, rows) => res.json(err ? err : rows));
    }

    crear(res, values, libroID) {
        const map = cols.map(_ => "?");
        const sql = `INSERT INTO ${table} (${cols}) VALUES (${map})`;

        db.query(sql, values, (err, rows) => {
            if (err) return res.json(err);

            const subMap = subCols.map(_ => "?");
            const sql2 = `INSERT INTO ${subTable} (${subCols}) VALUES (${subMap})`;

            db.query(sql2, [
                libroID, rows.insertId
            ], (err, rows) => {
                res.json(err ? err : rows)
            });
        });
    }
}

module.exports = { Solicitud: new Solicitud() };