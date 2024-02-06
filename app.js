// app.js

const express = require('express');
const qr = require('qr-image');
const bodyParser = require('body-parser');
const fs = require('fs');
const mysql = require('mysql'); // Anda perlu menginstal paket mysql dengan npm install mysql
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
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();
  const timeMinutes = String(today.getMinutes());
  const timeHours = String(today.getHours());
  const timeSeconds = String(today.getSeconds());

  const timeFormatted = timeHours + ':' + timeMinutes + ':' + timeSeconds;
  const todayFormatted = dd + '-' + mm + '-' + yyyy;
  const timeANDtodayFormatted = todayFormatted + ' / ' + timeFormatted;

  formData = req.body;
  const studentName = req.body.studentName;
  const kodeVerifGen = generatekodeVerif();
  const qr_png = qr.image(kodeVerifGen, { type: 'png' });
  const qrPath = 'qr_codes/' + studentName + '.png';
  qr_png.pipe(fs.createWriteStream(qrPath));
  console.log(`${studentName} telah membuat QR Code`);
  console.log(kodeVerifGen);
  db.query('SELECT * FROM data_verifikasi WHERE nama_murid = ?', [formData.studentName], (err, rows) => {
    if (err) throw err;

    if (rows.length === 0) {
      db.query('INSERT INTO data_verifikasi (kode_verif, nama_murid, kelas, tanggal_waktu) VALUES (?,?,?,?)', [kodeVerifGen, formData.studentName, formData.pilihKelas, timeANDtodayFormatted], (err, result) => {
        if (err) throw err;
        console.log(`kode (${kodeVerifGen}) dari ${formData.studentName} kelas (${formData.pilihKelas}) telah terkirim ke database`);
      });
    }
    else {
      db.query('UPDATE data_verifikasi SET kode_verif = ?, tanggal_waktu = ? WHERE nama_murid = ?', [kodeVerifGen, timeANDtodayFormatted, formData.studentName], (err, result) => {
        if (err) throw err;
        console.log(`kode dari ${formData.studentName} kelas (${formData.pilihKelas}) telah di perbaharui dengan (${kodeVerifGen})`);
      });
    }
  });
});

app.post('/sudahabsen', (req, res, next) => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();
  const timeMinutes = String(today.getMinutes());
  const timeHours = String(today.getHours());
  const timeSeconds = String(today.getSeconds());

  const timeFormatted = timeHours + ':' + timeMinutes + ':' + timeSeconds;
  const todayFormatted = dd + '-' + mm + '-' + yyyy;
  const timeANDtodayFormatted = todayFormatted + ' / ' + timeFormatted;

  const kodeVerif = req.body.kodeVerif;

  db.query('SELECT * FROM data_verifikasi WHERE kode_verif = ?', [kodeVerif], (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      db.query(`INSERT INTO ${formData.pilihKelas} (nama_murid, kelas, tanggal_waktu) VALUES (?,?,?)` , [formData.studentName, formData.pilihKelas, timeANDtodayFormatted], (err, result) => {
        if (err) throw err;
      });
      console.log(`Verifikasi (${formData.studentName}) dari kelas (${formData.pilihKelas}) berhasil pada tanggal : (${timeANDtodayFormatted})!`);
    } else {
      console.log(`Verifikasi (${formData.studentName}) dari kelas (${formData.pilihKelas}) gagal pada tanggal : (${timeANDtodayFormatted})!`);
    }
  });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
