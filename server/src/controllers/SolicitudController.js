const { Solicitud } = require("../models/Solicitud");

const SolicitudController = {
    listar(_, res) {
        Solicitud.verSolicitudes(res);
    },

    crear(req, res) {
        const {
            estado, fechaSolicitud, cantidadDias, libroID, estudianteID,
        } = req.body;

        Solicitud.crear(res, [
            estado, fechaSolicitud, cantidadDias, estudianteID
        ], libroID);
    },

    editar(req, res) {
        const {
            estado, fechaSolicitud, cantidadDias, libroID, estudianteID
        } = req.body;

        Solicitud.editar(res, [
            estado, fechaSolicitud, cantidadDias, 
            libroID, estudianteID, req.params.id
        ]);
    }
};

module.exports = { SolicitudController };