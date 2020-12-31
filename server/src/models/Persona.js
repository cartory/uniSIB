const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { Model } = require("./Model");
const { db } = require("../database");

const table = "persona";
const cols = [
    "cedula",
    "nombre",
    "correo",
    "registro",
    "contrasenia"
];

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: 3600 });
}

const validatePassword = (contrasenia, pwd) => {
    return bcrypt.compare(contrasenia, pwd);
}

class Persona extends Model {
    constructor() {
        super(table, cols);
    }

    async crear(res, values, contrasenia) {
        contrasenia = await bcrypt.hash(contrasenia, 10);
        values.push(contrasenia);
        const map = cols.map(_ => "?");
        const sql = `INSERT INTO ${table} (${cols}) VALUES (${map})`;
        db.query(sql, values, (err, rows) => {
            if (err) return res.json({ auth: false, err, rows });
            values.pop();
            res.json({
                auth: true,
                token: generateToken(rows.insertId),
                values
            });
        });
    }

    login(res, col, value, contrasenia) {
        const sql = `SELECT * FROM ${table} WHERE ${col} = ${value} LIMIT 1`;
        db.query(sql, (err, rows) => {
            if (err) return res.json({ auth: false, err });

            if (rows.length < 1) {
                return res.json({ auth: false, message: "not found" });
            }
            
            if (!validatePassword(contrasenia, rows[0].contrasenia)) {
                return res.json({ auth: false, message: "not valid pwd" });
            }

            delete rows[0].contrasenia;

            res.json({
                auth: true,
                token: generateToken(rows[0].id),
                data: rows[0]
            })
        });
    }
}

module.exports = { Persona: new Persona() }