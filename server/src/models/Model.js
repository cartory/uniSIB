const { db } = require("../database");

class Model {
    constructor(table, cols) {
        this.cols = cols;
        this.table = table;
    }

    listar(res) {
        const sql = `SELECT * FROM ${this.table}`;
        db.query(sql, (err, rows) => res.json(err ? err : rows));
    }

    crear(res, values) {
        const map = this.cols.map(_ => "?");
        const sql = `INSERT INTO ${this.table} (${this.cols}) VALUES (${map})`;
        db.query(sql, values, (err, rows) => res.json(err ? err : rows));
    }

    editar(res, values) {
        const sql = `UPDATE ${this.table} SET ${this.cols.join(" = ?, ")} = ? WHERE id = ?`;
        db.query(sql, values, (err, rows) => res.json(err ? err : rows));
    }

    eliminar(res, id) {
        const sql = `DELETE FROM ${this.table} WHERE id = ${id}`;
        db.query(sql, (err, rows) => res.json(err ? err : rows));
    }
}

module.exports = { Model }