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

const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
const yyyy = today.getFullYear();
const timeMinutes = String(today.getMinutes());
const timeHours = String(today.getHours());
const timeSeconds = String(today.getSeconds());

const timeFormatted = timeHours + ':' + timeMinutes + ':' + timeSeconds;
const todayFormatted = dd + '-' + mm + '-' + yyyy;

app.post('/', (req, res, next) => {
  formData = req.body;
  const studentName = req.body.studentName;
  const kodeVerifGen = generatekodeVerif();
  const verifikasikodepage = `
    <form class="form-input-material" action="/sudahabsen" method="post" id="kodeVerif">
      <label style="font-size: 50px;" class="label-kode" for="kodeVerif">KODE</label>
      <input style="font-size: 50px; box-shadow: 0 0.4px 0.4px rgba(128, 128, 128, 0.109),
      0 1px 1px rgba(128, 128, 128, 0.155),
      0 2.1px 2.1px rgba(128, 128, 128, 0.195),
      0 4.4px 4.4px rgba(128, 128, 128, 0.241),
      0 12px 12px rgba(128, 128, 128, 0.35);" type="text" class="input-kode" id="kodeVerif" name="kodeVerif" placeholder="" required>
      <button style="font-size: 50px; box-shadow: 0 0.4px 0.4px rgba(128, 128, 128, 0.109),
      0 1px 1px rgba(128, 128, 128, 0.155),
      0 2.1px 2.1px rgba(128, 128, 128, 0.195),
      0 4.4px 4.4px rgba(128, 128, 128, 0.241),
      0 12px 12px rgba(128, 128, 128, 0.35);" type="submit" class="btn btn-primary btn-ghost btn-kode" id="clearAbsen">Check In</button>
    </form>
  `;
  const qr_png = qr.image(kodeVerifGen, { type: 'png' });
  const qrPath = 'qr_codes/' + studentName + '.png';
  qr_png.pipe(fs.createWriteStream(qrPath));
  console.log(`${studentName} telah membuat QR Code`);
  console.log(kodeVerifGen);
  res.sendFile(path.join(__dirname, 'public', 'style.css'));
  res.send(verifikasikodepage);
  db.query('SELECT * FROM verifikasi WHERE nama_murid = ?', [formData.studentName], (err, rows) => {
    if (err) throw err;

    if (rows.length === 0) {
      db.query('INSERT INTO verifikasi (kode_verif, nama_murid, kelas, tanggal, waktu) VALUES (?,?,?,?,?)', [kodeVerifGen, formData.studentName, formData.pilihKelas, todayFormatted, timeFormatted], (err, result) => {
        if (err) throw err;
        console.log(`kode (${kodeVerifGen}) dari ${formData.studentName} kelas (${formData.pilihKelas}) telah terkirim ke database`);
      });
    }
    else {
      db.query('UPDATE verifikasi SET kode_verif = ?, tanggal = ?, waktu = ? WHERE nama_murid = ?', [kodeVerifGen, todayFormatted, timeFormatted, formData.studentName], (err, result) => {
        if (err) throw err;
        console.log(`kode dari ${formData.studentName} kelas (${formData.pilihKelas}) telah di perbaharui dengan (${kodeVerifGen})`);
      });
    }
  });
});

app.post('/sudahabsen', (req, res, next) => {
  const kodeVerif = req.body.kodeVerif;

  db.query('SELECT * FROM verifikasi WHERE kode_verif = ?', [kodeVerif], (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      db.query(`INSERT INTO ${formData.pilihKelas} (nama_murid, kelas, tanggal, waktu) VALUES (?,?,?,?)` , [formData.studentName, formData.pilihKelas, todayFormatted, timeFormatted], (err, result) => {
        if (err) throw err;
      });
      res.send(`Verifikasi ${formData.studentName} dari kelas ${formData.pilihKelas} berhasil pada tanggal : (${todayFormatted} / ${timeFormatted})!`);
    } else {
      res.send(`Verifikasi ${formData.studentName} dari kelas ${formData.pilihKelas} gagal pada tanggal : (${todayFormatted} / ${timeFormatted}!`);
    }
  });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
