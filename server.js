// server.js
const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get("/",(req,res)=>{
    res.render("index.ejs");
})

// Add new school
app.post('/addSchools', (req, res) => {
  const { name, address, latitude, longitude } = req.body;
  const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, address, latitude, longitude], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    // res.status(201).json({ id: result.insertId, name, address, latitude, longitude });
    res.send("succesfully created")
  });
});


app.get("/addSchools",(req,res)=>{
    res.render("new.ejs");
})
// Get schools sorted by proximity


app.get('/listSchools', (req, res) => {
  const { latitude, longitude } = req.query; // ✅ correct
  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'latitude and longitude query parameters are required' });
  }

  const sql = `
    SELECT *, 
    (6371 * acos(
      cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) +
      sin(radians(?)) * sin(radians(latitude))
    )) AS distance 
    FROM schools
    ORDER BY distance ASC
  `;

  db.query(sql, [latitude, longitude, latitude], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.render("list", { schools: results });
  });

});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
