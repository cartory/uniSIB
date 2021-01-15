const { DAutor } = require("../Dato/DAutor");

const NAutor = {
    async listar(_, res) {
        res.json(await DAutor.listar());
    },

    async crear(req, res) {
        const { nombre, nacionalidad, biografia } = req.body;
        res.json(await DAutor.crear([
            nombre, nacionalidad, biografia
        ]));
    },

    async editar(req, res) {
        const { nombre, nacionalidad, biografia } = req.body;
        res.json(await DAutor.editar([
            nombre, nacionalidad, biografia, req.params.id
        ]));
    },

    async eliminar(req, res) {
        res.json(await DAutor.eliminar(req.params.id));
    }
};

module.exports = { NAutor };