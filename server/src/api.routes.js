const { Router } = require("express");

const router = Router();

//  MODELS
const { Libro } = require("./Models/Libro");
const { Autor } = require("./Models/Autor");
const { Genero } = require("./Models/Genero");
const { Solicitud } = require("./Models/Solicitud");
const { Ubicacion } = require("./Models/Ubicacion");
const { Estudiante } = require("./Models/Estudiante");

router
    //  LIBRO
    .get("/libros", Libro.list)
    .post("/libros", Libro.create)
    .put("/libros/:id", Libro.edit)
    .delete("/libros/:id", Libro.delete)
    //  AUTOR
    .get("/autores", Autor.list)
    .post("/autores", Autor.create)
    .put("/autores/:id", Autor.edit)
    .delete("/autores/:id", Autor.delete)
    //  GÉNERO
    .get("/generos", Genero.list)
    .post("/generos", Genero.create)
    .put("/generos/:id", Genero.edit)
    .delete("/generos/:id", Genero.delete)
    //  UBICACION
    .get("/ubicaciones", Ubicacion.listar)
    .post("/ubicaciones", Ubicacion.create)
    .put("/ubicaciones/:id", Ubicacion.edit)
    .delete("/ubicaciones/:id", Ubicacion.delete)
    //  SOLICITUD
    .get("/solicitudes", Solicitud.verSolicitudes)
    .post("/solicitudes", Solicitud.create)
    .put("/solicitudes/:id", Solicitud.edit)
    .post("/solicitudes/estado", Solicitud.cambiarEstado)
    //  ESTUDIANTE
    .get("/estudiantes", Estudiante.list)
    .post("/estudiantes", Estudiante.create)
    .put("/estudiantes/:id", Estudiante.edit)
    .delete("/estudiantes/:id", Estudiante.delete);

module.exports = router;