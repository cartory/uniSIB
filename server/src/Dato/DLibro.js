const { Dato } = require("./Dato");

const table = "libro";
const cols = [
    "titulo",
    "sinopsis",
    "fechaPublicacion",
    "cantidad",
    "estado",

    "autorID",
    "generoID",
    "ubicacionID",
];

class DLibro extends Dato {
    constructor() {
        super(table, cols);
    }

    listar() {
        const sql = `
            select u.*, v.nombre as autor, w.nombre as genero, t.nombre as ubi 
            from libro u 
            join autor v on u.autorID = v.id 
            join genero w on u.generoID = w.id 
            join ubicacion t on u.ubicacionID = t.id
        `;
        return this.query(sql);
    }

    async listarPorEstudiante(estudianteID) {
        const sql = `
            SELECT u.*, v.nombre as autor, w.nombre as genero, t.nombre as ubi 
            FROM libro u, autor v, genero w, ubicacion t, presta, solicitud s, estudiante e
            WHERE v.id = u.autorID 
            AND w.id = u.generoID 
            AND t.id = u.ubicacionID
            AND u.id = presta.libroID
            AND presta.solicitudID = s.id
            AND s.estudianteID = e.id
            AND e.id = ${estudianteID}
        `;
        return await this.query(sql);
    }
}

module.exports = { DLibro: new DLibro() };