const { db } = require("../Conexion");

class Model {
    constructor(table, cols) {
        this.cols = cols;
        this.table = table;
    }

    listar() {
        const sql = `SELECT * FROM ${this.table}`;
        return new Promise((resolve, reject) => {
            db.query(sql, (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }

    crear(values) {
        const map = this.cols.map(_ => "?");
        const sql = `INSERT INTO ${this.table} (${this.cols}) VALUES (${map})`;
        return new Promise((resolve, reject) => {
            db.query(sql, values, (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            })
        });
    }

    editar(values) {
        const sql = `UPDATE ${this.table} SET ${this.cols.join(" = ?, ")} = ? WHERE id = ?`;
        return new Promise((resolve, reject) => {
            db.query(sql, values, (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            })
        });
    }

    eliminar(id) {
        const sql = `DELETE FROM ${this.table} WHERE id = ${id}`;
        return new Promise((resolve, reject) => {
            db.query(sql, (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }

    query(sql) {
        return new Promise((resolve, reject) => {
            db.query(sql, (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    }
}

module.exports = { Model }