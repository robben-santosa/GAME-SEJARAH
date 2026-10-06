# 🗡️ Jelajah Perang Padri — Game Edukasi Sejarah Minangkabau (1821–1837)

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Jelajah Perang Padri** adalah game edukasi interaktif berbasis web (2D RPG Story & Quiz) yang mengangkat kisah sejarah perjuangan rakyat Minangkabau pada kurun waktu 1821 hingga 1837. Game ini dirancang khusus untuk memudahkan siswa (khususnya tingkat SMA/SMK Kelas XI) dan masyarakat umum dalam memahami dinamika, tokoh-tokoh penting, serta pergeseran fase konflik Perang Padri secara visual, interaktif, dan menyenangkan.

---

## 🌟 Fitur Utama

- 🎮 **Storyline & Dialog Interaktif**: Alur narasi yang kronologis dari awal mula perselisihan internal hingga bersatunya Kaum Padri dan Kaum Adat melawan penjajah Belanda.
- 🚶 **Eksplorasi Karakter 2D**: Gerakkan karakter pemain melintasi panggung cerita untuk berinteraksi langsung dengan tokoh-tokoh sejarah.
- 🧠 **Kuis Pemahaman Sejarah**: Di setiap akhir level terdapat pertanyaan evaluasi untuk menguji pemahaman materi dengan sistem skor langsung (Maksimal 6 Poin).
- 🗺️ **Peta Perjalanan & Layer Persebaran**: Peta interaktif Minangkabau dengan filter layer (Persebaran Pos Belanda, Kerajaan/Masyarakat Nusantara, dan Arah Pergerakan).
- 📜 **Ensiklopedia Tokoh & Galeri Fakta**: Modul referensi tokoh pahlawan serta pembuka kartu fakta sejarah setelah menyelesaikan level.
- 🔊 **Web Audio Sintesis**: Dilengkapi efek suara interaktif bawaan peramban (*Web Audio API*) tanpa perlu mengunduh file suara eksternal yang berat.
- 📱 **Responsif & Ringan**: Dapat dimainkan di komputer, laptop, tablet, maupun smartphone tanpa perlu instalasi aplikasi tambahan.

---

## 🗺️ Alur & Babak Permainan

| Babak | Judul Level | Latar Tempat | Fokus Cerita |
| :--- | :--- | :--- | :--- |
| **Prolog** | *Tanah yang Terbelah* | Pegunungan Minangkabau | Pengantar kondisi sosial & keagamaan Minangkabau awal abad ke-19. |
| **Level 1** | *Tanah yang Terbelah* | Nagari Minangkabau | Awal perselisihan pandangan antara Kaum Padri dan Kaum Adat. |
| **Level 2** | *Tokoh dan Perubahan* | Surau | Perbedaan metode dakwah (Tuanku Nan Tuo vs Tuanku Nan Renceh & Tuanku Imam Bonjol). |
| **Level 3** | *Orang Asing di Tanah Minang* | Jalan Minangkabau | Intervensi militer kolonial Belanda yang memanfaatkan perpecahan lokal. |
| **Level 4** | *Musuh yang Sama* | Tempat Pertemuan | Titik balik: Bersatunya Kaum Padri & Adat menyadari ancaman penjajah Belanda. |
| **Level 5** | *Benteng Bonjol* | Benteng Bonjol | Pertahanan gigih benteng Bukit Tajadi Bonjol menghadapi kepungan Belanda. |
| **Level 6** | *Akhir Perlawanan* | Perundingan Bonjol | Penyerahan Tuanku Imam Bonjol (Oktober 1837) & pengasingan ke Manado. |
| **Epilog** | *Api yang Tertinggal* | Langit Malam Minang | Refleksi nilai persatuan, semangat juang, dan warisan sejarah bangsa. |

---

## 👥 Tokoh-Tokoh Sejarah dalam Game

1. **Tuanku Imam Bonjol (Muhammad Shahab)**: Pemimpin utama perlawanan Padri di Benteng Bonjol yang disegani kawan maupun lawan.
2. **Tuanku Nan Tuo**: Ulama moderat yang mengedepankan pendekatan dakwah dan pendidikan damai.
3. **Tuanku Nan Renceh**: Tokoh ulama pembaru yang bersikap tegas terhadap penegakan syariat Islam.
4. **Sultan Tangkal Alam Bagagar**: Tokoh representasi Kerajaan Pagaruyung yang menyadari bahaya tipu muslihat kolonial Belanda.
5. **Jenderal Hendrik Merkus de Kock**: Komandan militer Belanda yang menerapkan taktik Benteng Stelsel dan diplomasi penyerahan.

