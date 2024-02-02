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
  const kodeVerifGen = generatekodeVerif();
  const qr_png = qr.image(kodeVerifGen, { type: 'png' });
  const qrPath = 'qr_codes/' + studentName + '.png';
  qr_png.pipe(fs.createWriteStream(qrPath));
  console.log(studentName + ' telah membuat QR Code');
  console.log(kodeVerifGen);
  db.query('SELECT * FROM verifikasi WHERE nama_murid = ?', [formData.studentName], (err, rows) => {
    if (err) throw err;

    if (rows.length === 0) {
      db.query('INSERT INTO verifikasi (kode_verif, nama_murid) VALUES (?,?)', [kodeVerifGen, formData.studentName], (err, result) => {
        if (err) throw err;
        console.log(`kode (${kodeVerifGen}) dari ${formData.studentName} telah terkirim ke database`);
      });
    }
    else {
      db.query('UPDATE verifikasi SET kode_verif = ? WHERE nama_murid = ?', [kodeVerifGen, formData.studentName], (err, result) => {
        if (err) throw err;
        console.log(`kode dari ${formData.studentName} telah di perbaharui dengan ${kodeVerifGen}`);
      });
    }
  });
});

app.post('/sudahabsen', (req, res, next) => {
  const kodeVerif = req.body.kodeVerif;
  db.query('SELECT * FROM verifikasi WHERE kode_verif = ?', [kodeVerif], (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      db.query('INSERT INTO data (nama_murid) VALUES (?)' , [formData.studentName], (err, result) => {
        if (err) throw err;
      });
      res.send(`Verifikasi ${formData.studentName} berhasil`);
    } else {
      res.send(`Verifikasi ${formData.studentName} gagal!`);
    }
  });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
