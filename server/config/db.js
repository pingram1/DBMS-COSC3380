const mysql = require('mysql2');
require('dotenv').config();

console.log('Attempting to create database connection pool...');

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: false
    }
}).promise();


// Testing connection (/test)
const testConnection = async () => {
    try {
        console.log('Testing database connection...');
        const [result] = await pool.query('SELECT 1');
        console.log('Database connection successful:', result);
        return true;
    } catch (err) {
        console.error('Database connection failed:', {
            message: err.message,
            code: err.code,
            errno: err.errno,
            port: process.env.MYSQL_PORT
        });
        return false;
    }
};

module.exports = {
    pool,
    testConnection
};