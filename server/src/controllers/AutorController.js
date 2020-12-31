const { Autor } = require("../models/Autor");

const AutorController = {
    listar(_, res) {
        Autor.listar(res);
    },

    crear(req, res) {
        const { nombre, nacionalidad, imagen } = req.body;
        Autor.crear(res, [
            nombre, nacionalidad, imagen
        ]);
    },

    editar(req, res) {
        const { nombre, nacionalidad, imagen } = req.body;
        Autor.editar(res, [
            nombre, nacionalidad, imagen, req.params.id
        ]);
    },

    eliminar(req, res) {
        Autor.eliminar(res, req.params.id);
    }
};

module.exports = { AutorController };