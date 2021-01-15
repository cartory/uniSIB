const { DGenero } = require("../Dato/DGenero");

const NGenero = {
    async listar(_, res) {
        res.json(await DGenero.listar());
    },

    async crear(req, res) {
        const { nombre, descripcion, generoID } = req.body;

        res.json(await DGenero.crear([
            nombre, descripcion, generoID
        ]));
    },

    async editar(req, res) {
        const { nombre, descripcion, generoID = null } = req.body;
        try {
            res.json(await DGenero.editar([
                nombre, descripcion, generoID, req.params.id
            ]));
        } catch (err) {
            console.log(err);
            res.json(err);
        }
    },

    async eliminar(req, res) {
        res.json(await DGenero.eliminar(req.params.id));
    }
};

module.exports = { NGenero }