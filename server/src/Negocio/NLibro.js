const { DLibro } = require("../Dato/DLibro");

const NLibro = {
    async listar(_, res) {
        res.json(await DLibro.listar());
    },

    async crear(req, res) {
        const {
            titulo, sinopsis, fechaPublicacion, cantidad, estado,
            autorID, generoID, ubicacionID
        } = req.body;

        res.json(await DLibro.crear([
            titulo, sinopsis, fechaPublicacion, cantidad, estado,
            autorID, generoID, ubicacionID
        ]));
    },

    async editar(req, res) {
        const {
            titulo, sinopsis, fechaPublicacion, cantidad, estado,
            autorID, generoID, ubicacionID
        } = req.body;

        res.json(await DLibro.editar([
            titulo, sinopsis, fechaPublicacion, cantidad, estado, 
            autorID, generoID, ubicacionID, req.params.id
        ]));
    },

    async eliminar(req, res) {
        res.json(await DLibro.eliminar(req.params.id));
    }
};

module.exports = { NLibro };