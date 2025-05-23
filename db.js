require('dotenv').config();
const mysql = require('mysql2');

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.PORT || 3306,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
//   connectTimeout: 20000, // Increase timeout
//   debug: true // Enable debugging
// });

const pool = mysql.createPool(process.env.MYSQL_URL);


pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    process.exit(1);
  }
  console.log('Connected to MySQL database');
  connection.release(); // Release connection after checking
});

module.exports = pool;
