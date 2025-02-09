const mysql = require("mysql2/promise");

const mysql_pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root,
    database: "blogs"
})
module.exports = mysql_pool;