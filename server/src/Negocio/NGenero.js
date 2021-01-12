const { DGenero } = require("../Dato/DGenero");

const NGenero = {
    listar(_, res) {
        DGenero.listar(res);
    },

    crear(req, res) {
        const { nombre, descripcion, generoID } = req.body;
        DGenero.crear(res, [
            nombre, descripcion, generoID
        ]);
    },

    editar(req, res) {
        const { nombre, descripcion, generoID} = req.body;
        DGenero.editar(res, [
            nombre, descripcion, generoID, req.params.id
        ]);
    },

    eliminar(req, res) {
        DGenero.eliminar(res, req.params.id);
    }
};

module.exports = { NGenero }