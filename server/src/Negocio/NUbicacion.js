const { DUbicacion } = require("../Dato/DUbicacion");

const NUbicacion = {
    async listar(_, res) {
        res.json(await DUbicacion.listar());
    },

    async crear(req, res) {
        const { tipo, nombre, descripcion, ubicacionID } = req.body;
        
        res.json(await DUbicacion.crear([
            tipo, nombre, descripcion, ubicacionID
        ]));
    },

    async editar(req, res) {
        const {
            tipo, nombre, descripcion, ubicacionID
        } = req.body;

        try {
            res.json(await DUbicacion.editar([
                tipo, nombre, descripcion, ubicacionID, req.params.id

            ]));
        } catch (err) {
            res.json(err);
        }
    },

    async eliminar(req, res) {
        res.json(await DUbicacion.eliminar(req.params.id));
    }
}

module.exports = { NUbicacion };