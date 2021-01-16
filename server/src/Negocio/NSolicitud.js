const { DSolicitud, DPresta } = require("../Dato/DSolicitud");
const { DLibro } = require("../Dato/DLibro");

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
                await DLibro.actualizarCantidad(libroID);
                await DPresta.crear([
                    libroID, row.insertId
                ]);
            });
            res.json(row);
        } catch (err) {
            console.error(err);
            res.json(err);
        }
    },

    async editar(req, res) {
        const {
            estado, fechaSolicitud, cantidadDias, libroID, estudianteID
        } = req.body;

        res.json(await DSolicitud.editar([
            estado, fechaSolicitud, cantidadDias,
            libroID, estudianteID, req.params.id
        ]));  
    },

    async cambiarEstado(req, res) {
        const { id, estado } = req.body;
        console.log(req.body);
        res.json(await DSolicitud.cambiarEstado(estado, id));
    }
};

module.exports = { NSolicitud };