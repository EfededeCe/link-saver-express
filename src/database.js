const mysql = require("mysql2/promise");
const { database } = require("./keys");


const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err){
        if (err.code === "PROTOCOL_CONNECTION_LOST"){
            console.error("DATABASE CONNECTION WAS CLOSED");
        }
        if (err.code === "ER_CON_COUNT_ERROR"){
            console.error("DATABASE HAS TO MANY CONNECTIONS");
        };
        if (err.code === "ECONNREFUSED"){
            console.error("DATABASE CONNECTION WAR REFUSED");
        }
    };

    if (connection){
        connection.release();
        console.log("DB IS CONNECTED");
        return;
    }
});



module.exports = pool
