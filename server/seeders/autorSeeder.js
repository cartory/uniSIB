const faker = require("faker");

const { DAutor } = require("../src/Dato/DAutor");

const nacionalidades = [
    "Estadunidense",
    "Brasileño",
    "Español",
    "Argentino",
    "Mexicano",
    "Cubano",
    "Boliviano",
    "Chileno",
    "Italiano",
    "Chino",
    "Peruano",
];

const seed = async (number) => {
    while (number-- > 0) {
        await DAutor.crear([
            // nombre
            faker.name.findName(),
            // nacionalidad
            faker.random.arrayElement(nacionalidades),
            // biografia
            faker.lorem.sentence(),
        ]);
    }
}

module.exports = { seed };