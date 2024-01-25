// app.js

const express = require('express');
const qr = require('qr-image');
const bodyParser = require('body-parser');
const fs = require('fs');
const mysql = require('mysql'); // Anda perlu menginstal paket mysql dengan npm install mysql
const { get } = require('http');

const app = express();
const port = 2903;

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

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

app.post('/', (req, res) => {
  const studentName = req.body.studentName;
  const verificationCode = generateVerificationCode();
  const qr_png = qr.image(verificationCode, { type: 'png' });
  const qrPath = 'qr_codes/' + studentName + '.png';
  qr_png.pipe(fs.createWriteStream(qrPath));
  console.log(studentName + ' Telah Membuat QR Code');
  console.log(verificationCode);
});

app.post('/sudahabsen', (req, res) => {
  const verificationCode = req.body.kodeVerif;
  const studentName = req.app.studentName;
  console.log(studentName + ' Telah memasukkan kode: ' + verificationCode);
  res.send('Data absensi tersimpan untuk ' + studentName + ' menggunakan kode: ' + verificationCode);
});

//app.get('/masukankode/:studentName', (req, res) => {
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