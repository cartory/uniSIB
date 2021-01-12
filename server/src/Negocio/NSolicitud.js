const { DSolicitud } = require("../Dato/DSolicitud");

const NSolicitud = {
    listar(_, res) {
        Solicitud.verSolicitudes(res);
    },

    crear(req, res) {
        const {
            estado, fechaSolicitud, cantidadDias, libroID, estudianteID,
        } = req.body;

        DSolicitud.crear(res, [
            estado, fechaSolicitud, cantidadDias, estudianteID
        ], libroID);
    },

    editar(req, res) {
        const {
            estado, fechaSolicitud, cantidadDias, libroID, estudianteID
        } = req.body;

        DSolicitud.editar(res, [
            estado, fechaSolicitud, cantidadDias, 
            libroID, estudianteID, req.params.id
        ]);
    }
};

module.exports = { NSolicitud };