const { Dato } = require("./Dato");
const { DLibro } = require("./DLibro");

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

class DPresta extends Dato {
    constructor() {
        super(table2, cols2);
    }
}

class DSolicitud extends Dato {
    constructor() {
        super(table, cols);
    }

    verSolicitudes() {
        const sql = `
            SELECT DISTINCT
                e.id, e.registro, e.nombre as estudiante,
                s.fechaSolicitud, s.estado,
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
        return this.query(sql);
    }
}

module.exports = { 
    DPresta: new DPresta(),
    DSolicitud: new DSolicitud(),
};