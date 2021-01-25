const { Model } = require("./Model");

const table = "autor";
const cols = [
    "nombre",
    "nacionalidad",
    "biografia",
];

class Autor extends Model {

    constructor() {
        super(table, cols);
        const instance = this.constructor.instance;
        if (instance) {
            return instance;
        }
        this.constructor.instance = this;
    }

    async list(_, res) {
        res.json(await new Autor().listar());
    }

    async create(req, res) {
        const { nombre, nacionalidad, biografia } = req.body;
        res.json(await new Autor().crear([
            nombre, nacionalidad, biografia
        ]));
    }

    async edit(req, res) {
        const { nombre, nacionalidad, biografia } = req.body;
        res.json(await new Autor().editar([
            nombre, nacionalidad, biografia, req.params.id
        ]));
    }

    async delete(req, res) {
        try {
            res.json(await new Autor().eliminar(req.params.id));
        } catch (error) {
            console.error(error);
            res.json(error);
        }
    }
}

module.exports = {
    Autor: new Autor(),
};