---

## 🕹️ Kontrol Permainan

| Aksi | Keyboard (PC/Laptop) | Sentuhan (Layar HP/Tablet) |
| :--- | :--- | :--- |
| **Bergerak Kiri** | `Panah Kiri (←)` atau `A` | Tombol D-Pad `◀` |
| **Bergerak Kanan** | `Panah Kanan (→)` atau `D` | Tombol D-Pad `▶` |
| **Interaksi / Bicara** | `Spasi` / `Enter` | Tombol D-Pad `Bicara 💬` |
| **Pilih Jawaban / Lanjut** | `Klik Kiri Mouse` | `Ketuk Layar (Tap)` |
| **Buka / Tutup Peta** | Klik tombol `PETA` di HUD | Ketuk tombol `PETA` |
| **Mute / Unmute Suara** | Klik tombol `SOUND` | Ketuk tombol `SOUND` |

---

## 🚀 Cara Menjalankan Proyek

Game ini dibangun murni menggunakan teknologi web standar (*Vanilla Web Tech*), sehingga **tidak memerlukan build tools, Node.js, atau instalasi database**.

### Cara 1: Langsung Buka di Browser (Paling Cepat)
1. Buka folder proyek di File Explorer.
2. Klik dua kali file **`index.html`** (atau klik kanan > *Open with* > Google Chrome / Microsoft Edge / Mozilla Firefox / Safari).
3. Selamat bermain!

### Cara 2: Menggunakan Ekstensi VS Code Live Server
1. Buka folder proyek ini di **Visual Studio Code**.
2. Pasang ekstensi **Live Server** (oleh *Ritwick Dey*).
3. Klik kanan file `index.html` lalu pilih **"Open with Live Server"**.
4. Browser akan otomatis terbuka di `http://127.0.0.1:5500`.

### Cara 3: Menggunakan Web Server Lokal (Python / NodeJS)
Jika ingin menjalankan server lokal lewat terminal:

```bash
# Menggunakan Python 3
python -m http.server 8080

# Atau menggunakan Node npx
npx serve .
```
Lalu buka alamat `http://localhost:8080` di peramban Anda.

---

## 📂 Struktur Direktori

```text
GAME SEJARAH/
├── assets/                  # Aset visual & audio game
│   ├── backgrounds/         # Latar visual panggung (nagari, surau, benteng, dsb.)
│   ├── characters/          # Sprite karakter tokoh & prajurit
│   ├── icons/               # Ikon UI (peta, bendera, pedang, skor, dsb.)
│   └── audio/               # Berkas audio pendukung opsional
├── tools/                   # Skrip utilitas pengembang & generator aset
├── index.html               # Struktur utama aplikasi & DOM layout
├── style.css                # Desain visual, tema retro Minangkabau & animasi
├── script.js                # Game engine: state management, dialog, kuis, peta & SFX
└── README.md                # Dokumentasi proyek
```

---

## 🛠️ Spesifikasi Teknologi

- **HTML5**: Struktur semantik, elemen interaktif, dan penataan dialog modal.
- **CSS3 Vanilla**: Desain bertema tradisional Minangkabau, Glassmorphism, CSS Grid & Flexbox layout, keyframe micro-animations.
- **JavaScript (ES6+)**: State engine modular tanpa dependensi framework luar.
- **Web Audio API**: Generator nada/SFX prosedural berbasis synthesizer oscillator.

---

## 🎓 Tujuan & Manfaat Edukasi

1. **Meningkatkan Minat Belajar**: Mengubah materi sejarah tekstual menjadi pengalaman bermain peran yang imersif.
2. **Memahami Urutan Kronologis**: Membantu siswa merekonstruksi urutan peristiwa dari tahun 1821 hingga 1837 secara terstruktur.
3. **Mengenalkan Nilai Luhur Bangsa**: Mengajarkan pentingnya persatuan, kebijaksanaan dalam bermusyawarah, serta patriotisme dalam mempertahankan tanah air.

---

**Dibuat untuk keperluan media pembelajaran sejarah interaktif.**  
*Silakan dipelajari, dimodifikasi, dan dikembangkan untuk keperluan edukasi.* 🏛️✨
