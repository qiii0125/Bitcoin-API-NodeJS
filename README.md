# Cryptocurrency Financial Data REST API 🪙
**Node.js Backend Service with API Key Authentication**

Proyek ini adalah layanan *backend* berbasis RESTful API yang dibangun menggunakan Node.js untuk memproses, memfilter, dan menyajikan data historis harga Bitcoin yang bersumber dari *file* CSV. 

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Testing & Validation:** Postman
- **Data Source:** Flat-file (CSV) Dataset

## 🚀 Key Features
- **API Key Authentication:** Mengamankan *endpoint* agar hanya bisa diakses oleh *client* yang menyertakan token/API Key yang valid pada *header*.
- **Data Processing:** Melakukan *parsing* dan ekstraksi data dari *file* CSV untuk disajikan dalam format JSON yang terstruktur.
- **HTTP Methods:** Mendukung *method* `GET` (mengambil data historis) dan `POST` (simulasi pengiriman instruksi atau modifikasi *state*).
- **Robust Error Handling:** Mengimplementasikan penanganan kode status HTTP dengan tepat, termasuk `405 Method Not Allowed`, `401 Unauthorized`, dan `500 Internal Server Error`.

## ⚙️ Cara Menjalankan Aplikasi Lokal
1. Clone repositori ini.
2. Jalankan perintah `npm install` untuk mengunduh semua dependensi (Express, CSV Parser, dll).
3. Pastikan *file* `dataset_bitcoin.csv` berada di *root directory*.
4. Jalankan server lokal dengan perintah `npm start` atau `node index.js`.
5. Gunakan Postman untuk melakukan *testing* ke *endpoint* `http://localhost:3000` dengan menyertakan *header* `x-api-key`.