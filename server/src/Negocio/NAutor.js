const { DAutor } = require("../Dato/DAutor");

const NAutor = {
    listar(_, res) {
        DAutor.listar(res);
    },

    crear(req, res) {
        const { nombre, nacionalidad, biografia } = req.body;
        DAutor.crear(res, [
            nombre, nacionalidad, biografia
        ]);
    },

    editar(req, res) {
        const { nombre, nacionalidad, biografia } = req.body;
        DAutor.editar(res, [
            nombre, nacionalidad, biografia, req.params.id
        ]);
    },

    eliminar(req, res) {
        DAutor.eliminar(res, req.params.id);
    }
};

module.exports = { NAutor };