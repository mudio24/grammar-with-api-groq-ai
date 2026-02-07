# 📝 Live Grammar Checker

Aplikasi pengecekan grammar bahasa Inggris secara real-time menggunakan **Ionic Angular** dan **Groq AI**.

## 📖 Deskripsi

Aplikasi ini memungkinkan pengguna untuk mengecek grammar kalimat bahasa Inggris secara otomatis. Cukup ketik kalimat di textarea, dan AI akan menganalisis grammar dalam waktu 1 detik setelah berhenti mengetik.

## ✨ Fitur

- **Live Grammar Check** - Pengecekan grammar otomatis saat mengetik
- **Reactive Programming** - Menggunakan RxJS Observable (bukan Promise/async-await)
- **Debounce Input** - Menunggu 1 detik setelah user berhenti mengetik
- **Visual Feedback** - Warna hijau untuk grammar benar, merah untuk salah
- **AI Powered** - Menggunakan Groq AI dengan model Llama 3.3 70B

## 🛠️ Teknologi

- **Frontend**: Ionic Angular (Standalone Components)
- **AI Service**: Groq API (Llama 3.3 70B)
- **Reactive**: RxJS (debounceTime, distinctUntilChanged, switchMap)
- **Forms**: Angular ReactiveFormsModule

## 📁 Struktur Proyek

```
src/app/
├── services/
│   └── groq.service.ts      # Service untuk komunikasi dengan Groq AI
├── home/
│   ├── home.page.ts         # Logic halaman dengan RxJS
│   ├── home.page.html       # Template UI
│   └── home.page.scss       # Styling
└── main.ts                  # Bootstrap dengan provideHttpClient
```

## 📥 Clone Repository

1. **Clone repositori ini**
   ```bash
   git clone https://github.com/mudio24/grammar-with-api-groq-ai.git
   ```

2. **Masuk ke folder proyek**
   ```bash
   cd grammar-with-api-groq-ai
   ```

3. **Install Ionic CLI** (jika belum ada)
   ```bash
   npm install -g @ionic/cli
   ```

## 🚀 Cara Menjalankan

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Konfigurasi API Key**
   - Buka file `src/app/services/groq.service.ts`
   - Ganti `your_groq_api_key` dengan API key Anda dari [Groq Console](https://console.groq.com/keys)

3. **Jalankan aplikasi**
   ```bash
   ionic serve
   ```

4. **Buka browser** di `http://localhost:8100`

## 📝 Cara Penggunaan

1. Ketik kalimat bahasa Inggris di textarea
2. Tunggu 1 detik setelah berhenti mengetik
3. AI akan mengecek grammar dan menampilkan hasil:
   - ✅ **Hijau** = Grammar benar
   - ❌ **Merah** = Grammar salah + saran koreksi

## 🔧 Konfigurasi API Key

Edit file `src/app/services/groq.service.ts`:

```typescript
private apiKey = 'YOUR_GROQ_API_KEY';
```

Dapatkan API key gratis di: https://console.groq.com/keys

## 📊 RxJS Pipeline

```
User Typing → valueChanges
      ↓
   tap() → isLoading = true
      ↓
   debounceTime(1000) → Tunggu 1 detik
      ↓
   distinctUntilChanged() → Skip jika teks sama
      ↓
   filter() → Skip jika kosong
      ↓
   switchMap() → Cancel request lama, kirim baru
      ↓
   GroqService.checkGrammar()
      ↓
   subscribe → Tampilkan hasil
```

## 📄 Contoh Input Testing

**Grammar Salah:**
- `She don't like pizza` → She doesn't like pizza
- `I goes to school` → I go to school
- `He have a car` → He has a car

**Grammar Benar:**
- `She doesn't like pizza`
- `I go to school every day`
- `The weather is beautiful today`

## 📚 Mata Kuliah

**Pemrograman Bergerak** - Pertemuan 8 2026
