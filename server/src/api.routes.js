const { Router } = require("express");
const { NAutor } = require("./Negocio/NAutor");

const router = Router();

//  CONTROLADORES
const { NLibro } = require("./Negocio/NLibro");
const { NGenero } = require("./Negocio/NGenero");
const { NUbicacion } = require("./Negocio/NUbicacion");
const { NSolicitud } = require("./Negocio/NSolicitud");
const { NEstudiante } = require("./Negocio/NEstudiante");


router
    //  LIBRO
    .get("/libros", NLibro.listar)
    .post("/libros", NLibro.crear)
    .put("/libros/:id", NLibro.editar)
    .delete("/libros/:id", NLibro.eliminar)
    //  AUTOR
    .get("/autores", NAutor.listar)
    .post("/autores", NAutor.crear)
    .put("/autores/:id", NAutor.editar)
    .delete("/autores/:id", NAutor.eliminar)
    //  GÉNERO
    .get("/generos", NGenero.listar)
    .post("/generos", NGenero.crear)
    .put("/generos/:id", NGenero.editar)
    .delete("/generos/:id", NGenero.eliminar)
    //  UBICACION
    .get("/ubicaciones", NUbicacion.listar)
    .post("/ubicaciones", NUbicacion.crear)
    .put("/ubicaciones/:id", NUbicacion.editar)
    .delete("/ubicaciones/:id", NUbicacion.eliminar)
    //  SOLICITUD
    .get("/solicitudes", NSolicitud.listar)
    .post("/solicitudes", NSolicitud.crear)
    .put("/solicitudes/:id", NSolicitud.editar)
    //  ESTUDIANTE
    .get("/estudiantes", NSolicitud.listar)
    .post("/estudiantes", NEstudiante.crear)
    .put("/estudiantes/:id", NEstudiante.editar)
    .delete("/estudiantes/:id", NEstudiante.eliminar);

module.exports = router;