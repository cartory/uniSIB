const cors = require("cors");
const morgan = require("morgan");
const express = require("express");

const router = require("./api.routes");

const App = {
	init() {
		this.app = express();
		this.config();
		this.routes();
		this.start();
	},

	config() {
		this.app.use(cors());
		this.app.use(morgan("dev"));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	},

	routes() {
		this.app.use("/api", router);
		this.app.get("/", (_, res) => {
			res.send(`<h1>Welcome to UNISIB API :)</h1>`);
		});
	},

	start(PORT = process.env.PORT, HOST = process.env.HOST) {
		this.app.listen(PORT, () => {
			console.log(`Server running on \x1b[33mhttp://${HOST}:${PORT}\x1b[0m`);
			console.log(new Date());
		});
	}
}

App.init();