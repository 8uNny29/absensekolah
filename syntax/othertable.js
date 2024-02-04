const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Set up SQL database
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

// Create tables
db.run('CREATE TABLE table1 (field1 TEXT, field2 TEXT)', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Created table 1.');
});

db.run('CREATE TABLE table2 (field1 TEXT, field2 TEXT)', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Created table 2.');
});

db.run('CREATE TABLE table3 (field1 TEXT, field2 TEXT)', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Created table 3.');
});

// Handle form submission
app.post('/submit', (req, res) => {
  const table = req.body.table;
  const field1 = req.body.field1;
  const field2 = req.body.field2;

  // Insert data into appropriate table
  db.run(`INSERT INTO ${table} (field1, field2) VALUES (?, ?)`, [field1, field2], function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Inserted into ${table} with rowid ${this.lastID}.`);
    res.send(`Data inserted into ${table} with rowid ${this.lastID}.`);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});