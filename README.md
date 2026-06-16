# Warung Sate H. Faqih 1

Selamat datang di repositori web frontend untuk **Warung Sate H. Faqih 1**.
Website ini dirancang sebagai landing page/company profile untuk warung sate legendaris yang berdiri sejak tahun 1950. 

## Struktur Folder

```text
warung-sate-faqih/
│
├── index.html          # File HTML utama (struktur layout, konten)
│
├── assets/             # Penyimpanan aset gambar & icon
│   ├── images/         # Foto galeri, hero banner, dan foto menu
│   └── icons/          # Favicon, logo SVG/PNG
│
├── css/                # Penyimpanan stylesheet
│   └── style.css       # Animasi custom, hide-scrollbar, glassmorphism dll.
│
├── js/                 # Logika JavaScript dibagi menjadi beberapa modul
│   ├── main.js         # Inisialisasi utama, scroll spy, preloader
│   ├── slider.js       # Logika pergantian slide pada Hero dan Carousel Review
│   ├── modal.js        # Logika pop-up (lightbox) detail menu/tamu
│   ├── language.js     # Logika penggantian bahasa (I18N)
│   ├── data.js         # Kamus translasi teks (ID/EN)
│   └── tailwind.config.js # Konfigurasi warna, font, dan keyframes Tailwind CSS
│
└── README.md           # Dokumentasi proyek
```

## Teknologi yang Digunakan
- **HTML5** & **Vanilla JavaScript**: Tanpa framework JS berat untuk performa maksimal.
- **Tailwind CSS (CDN)**: Utility-first CSS framework untuk styling responsif secara cepat.
- **FontAwesome**: Untuk dukungan icon (sosial media, UI icons).
- **Google Fonts**: Menggunakan *Playfair Display* (Serif) dan *Plus Jakarta Sans* (Sans-serif).

## Cara Menjalankan
1. Pastikan Anda memiliki web server lokal seperti **XAMPP**, **Laragon**, atau ekstensi **Live Server** di VSCode.
2. Jika menggunakan XAMPP, letakkan folder ini di dalam direktori `htdocs/`.
3. Buka browser dan arahkan ke alamat lokal sesuai konfigurasi web server Anda.

## Fitur Utama
- **I18N (Multi-bahasa)**: Mendukung Bahasa Indonesia dan English secara instan (tanpa reload).
- **Hero Slider & Typewriter**: Banner otomatis berganti dilengkapi dengan animasi pengetikan teks dinamis.
- **Scroll Spy**: Menu navigasi otomatis aktif mengikuti area layar yang sedang dibaca.
- **Modals**: Klik pada gambar menu atau galeri tokoh untuk memunculkan detail informasi.
- **Responsive Design**: Tampilan disesuaikan untuk layar Mobile, Tablet, dan Desktop.
