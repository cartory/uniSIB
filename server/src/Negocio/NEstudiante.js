const { DEstudiante } = require("../Dato/DEstudiante");

const NEstudiante = {
    async listar(_, res) {
        res.json(await DEstudiante.listar());
    },

    async crear(req, res) {
        const {
            cedula, nombre, registro, correo, sexo
        } = req.body;

        res.json(await DEstudiante.crear([
            cedula, nombre, registro, correo, sexo
        ]));
    },

    async editar(req, res) {
        const {
            cedula, nombre, registro, correo, sexo
        } = req.body;
        
        res.json(await DEstudiante.editar([
            cedula, nombre, registro, correo, sexo, req.params.id
        ]));
    },

    async eliminar(req, res) {
        res.json(await DEstudiante.eliminar(req.params.id));
    }
};

module.exports = { NEstudiante };