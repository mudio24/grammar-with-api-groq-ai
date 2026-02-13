const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const secretKey = 'kunci_rahasia_akses';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// --- FITUR LAMA: RANDOM USER MOCK API ---
const randomUsers = [
    {
        name: { title: 'Mr', first: 'Budi', last: 'Santoso' },
        dob: { age: 25 },
        email: 'budi.santoso@example.com',
        location: { city: 'Jakarta', country: 'Indonesia' },
        login: { username: 'budisantoso99' },
        picture: { large: 'https://randomuser.me/api/portraits/men/1.jpg' }
    },
    {
        name: { title: 'Ms', first: 'Siti', last: 'Aminah' },
        dob: { age: 22 },
        email: 'siti.aminah@example.com',
        location: { city: 'Bandung', country: 'Indonesia' },
        login: { username: 'siti_aminah' },
        picture: { large: 'https://randomuser.me/api/portraits/women/2.jpg' }
    },
    {
        name: { title: 'Mr', first: 'Joko', last: 'Widodo' },
        dob: { age: 30 },
        email: 'joko.widodo@example.com',
        location: { city: 'Surabaya', country: 'Indonesia' },
        login: { username: 'jokowi_fans' },
        picture: { large: 'https://randomuser.me/api/portraits/men/3.jpg' }
    },
    {
        name: { title: 'Mrs', first: 'Rina', last: 'Nose' },
        dob: { age: 28 },
        email: 'rina.nose@example.com',
        location: { city: 'Yogyakarta', country: 'Indonesia' },
        login: { username: 'rinacomedy' },
        picture: { large: 'https://randomuser.me/api/portraits/women/4.jpg' }
    },
    {
        name: { title: 'Mr', first: 'Andi', last: 'Wijaya' },
        dob: { age: 35 },
        email: 'andi.wijaya@example.com',
        location: { city: 'Medan', country: 'Indonesia' },
        login: { username: 'awijaya77' },
        picture: { large: 'https://randomuser.me/api/portraits/men/5.jpg' }
    }
];

// Endpoint untuk mendapatkan random user (FITUR LAMA)
app.get('/api/random-user', (req, res) => {
    const randomUser = randomUsers[Math.floor(Math.random() * randomUsers.length)];
    res.json({
        results: [randomUser],
        info: { seed: "express-mock-api", results: 1, page: 1, version: "1.0" }
    });
});

// --- FITUR BARU: AUTHENTICATION (MySQL + JWT) ---

// Koneksi Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Sesuaikan jika ada password
    database: 'db_chatbot'
});

db.connect((err) => {
    if (err) {
        console.error('Koneksi database MySQL gagal (Cek XAMPP):', err.stack);
        console.log('Fitur Auth mungkin tidak berjalan, tapi fitur Random User tetap aktif.');
        return;
    }
    console.log('Terhubung ke database MySQL sebagai id ' + db.threadId);
});

// Endpoint POST /api/register
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username dan password wajib diisi' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO users (username, password_hash) VALUES (?, ?)';

        db.query(sql, [username, hashedPassword], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ message: 'Username sudah digunakan' });
                }
                return res.status(500).json({ message: 'Gagal registrasi user', error: err });
            }
            res.status(201).json({ message: 'Registrasi berhasil' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan server', error });
    }
});

// Endpoint POST /api/login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username dan password wajib diisi' });
    }

    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Kesalahan server', error: err });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Username atau password salah' });
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Username atau password salah' });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            secretKey,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login Sukses', token: token });
    });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
    console.log(`- Endpoint Random User: http://localhost:${port}/api/random-user`);
    console.log(`- Endpoint Auth: http://localhost:${port}/api/login & /register`);
});
