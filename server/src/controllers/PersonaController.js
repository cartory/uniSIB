const { Persona } = require("../models/Persona");

const PersonaController = {
    async crear(req, res) {
        const { cedula, nombre, correo, registro, contrasenia } = req.body;
        await Persona.crear(res, [
            cedula, nombre, correo, registro
        ], contrasenia);
    },

    login(req, res) {
        const { correo, registro, contrasenia } = req.body;
        if (correo) {
            Persona.login(res, "correo", correo, contrasenia);
        } else if (registro) {
            Persona.login(res, "registro", registro, contrasenia);
        } else {
            res.json({ auth: false, message: "invalid auth" });
        }
    }
};

module.exports = { PersonaController };