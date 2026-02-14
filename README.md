# 📝 Live Grammar Checker

Aplikasi pengecekan grammar bahasa Inggris secara real-time menggunakan **Ionic Angular** dan **Groq AI**.
Selain fitur utama Grammar Checker, aplikasi ini juga memiliki fitur tambahan **Random User Generator** untuk keperluan testing data profil.

## 📖 Deskripsi

1. **Live Grammar Checker**: Cukup ketik kalimat di textarea, dan AI akan menganalisis grammar dalam waktu 1 detik setelah berhenti mengetik.
2. **Random User Generator**: Halaman khusus untuk menghasilkan data profil pengguna palsu (Nama, Foto, Email, Lokasi) menggunakan Mock API lokal.

## ✨ Fitur

### 1. Live Grammar Checker (Studi Kasus 2)
- **Live Check** - Pengecekan otomatis saat mengetik.
- **Reactive Programming** - Menggunakan RxJS Observable (`debounceTime`, `switchMap`).
- **Debounce Input** - Menunggu 1 detik agar tidak spam request.
- **Visual Feedback** - Tampilan Chat Bot UI yang interaktif (Hijau = Benar, Merah = Salah).
- **AI Powered** - Menggunakan Groq AI (Llama 3.3 70B).

### 2. Random User Generator (Studi Kasus 1)
- **Generate Profile** - Membuat data user palsu dengan sekali klik.
- **Promise & Async/Await** - Mengambil data menggunakan `lastValueFrom` (konversi dari Observable).
- **Mock API Local** - Menggunakan server Express.js lokal untuk stabilitas data.

### 3. Secure Authentication (Studi Kasus 3 - JWT)
- **User Registration** - Pendaftaran pengguna baru dengan password hashing (`bcrypt`).
- **Secure Login** - Otentikasi menggunakan JSON Web Token (JWT).
- **Session Management** - Penyimpanan token aman menggunakan `@capacitor/preferences`.
- **Route Protection** - `AuthGuard` untuk melindungi halaman sensitif dari akses tanpa login.
- **Logout** - Menghapus sesi dan token dari penyimpanan lokal.

## 🛠️ Teknologi & Dependensi

- **Frontend**: Ionic Angular (Standalone Components)
- **AI Service**: Groq API
- **Reactive**: RxJS
- **Storage**: @capacitor/preferences (untuk menyimpan JWT Token)
- **Backend (API Server)**:
  - `express`: Framework server.
  - `mysql2`: Driver database MySQL.
  - `bcrypt`: Hashing password aman.
  - `jsonwebtoken`: Generate & verify token JWT.
  - `cors` & `body-parser`: Middleware pendukung.

## 📁 Struktur Proyek

```
src/app/
├── services/
│   └── groq.service.ts      # Service komunikasi AI
├── home/                    # Halaman Grammar Checker (Chat UI)
├── random-user/             # Halaman Random User Generator
└── main.ts                  # Bootstrap App
backend/
└── server.js                # Server Express untuk Mock API
```

## 🚀 Cara Menjalankan

Aplikasi ini membutuhkan **dua terminal** yang berjalan bersamaan:

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database (MySQL)
1. Pastikan **XAMPP** (Apache & MySQL) sudah berjalan.
2. Buka `phpMyAdmin` atau tool database lain.
3. Buat database baru bernama **`db_kampus`**.
4. Import file SQL yang ada di `backend/database.sql` atau jalankan query berikut:
   ```sql
   CREATE TABLE IF NOT EXISTS users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       username VARCHAR(50) NOT NULL UNIQUE,
       password_hash VARCHAR(255) NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

### 3. Jalankan Backend Server (Terminal 1)
Server ini menangani Auth (Login/Register) dan Random User API.
```bash
node backend/server.js
```
*Output: Server berjalan di http://localhost:3000*

### 3. Konfigurasi API Key (PENTING!)
Agar **Grammar Checker** berfungsi, edit file `src/app/services/groq.service.ts`:
```typescript
private apiKey = 'YOUR_GROQ_API_KEY'; // Ganti dengan key dari Groq Console
```

### 4. Jalankan Aplikasi Ionic (Terminal 2)
```bash
ionic serve
```
Buka browser di `http://localhost:8100`.

## 📝 Cara Penggunaan

1. **Grammar Checker**:
   - Ketik kalimat bahasa Inggris.
   - Tunggu 1 detik.
   - Lihat balasan bot untuk koreksi grammar.
      - ✅ **Hijau** = Grammar benar
      - ❌ **Merah** = Grammar salah + saran koreksi

   ## 📄 Contoh Input Testing

   **Grammar Salah:**
   - `She don't like pizza` → She doesn't like pizza
   - `I goes to school` → I go to school
   - `He have a car` → He has a car

   **Grammar Benar:**
   - `She doesn't like pizza`
   - `I go to school every day`
   - `The weather is beautiful today`

2. **Random User**:
   - Buka menu di pojok kiri atas.
   - Pilih **Random User**.
   - Klik tombol **Generate User**.

3. **Secure Authentication**:
   - **Register**: Buat akun baru di halaman Register.
   - **Login**: Masuk dengan akun yang sudah dibuat.
   - **Akses Fitur**: Setelah login, Anda baru bisa mengakses menu **Grammar Checker** dan **Random User**.
   - **Logout**: Klik menu **Logout** di sidebar untuk keluar.

## 👨‍💻 Author

Dibuat untuk memenuhi tugas **Pemrograman Bergerak - Pertemuan 8**.
Semoga bermanfaat! 🚀

## 📚 Mata Kuliah

**Pemrograman Bergerak** - Pertemuan 8 dan 12 (hybrid) 2026
