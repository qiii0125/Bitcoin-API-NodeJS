const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const { Readable } = require('stream');

const app = express();
const port = 8080;

app.use(express.json());

// FITUR SECURITY: MIDDLEWARE API KEY
const SECRET_API_KEY = "kripto-uts-123";

app.use((req, res, next) => {
  const apiKey = req.header('x-api-key');

  if (!apiKey) {
    return res.status(401).json({
      status: "error",
      pesan: "Akses Ditolak (401)! Anda tidak memasukkan API Key di Header."
    });
  }


  if (apiKey !== SECRET_API_KEY) {
    return res.status(403).json({
      status: "error",
      pesan: "Akses Terlarang (403)! API Key Anda tidak valid."
    });
  }

  next();
});


let datasetCrypto = [];


const rawData = fs.readFileSync('btc.csv', 'utf8');
const cleanedData = rawData
  .split('\n')
  .map(line => {
    let cleanLine = line.trim();
    if (cleanLine.startsWith('"') && cleanLine.endsWith('"')) {
      cleanLine = cleanLine.slice(1, -1);
    }
    return cleanLine.replace(/""/g, '"');
  })
  .join('\n');

Readable.from(cleanedData)
  .pipe(csv())
  .on('data', (row) => {
    const cleanRow = {};
    for (let key in row) {
      const cleanKey = key.trim().replace(/,$/, '');
      cleanRow[cleanKey] = row[key];
    }
    datasetCrypto.push(cleanRow);
  })
  .on('end', () => {
    console.log('Dataset BTC siap! Total data:', datasetCrypto.length);
  });

// Endpoint POST /api/crypto
app.post('/api/crypto', (req, res) => {
  const { tanggal } = req.body || {};

  if (!tanggal) {
    return res.status(400).json({
      status: "error",
      pesan: "Parameter kurang! Masukkan parameter tanggal di Body."
    });
  }

  const hasilPencarian = datasetCrypto.filter(
    (data) => data.Date && data.Date.trim() === tanggal.trim()
  );

  if (hasilPencarian.length > 0) {
    res.json({
      status: "sukses",
      pencarian: { koin: "BTC", tanggal },
      data: hasilPencarian
    });
  } else {
    res.status(404).json({
      status: "gagal",
      pesan: "Data tidak ditemukan untuk tanggal: " + tanggal
    });
  }
});

app.listen(port, () => {
  console.log(`Server API jalan di http://localhost:${port}`);
});