const { DUbicacion } = require("../Dato/DUbicacion");

const NUbicacion = {
    listar(_, res) {
        DUbicacion.listar(res);
    },

    crear(req, res) {
        const { tipo, nombre, descripcion, ubicacionID } = req.body;
        DUbicacion.crear(res, [
            tipo, nombre, descripcion, ubicacionID
        ]);
    },

    editar(req, res) {
        const {
            tipo, nombre, descripcion, ubicacionID
        } = req.body;
        DUbicacion.editar(res, [
            tipo, nombre, descripcion, ubicacionID, req.params.id
        ]);
    },

    eliminar(req, res) {
        DUbicacion.eliminar(res, req.params.id);
    }
}

module.exports = { NUbicacion };