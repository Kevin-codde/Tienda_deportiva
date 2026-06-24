const db = require("mysql2/promise");

const pool = db.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "Tienda_deportiva",
});

module.exports = pool;