const { DLibro } = require("../Dato/DLibro");

const NLibro = {
    listar(_, res) {
        DLibro.listar(res);
    },

    crear(req, res) {
        const {
            titulo, sinopsis, fechaPublicacion, cantidad, estado,
            autorID, generoID, ubicacionID
        } = req.body;

        DLibro.crear(res, [
            titulo, sinopsis, fechaPublicacion, cantidad, estado,
            autorID, generoID, ubicacionID
        ]);
    },

    editar(req, res) {
        const {
            titulo, sinopsis, fechaPublicacion, cantidad, estado,
            autorID, generoID, ubicacionID
        } = req.body;

        DLibro.editar(res, [
            titulo, sinopsis, fechaPublicacion, cantidad, estado, 
            autorID, generoID, ubicacionID, req.params.id
        ]);
    },

    eliminar(req, res) {
        DLibro.eliminar(res, req.params.id);
    }
};

module.exports = { NLibro };