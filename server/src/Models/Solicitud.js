const { Model } = require("./Model");
const { Libro } = require("./Libro");

const table = "solicitud";
const table2 = "presta";

const cols = [
    "estado",
    "fechaSolicitud",
    "cantidadDias",

    "estudianteID",
];

const cols2 = [
    "libroID",
    "solicitudID"
]

class Presta extends Model {
    constructor() {
        super(table2, cols2);
    }
}

const presta = new Presta();

class Solicitud extends Model {
    constructor() {
        super(table, cols);
    }

    async verSolicitudes(_, res) {
        try {
            const sql = `
                SELECT DISTINCT
                    e.id, e.registro, e.nombre as estudiante, e.id as estudianteID,
                    s.*,
                    (
                        SELECT count(*)
                        FROM    libro, solicitud, presta, estudiante
                        WHERE   libro.id = presta.libroID 
                        AND     presta.solicitudID = solicitud.id
                        AND     solicitud.estudianteID = estudiante.id
                        AND     estudiante.id =  e.id
                    ) as libros
                FROM estudiante e, solicitud s, libro l, presta p
                WHERE   l.id = p.libroID    and     p.solicitudID = s.id    
                AND     s.estudianteID = e.id
            `;

            const rows = await new Solicitud().query(sql);

            for (let index = 0; index < rows.length; index++) {
                const row = rows[index];
                let libros = await Libro.listarPorEstudiante(row.estudianteID);
                row["librosID"] = libros.map(libro => libro.id);
                rows[index] = row;
            }
            return res.json(rows);
        } catch (error) {
            console.log(error);
            res.json(error)
        }
    }

    async cambiarEstado(req, res) {
        const { id, estado } = req.body;
        const sql = `UPDATE ${table} SET estado = '${estado}' WHERE id = ${id}`;
        res.json(await new Solicitud().query(sql));
    }

    async create(req, res) {
        const {
            estado = "pendiente", fechaSolicitud = new Date(),
            cantidadDias, librosID, estudianteID,
        } = req.body;

        try {
            const row = await new Solicitud().crear([
                estado, fechaSolicitud, cantidadDias, estudianteID
            ]);

            librosID.forEach(async libroID => {
                await Libro.actualizarCantidad(libroID);
                await presta.crear([
                    libroID, row.insertId
                ]);
            });
            res.json(row);
        } catch (err) {
            console.error(err);
            res.json(err);
        }
    }

    async edit(req, res) {
        const {
            estado, fechaSolicitud, cantidadDias, libroID, estudianteID
        } = req.body;

        res.json(await new Solicitud().editar([
            estado, fechaSolicitud, cantidadDias,
            libroID, estudianteID, req.params.id
        ]));
    }
}

module.exports = {
    Solicitud: new Solicitud(),
};