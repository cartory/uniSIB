const { Model } = require("./Model");

const table = "estudiante";
const cols = [
    "cedula",
    "nombre",
    "registro",
    "correo",
    "sexo"
];

class Estudiante extends Model {
    constructor() {
        super(table, cols);

        const instance = this.constructor.instance;
        
        if (instance) return instance;
        this.constructor.instance = this;
    }

    async list(_, res) {
        res.json(await new Estudiante().listar());
    }

    async create(req, res) {
        const {
            cedula, nombre, registro, correo, sexo
        } = req.body;

        res.json(await new Estudiante().crear([
            cedula, nombre, registro, correo, sexo
        ]));
    }

    async edit(req, res) {
        const {
            cedula, nombre, registro, correo, sexo
        } = req.body;

        res.json(await new Estudiante().editar([
            cedula, nombre, registro, correo, sexo, req.params.id
        ]));
    }

    async delete(req, res) {
        res.json(await new Estudiante().eliminar(req.params.id));
    }
}

module.exports = { Estudiante: new Estudiante() }