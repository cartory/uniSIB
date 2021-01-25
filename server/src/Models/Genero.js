const { Model } = require("./Model");

const table = "genero";
const cols = [
    "nombre",
    "descripcion",
    "generoID"
];

class Genero extends Model {
    constructor() {
        super(table, cols);
        const instance = this.constructor.instance;

        if (instance) return instance;
        this.constructor.instance = this;
    }

    async list(_, res) {
        const sql = `
            select
                u.*,
                (select count(*) from genero v where u.id = v.generoID) as generos,
                (select w.nombre from genero w where w.id = u.generoID) as genero
            from genero u;
        `;
        res.json(await new Genero().query(sql));
    }

    async create(req, res) {
        const { nombre, descripcion, generoID } = req.body;

        res.json(await new Genero().crear([
            nombre, descripcion, generoID
        ]));
    }

    async edit(req, res) {
        const { nombre, descripcion, generoID = null } = req.body;

        res.json(await new Genero().editar([
            nombre, descripcion, generoID, req.params.id
        ]));
    }

    async delete(req, res) {
        res.json(await new Genero().eliminar(req.params.id));
    }
}

module.exports = { Genero: new Genero() };