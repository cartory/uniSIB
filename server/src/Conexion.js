const mysql2 = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error(`Server running on \x1b[31m${err}\x1b[0m`);
    }else {
        console.log(`Server running on \x1b[32mDATABASE CONNECTED :)\x1b[0m`);
    }
});

module.exports = { db };