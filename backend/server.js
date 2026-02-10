const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Dummy Data Random Users
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

// Endpoint untuk mendapatkan random user
app.get('/api/random-user', (req, res) => {
    // Pilih user secara acak dari array
    const randomUser = randomUsers[Math.floor(Math.random() * randomUsers.length)];

    // Format response agar mirip dengan API randomuser.me yang asli
    res.json({
        results: [randomUser],
        info: {
            seed: "express-mock-api",
            results: 1,
            page: 1,
            version: "1.0"
        }
    });
});

app.listen(port, () => {
    console.log(`Mock Random User API running at http://localhost:${port}`);
});
