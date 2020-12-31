const { Router } = require("express");

const router = Router();

//  CONTROLADORES
const { AutorController } = require("./controllers/AutorController");
const { LibroController } = require("./controllers/LibroController");
const { GeneroController } = require("./controllers/GeneroController");
const { PersonaController } = require("./controllers/PersonaController");
const { UbicacionController } = require("./controllers/UbicacionController");
const { SolicitudController } = require("./controllers/SolicitudController");

router
    //  LIBRO
    .get("/libros", LibroController.listar)
    .post("/libros", LibroController.crear)
    .put("/libros/:id", LibroController.editar)
    .delete("/libros/:id", LibroController.eliminar)
    //  AUTOR
    .get("/autores", AutorController.listar)
    .post("/autores", AutorController.crear)
    .put("/autores/:id", AutorController.editar)
    .delete("/autores/:id", AutorController.eliminar)
    //  GÉNERO
    .get("/generos", GeneroController.listar)
    .post("/generos", GeneroController.crear)
    .put("/generos/:id", GeneroController.editar)
    .delete("/generos/:id", GeneroController.eliminar)
    //  UBICACION
    .get("/ubicaciones", UbicacionController.listar)
    .post("/ubicaciones", UbicacionController.crear)
    .put("/ubicaciones/:id", UbicacionController.editar)
    .delete("/ubicaciones/:id", UbicacionController.eliminar)
    //  SOLICITUD
    .post("/solicitudes", SolicitudController.crear)
    .put("/solicitudes/:id", SolicitudController.editar)
    //  PERSONA
    .post("/personas/", PersonaController.crear)
    .post("/personas/login", PersonaController.login);

module.exports = router;