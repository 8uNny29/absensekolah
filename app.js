// app.js

const express = require('express');
const qr = require('qr-image');
const bodyParser = require('body-parser');
const fs = require('fs');
const mysql = require('mysql'); // Anda perlu menginstal paket mysql dengan npm install mysql

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Konfigurasi database
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'absensekolah'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Koneksi ke database berhasil');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/generateQR', (req, res) => {
  const studentName = req.body.studentName;
  const qr_png = qr.image(studentName, { type: 'png' });
  const qrPath = 'qr_codes/' + studentName + '.png';
  qr_png.pipe(fs.createWriteStream(qrPath));
  res.send('QR Code generated for ' + studentName);
});

app.get('/scan/:studentName', (req, res) => {
  const studentName = req.params.studentName;
  db.query('INSERT INTO absensi (nama_murid) VALUES (?)', [studentName], (err, result) => {
    if (err) throw err;
    console.log('Data absensi tersimpan untuk ' + studentName);
    res.send('Data absensi tersimpan untuk ' + studentName);
  });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});