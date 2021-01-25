const { Model } = require("./Model");

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
        
        const instance = this.constructor.instance;
        if (instance) return instance;
        this.constructor.instance = instance;
    }

    async listar(_, res) {
        const sql = `
            select
                u.*,
                (select count(*) from ubicacion v where u.id = v.ubicacionID) as ubicaciones,
                (select w.nombre from ubicacion w where w.id = u.ubicacionID) as ubicacion
            from ubicacion u;
        `;

        res.json(await new Ubicacion().query(sql));
    }

    async create(req, res) {
        try {
            const { tipo, nombre, descripcion, ubicacionID = null } = req.body;
            console.log(req.body);
            res.json(await new Ubicacion().crear([
                tipo, nombre, descripcion, ubicacionID
            ]));
        } catch (error) {
            console.error(error);
            res.json(error);
        }
    }

    async edit(req, res) {
        const { tipo, nombre, descripcion, ubicacionID = null } = req.body;
        console.log(req.body);
        res.json(await new Ubicacion().editar([
            tipo, nombre, descripcion, ubicacionID, req.params.id
        ]));
    }

    async delete(req, res) {
        res.json(await new Ubicacion().eliminar(req.params.id));
    }
}

module.exports = { Ubicacion: new Ubicacion() };