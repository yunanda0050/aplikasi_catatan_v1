# 📝 Personal Notes App (React + Vite)

Aplikasi manajemen catatan pribadi berbasis web yang interaktif, aman, dan responsif. Projek ini dibangun sebagai portofolio untuk mengimplementasikan integrasi REST API secara penuh, sistem autentikasi, manajemen pencarian data reaktif, serta antarmuka modern.

---

## 🚀 Fitur Utama
* **Autentikasi Pengguna & Sesi:** Fitur Register dan Login yang terhubung ke layanan API eksternal untuk validasi akun pengguna.
* **Protected Routes (Keamanan Halaman):** Halaman Utama (`/home`) dan Tambah Catatan (`/add`) dilindungi secara ketat, hanya dapat diakses setelah pengguna berhasil masuk (*logged in*).
* **Sinkronisasi Data Data Hybrid:** Mengambil data secara *real-time* dari REST API (`getNotes`) dengan dukungan manajemen cadangan data otomatis berbasis browser (*Local Storage*).
* **Pencarian Reaktif (Real-Time Search):** Fitur pencarian catatan dinamis berdasarkan judul secara *case-insensitive* menggunakan React `useEffect`.
* **Asynchronous UX (Loading State):** Menyediakan pengalaman pengguna yang halus dengan indikator pemuatan data (`<Spin />` Ant Design) selama proses komunikasi data dengan server API berjalan.
* **Komponen Navigasi Dinamis:** Bar navigasi yang secara adaptif menampilkan opsi profil dan *logout* berdasarkan status masuk (*auth state*) pengguna.

---

## 📸 Pratinjau Aplikasi

| Halaman Login |
| :---: |
| <img width="1366" height="612" alt="notepad3" src="https://github.com/user-attachments/assets/fc76db36-a959-4f93-a975-429aaed4311a" />

| Halaman Utama Catatan |
| :---: |
| <img width="1366" height="615" alt="notepad1" src="https://github.com/user-attachments/assets/a1ff6536-a5a7-4e8e-9017-d67c41b2f916" />

| Halaman Tambah Catatan |
| :---: |
| <img width="1366" height="609" alt="notepad2" src="https://github.com/user-attachments/assets/21eb41a8-b725-4b36-8cb2-a666d682b5b2" />
 
| Halaman Daftar Catatan |
| :---: |
| <img width="1366" height="623" alt="notepad4" src="https://github.com/user-attachments/assets/00437846-2ca8-49a4-ba4c-477fa4cff2d7" />

--

## 🛠️ Tech Stack & Dependencies
* **Core Library:** React.js v18 (Hooks: `useState`, `useEffect`)
* **Build Tool:** Vite v4 (Fast Refresh & Optimized Development)
* **Routing:** React Router DOM v6 (`BrowserRouter`, `Routes`, `Route`, `useNavigate`)
* **UI Component Library:** Ant Design v5 & Ant Design Icons (`<Card>`, `<List>`, `<Input>`, `<Spin>`)
* **Notification System:** React Toastify
* **State & Network Layer:** Fetch/Custom Network Handler with Access Token Integration

---

## 💻 Cara Menjalankan Projek di Lokal

### Prasyarat
Pastikan komputer Anda sudah terinstal **Node.js** (versi rekomendasi LTS).

### Langkah-Langkah:
1. **Clone Repositori**
   ```bash
   git clone [https://github.com/yunanda0050/notes-app.git](https://github.com/yunanda0050/notes-app.git)
