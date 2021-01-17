const faker = require("faker");
const { DEstudiante } = require("../src/Dato/DEstudiante");

// const cols = [
//     "cedula",
//     "nombre",
//     "registro",
//     "correo",
//     "sexo"
// ];

const seed = async number => {
    while (number-- > 0) {
        await DEstudiante.crear([
            // cedula
            faker.random.number({
                min: 1000000,
                maz: 9999999
            }),
            // nombre
            faker.name.findName(),
            // registro
            faker.random.number({
                min: 100000000,
                max: 999999999
            }),
            // correo
            faker.internet.email(),
            // sexo
            faker.random.arrayElement([true, false])
        ]);
    }
}

module.exports = { seed };