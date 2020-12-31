const { Libro } = require("../models/Libro");

const LibroController = {
    listar(_, res) {
        Libro.listar(res);
    },

    crear(req, res) {
        const {
            nombre, descripcion, fechaPublicacion, imagen, estado,
            autorID, generoID, ubicacionID
        } = req.body;

        Libro.crear(res, [
            nombre, descripcion, fechaPublicacion, imagen, estado,
            autorID, generoID, ubicacionID
        ]);
    },

    editar(req, res) {
        const {
            nombre, descripcion, fechaPublicacion, imagen, estado,
            autorID, generoID, ubicacionID
        } = req.body;

        Libro.editar(res, [
            nombre, descripcion, fechaPublicacion, imagen, estado, 
            autorID, generoID, ubicacionID, req.params.id
        ]);
    },

    eliminar(req, res) {
        Libro.eliminar(res, req.params.id);
    }
};

module.exports = { LibroController };