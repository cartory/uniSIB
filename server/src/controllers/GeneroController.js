const { Genero } = require("../models/Genero");

const GeneroController = {
    listar(_, res) {
        Genero.listar(res);
    },

    crear(req, res) {
        const { nombre, descripcion } = req.body;
        Genero.crear(res, [
            nombre, descripcion
        ]);
    },

    editar(req, res) {
        const { nombre, descripcion } = req.body;
        Genero.editar(res, [
            nombre, descripcion, req.params.id
        ]);
    },

    eliminar(req, res) {
        Genero.eliminar(res, req.params.id);
    }
};

module.exports = { GeneroController }