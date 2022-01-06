const autor = require("./autorSeeder")
const genero = require("./generoSeeder")
const estudiante = require("./estudianteSeeder")

const seed = async () => {
	await autor.seed(10)
	await genero.seed()
	await estudiante.seed(10)
}

seed()
	.then(() => {
		console.log(`\x1b[32mDB DATABASE SEEDED!!\x1b[0m`)
	})
	.catch((e) => console.error(e))
    .finally(() => process.exit(0))
