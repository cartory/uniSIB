const { DSolicitud, DPresta } = require("../Dato/DSolicitud");

const NSolicitud = {
    async listar(_, res) {
        res.json(await DSolicitud.verSolicitudes());
    },

    async crear(req, res) {
        const {
            estado = "pendiente", fechaSolicitud = new Date(), 
            cantidadDias, librosID, estudianteID,
        } = req.body;

        try {
            const row = await DSolicitud.crear([
                estado, fechaSolicitud, cantidadDias, estudianteID
            ]);

            librosID.forEach(async libroID => {
                await DPresta.crear([
                    libroID, row.insertID
                ]);
            });
            res.json(row);
        } catch (err) {
            console.error(err);
            res.json(err);
        }
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