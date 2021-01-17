const { generos } = require("./generos.const");
const { DGenero } = require("../src/Dato/DGenero");

const seedGeneros = async (genero = [], generoID = null) => {
    if (genero.length < 3) {
        genero.push(generoID);
        await DGenero.crear(genero);
    } else {
        const children = genero.pop();
        genero.push(generoID);
        const row = await DGenero.crear(genero);
        children.forEach(async child => {
            await seedGeneros(child, row.insertId);
        });
    }
}

module.exports = {
    seed: async () => {
        generos.forEach(async genero => await seedGeneros(genero));
    }
}