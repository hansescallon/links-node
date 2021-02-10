const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');
const pool = mysql.createPool(database);
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.err('conexion con base de datos cerrada');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.err('base de datos tiene muchas conexiones');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('conexion de base de datos fue rechazada');
        }
    }
    if (connection) {
        connection.release();
        console.log('DB esta conectada');
    }
    console.log('la conexion es: ' + connection + ' el error es:' + err);
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;