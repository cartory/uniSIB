const { Ubicacion } = require("../models/Ubicacion");

const UbicacionController = {
    listar(_, res) {
        Ubicacion.listar(res);
    },

    crear(req, res) {
        const { tipo, nombre, descripcion, ubicacionID } = req.body;
        Ubicacion.crear(res, [
            tipo, nombre, descripcion, ubicacionID
        ]);
    },

    editar(req, res) {
        const {
            tipo, nombre, descripcion, ubicacionID
        } = req.body;
        Ubicacion.editar(res, [
            tipo, nombre, descripcion, ubicacionID, req.params.id
        ]);
    },

    eliminar(req, res) {
        Ubicacion.eliminar(res, req.params.id);
    }
}

module.exports = { UbicacionController };