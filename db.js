// db.js
require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: mysql.railway.internal,
  user: root,
  password: dUQoxlFNDfrDapxSbRphCdyYcmfkxyCC,
  database: railway,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    process.exit(1); // Exit if connection fails
  }
  console.log('Connected to MySQL database');
});

module.exports = db;
