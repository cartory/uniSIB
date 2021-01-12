const { DEstudiante } = require("../Dato/DEstudiante");

const NEstudiante = {
    listar(_, res){
        DEstudiante.listar(res)
    },

    crear(req, res) {
        const {
            cedula, nombre, registro, correo, sexo
        } = req.body;

        DEstudiante.crear(res, [
            cedula, nombre, registro, correo, sexo
        ]);
    },

    editar(req, res) {
        const {
            cedula, nombre, registro, correo, sexo
        } = req.body;

        DEstudiante.editar(res, [
            cedula, nombre, registro, correo, sexo, req.params.id
        ]);
    },

    eliminar(req, res) {
        DEstudiante.eliminar(res, req.params.id);
    }
};

module.exports = { NEstudiante };