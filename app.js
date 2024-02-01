// app.js

const express = require('express');
const qr = require('qr-image');
const bodyParser = require('body-parser');
const fs = require('fs');
const mysql = require('mysql'); // Anda perlu menginstal paket mysql dengan npm install mysql
const { get } = require('http');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '')));

// Function for get some value from other process
let formData;

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

app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'style.css'));
});

function generatekodeVerif() {
  return Math.floor(100000 + Math.random() * 900000);
}

app.post('/', (req, res, next) => {
  formData = req.body;
  const studentName = req.body.studentName;
  const kodeVerif = generatekodeVerif();
  const qr_png = qr.image(kodeVerif, { type: 'png' });
  const qrPath = 'qr_codes/' + studentName + '.png';
  qr_png.pipe(fs.createWriteStream(qrPath));
  console.log(studentName + ' Telah membuat QR Code');
  console.log(kodeVerif);
//  db.query('INSERT INTO absensi (kodeverifikasi) VALUES (?)', [formData.kodeVerif], (err, result) => {
//    if (err) throw err;
//    console.log(formData.kodeVerif `telah terkirim`);
//  })
});

app.post('/sudahabsen', (req, res, next) => {
  const kodeVerif = req.body.kodeVerif;
  db.query('INSERT INTO absensi (nama_murid) VALUES (?)', [formData.studentName], (err, result) => {
    if (err) throw err;
    console.log(`${formData.studentName} telah memasukkan kode: ${kodeVerif}`);
    res.send(`Data absensi mu telah tersimpan, menggunakan kode: ${kodeVerif}`);
  });
});

//app.get('/scan/:studentName', (req, res) => {
//  const studentName = req.params.studentName;
//  db.query('INSERT INTO absensi (nama_murid) VALUES (?)', [studentName], (err, result) => {
//    if (err) throw err;
//    console.log('Data absensi tersimpan untuk ' + studentName);
//    res.send('Data absensi tersimpan untuk ' + studentName);
//  });
//});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});