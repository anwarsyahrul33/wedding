# Wedding Invitation Web — Next.js + Sanity CMS

## Role

You are a senior full-stack web developer and UI/UX engineer. Build a modern, elegant, responsive wedding invitation website using:

- **Next.js**
- **React**
- **TypeScript**
- **Sanity CMS**
- **Tailwind CSS**
- **Framer Motion atau GSAP**
- **Node.js v20.18.3**
- Responsive design untuk mobile, tablet, dan desktop
- Struktur kode yang clean, scalable, dan mudah dikembangkan

Website harus terasa seperti **premium wedding invitation**, bukan seperti website template biasa.

---

# 1. PROJECT OBJECTIVE

Buat sebuah **single-page wedding invitation website** dengan visual yang:

- Elegant
- Romantic
- Minimalist
- Premium
- Modern
- Smooth
- Memiliki typography yang kuat
- Memiliki animasi halus
- Mobile-first
- Loading cepat
- Mudah diubah kontennya melalui Sanity CMS

Website hanya memiliki **1 halaman utama**.

Semua konten wedding invitation harus dapat dikelola melalui **Sanity CMS**, terutama:

- Nama pasangan
- Foto hero
- Foto galeri
- Tanggal pernikahan
- Waktu acara
- Lokasi
- Deskripsi
- Quote
- Musik
- Informasi acara
- Countdown
- Dan konten lain yang relevan

---

# 2. ENVIRONMENT REQUIREMENT

Gunakan:

```bash
Node.js v20.18.3
```

Pastikan seluruh dependency yang digunakan kompatibel dengan Node.js tersebut.

Sebelum melakukan implementasi, periksa versi package yang digunakan dan pilih versi stabil yang kompatibel dengan Node.js v20.18.3.

Gunakan package manager:

```bash
npm
```

---

# 3. INITIAL PROJECT SETUP

Buat project Next.js menggunakan TypeScript.

Preferred setup:

```bash
npx create-next-app@latest wedding-invitation
```

Gunakan konfigurasi:

```text
TypeScript: Yes
ESLint: Yes
Tailwind CSS: Yes
App Router: Yes
src/: Yes
Import alias: Yes
```

Gunakan struktur project modern dengan App Router.

Setelah project dibuat, install dependency yang dibutuhkan.

Minimal dependency:

```bash
npm install sanity next-sanity @sanity/image-url
npm install framer-motion
npm install lucide-react
```

Untuk typography gunakan Google Fonts melalui `next/font/google`.

Jangan menggunakan metode import font dari CDN secara manual jika dapat menggunakan `next/font`.

---

# 4. PROJECT STRUCTURE

Gunakan struktur seperti berikut:

```text
wedding-invitation/
│
├── public/
│   ├── audio/
│   │   └── wedding-song.mp3
│   └── images/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── favicon.ico
│   │
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Opening.tsx
│   │   │   ├── Couple.tsx
│   │   │   ├── Story.tsx
│   │   │   ├── Event.tsx
│   │   │   ├── Countdown.tsx
│   │   │   ├── Gallery.tsx
│   │   │   ├── Quote.tsx
│   │   │   └── Closing.tsx
│   │   │
│   │   ├── MusicPlayer.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── FloatingNavigation.tsx
│   │   └── ScrollReveal.tsx
│   │
│   ├── sanity/
│   │   ├── client.ts
│   │   ├── image.ts
│   │   ├── queries.ts
│   │   └── schemas/
│   │       ├── wedding.ts
│   │       ├── gallery.ts
│   │       └── index.ts
│   │
│   ├── lib/
│   │   ├── utils.ts
│   │   └── countdown.ts
│   │
│   └── types/
│       └── wedding.ts
│
├── sanity/
│   ├── schemaTypes/
│   ├── sanity.config.ts
│   └── sanity.cli.ts
│
├── .env.local
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

Apabila struktur yang lebih baik diperlukan berdasarkan versi package terbaru, gunakan struktur tersebut selama tetap clean dan mudah dipahami.

---

# 5. SINGLE PAGE ARCHITECTURE

Website hanya memiliki satu route utama:

```text
/
```

Semua section berada pada halaman yang sama.

Urutan section:

```text
1. Opening / Cover
2. Hero
3. Couple
4. Wedding Quote
5. Love Story
6. Event Details
7. Countdown
8. Photo Collage
9. Closing
```

Tidak perlu membuat banyak route kecuali benar-benar diperlukan untuk Sanity Studio.

---

# 6. HERO SECTION

Hero menjadi bagian paling visual dari website.

Gunakan:

- Full viewport
- Foto pasangan sebagai background utama
- Overlay gradient yang sangat subtle
- Typography elegan
- Nama kedua mempelai
- Tanggal pernikahan
- CTA "Open Invitation"
- Animasi entrance
- Parallax ringan
- Floating decorative elements

Contoh layout:

```text
        [decorative element]

            SAVE THE DATE

        NAMA MEMPELAI
              &
        NAMA MEMPELAI

         20 . 12 . 2026

          OPEN INVITATION

        [decorative element]
```

Hero harus terlihat premium dan cinematic.

Gunakan `next/image`.

Jangan menggunakan `<img>` biasa kecuali benar-benar diperlukan.

---

# 7. OPENING EXPERIENCE

Saat halaman pertama kali dibuka, tampilkan opening screen yang elegan.

Contoh:

```text
The Wedding of

[Name]
&
[Name]

[Open Invitation]
```

Ketika tombol diklik:

1. Opening screen fade out
2. Hero muncul
3. Musik mulai dimainkan apabila browser mengizinkan
4. Scroll animation dapat mulai aktif

Karena browser modern memiliki autoplay restrictions, jangan memaksa audio berjalan tanpa interaksi pengguna.

---

# 8. MUSIC PLAYER

Tambahkan wedding background music.

Komponen:

```text
MusicPlayer.tsx
```

Fitur:

- Play / pause
- Floating button
- Fixed position
- Icon music
- Rotating animation saat musik aktif
- Smooth transition
- Tidak mengganggu konten

State:

```text
playing
paused
```

Gunakan HTML Audio API atau pendekatan React yang stabil.

Audio harus dimulai setelah user melakukan interaction seperti:

```text
OPEN INVITATION
```

Jangan membuat audio autoplay sebelum user interaction.

---

# 9. TYPOGRAPHY

Typography merupakan bagian penting dari desain.

Gunakan kombinasi maksimal 2–3 font.

Contoh kombinasi:

### Display Font

```text
Cormorant Garamond
```

atau:

```text
Playfair Display
```

### Body Font

```text
Inter
```

atau:

```text
DM Sans
```

### Accent Script

Jika diperlukan gunakan font script yang elegan, tetapi jangan berlebihan.

Gunakan typography hierarchy yang jelas:

```text
Hero Name
↓
Large serif

Section Heading
↓
Elegant serif

Body
↓
Clean sans serif

Label
↓
Small uppercase
```

Contoh:

```text
THE WEDDING OF

Alexander
&
Amelia

20 December 2026
```

Pastikan typography tetap readable pada layar kecil.

---

# 10. COLOR SYSTEM

Gunakan color system yang elegant.

Default palette:

```text
Background:
#F7F3EE

Primary:
#2E2A27

Secondary:
#756B63

Accent:
#A98F7A

Light:
#FFFFFF
```

Boleh menggunakan neutral earthy colors seperti:

- ivory
- cream
- beige
- warm gray
- soft brown

Jangan menggunakan warna terlalu saturated.

Semua warna harus dikontrol melalui CSS variables / Tailwind theme sehingga mudah diubah.

---

# 11. COUPLE SECTION

Buat section untuk memperkenalkan kedua mempelai.

Layout:

```text
[Photo]

BRIDE

Full Name
Child of
Father & Mother


GROOM

Full Name
Child of
Father & Mother

[Photo]
```

Desktop dapat menggunakan dua kolom.

Mobile menjadi satu kolom.

Gunakan animasi reveal ketika section masuk viewport.

---

# 12. LOVE STORY

Buat section timeline sederhana.

Contoh:

```text
2019
First Meet

2021
Our Story Begins

2024
The Proposal

2026
The Wedding
```

Data harus berasal dari Sanity CMS.

Timeline dapat menggunakan vertical line dengan animation progress.

Gunakan Framer Motion atau GSAP.

Animasi harus subtle dan tidak berlebihan.

---

# 13. WEDDING EVENT

Buat section detail acara.

Minimal data:

### Akad

```text
Date
Time
Venue
Address
Maps URL
```

### Reception

```text
Date
Time
Venue
Address
Maps URL
```

Buat card yang elegant.

Tambahkan tombol:

```text
VIEW LOCATION
```

yang membuka Google Maps.

Gunakan icon dari `lucide-react`.

---

# 14. COUNTDOWN

Buat countdown menuju tanggal wedding.

Countdown harus realtime.

Format:

```text
120
DAYS

12
HOURS

34
MINUTES

52
SECONDS
```

Countdown menggunakan target datetime dari Sanity CMS.

Contoh:

```text
2026-12-20T09:00:00+07:00
```

Ketika countdown mencapai 0:

```text
THE DAY HAS ARRIVED
```

Jangan menyebabkan hydration mismatch antara server dan client.

Gunakan Client Component dengan lifecycle yang aman.

---

# 15. PHOTO COLLAGE

Buat section gallery berbentuk editorial photo collage.

Jangan menggunakan grid biasa yang monoton.

Contoh layout:

```text
┌───────────────┬───────┐
│               │       │
│   LARGE       │ SMALL │
│   IMAGE       │ IMAGE │
│               │       │
├───────┬───────┴───────┤
│ SMALL │     LARGE      │
│ IMAGE │      IMAGE     │
└───────┴────────────────┘
```

Gallery harus:

- Responsive
- Masonry/editorial feel
- Smooth hover effect
- Image zoom ringan
- Fade/reveal animation
- Lazy loading

Untuk mobile ubah menjadi layout yang tetap menarik.

Semua foto berasal dari Sanity.

---

# 16. SANITY CMS

Integrasikan Sanity sebagai CMS utama.

Admin harus dapat mengubah konten tanpa menyentuh kode.

Buat schema utama:

```text
wedding
```

Schema minimal:

```text
wedding
├── brideName
├── brideFullName
├── brideParents
├── bridePhoto
├── groomName
├── groomFullName
├── groomParents
├── groomPhoto
├── heroImage
├── weddingDate
├── weddingTime
├── venue
├── venueAddress
├── mapsUrl
├── quote
├── quoteAuthor
├── story
├── events
├── gallery
├── music
└── closingMessage
```

---

# 17. SANITY SCHEMA — EVENTS

Buat reusable object untuk event:

```text
event
├── type
├── title
├── date
├── startTime
├── endTime
├── venue
├── address
├── mapsUrl
└── description
```

Contoh:

```text
Akad Nikah
Resepsi
```

---

# 18. SANITY SCHEMA — LOVE STORY

Buat array:

```text
story
├── year
├── title
├── description
└── image
```

Contoh:

```text
2020
First Meet

2022
Relationship

2025
Engagement

2026
Wedding
```

---

# 19. SANITY SCHEMA — GALLERY

Buat gallery sebagai array image.

Setiap image dapat memiliki:

```text
image
caption
alt
```

Tambahkan image hotspot/crop apabila tersedia.

Pastikan image URL dibuat menggunakan Sanity Image URL Builder.

---

# 20. SANITY QUERY

Gunakan GROQ query.

Contoh pendekatan:

```ts
*[_type == "wedding"][0]
```

Jangan hardcode wedding content di frontend.

Frontend mengambil data dari Sanity.

Buat file:

```text
src/sanity/queries.ts
```

Simpan semua query di sana.

---

# 21. SANITY IMAGE HANDLING

Gunakan:

```text
@sanity/image-url
```

Untuk menghasilkan image URL yang optimal.

Pastikan image dapat menggunakan:

```text
width
height
quality
fit
crop
```

Optimalkan gambar agar tidak menyebabkan halaman terlalu berat.

---

# 22. ANIMATION SYSTEM

Gunakan **Framer Motion** sebagai default.

GSAP hanya digunakan jika membutuhkan animasi yang lebih kompleks.

Gunakan animasi untuk:

- Hero entrance
- Text reveal
- Image reveal
- Scroll reveal
- Image scale
- Parallax
- Gallery hover
- Countdown
- Timeline
- Section transition

Contoh pattern:

```text
opacity: 0 → 1
y: 40 → 0
scale: 0.95 → 1
```

Durasi:

```text
0.6s – 1.2s
```

Gunakan easing yang smooth.

Hindari animasi berlebihan.

---

# 23. SCROLL ANIMATION

Setiap section sebaiknya memiliki scroll reveal.

Contoh:

```text
whileInView={{
  opacity: 1,
  y: 0
}}
```

Dengan:

```text
viewport={{ once: true, amount: 0.2 }}
```

Pastikan animasi tidak berjalan berulang kali kecuali memang diperlukan.

---

# 24. ACCESSIBILITY

Website harus memperhatikan accessibility.

Wajib:

- Semantic HTML
- Proper heading hierarchy
- Alt text untuk image
- Button yang memiliki accessible label
- Keyboard navigation
- Focus state
- Sufficient contrast
- `aria-label` untuk icon button
- `prefers-reduced-motion`

Jika user menggunakan reduced motion:

```text
prefers-reduced-motion
```

kurangi atau matikan animasi yang tidak diperlukan.

---

# 25. RESPONSIVE DESIGN

Prioritaskan mobile.

Breakpoint minimal:

```text
Mobile
Tablet
Desktop
Large Desktop
```

Test pada ukuran:

```text
375px
390px
430px
768px
1024px
1280px
1440px
```

Pastikan:

- Text tidak overflow
- Foto tidak terpotong secara buruk
- Countdown tetap readable
- Hero tidak rusak
- Navigation tetap usable
- Music button tidak menutupi konten

---

# 26. PERFORMANCE

Optimalkan performance.

Wajib:

- `next/image`
- Lazy loading
- Dynamic import jika relevan
- Jangan load JavaScript berlebihan
- Hindari dependency yang tidak diperlukan
- Optimize Sanity images
- Hindari layout shift
- Gunakan server components jika memungkinkan
- Gunakan client component hanya ketika diperlukan

Target:

```text
Fast initial load
Smooth scrolling
Low layout shift
Good Core Web Vitals
```

---

# 27. SEO

Buat metadata di:

```text
src/app/layout.tsx
```

Contoh:

```text
title:
The Wedding of [Bride] & [Groom]

description:
Wedding invitation of [Bride] & [Groom]

openGraph:
title
description
image
```

Gunakan dynamic metadata jika data wedding berasal dari Sanity dan pendekatan tersebut sesuai dengan arsitektur aplikasi.

---

# 28. UI DETAIL

Tambahkan elemen dekoratif seperti:

- thin borders
- soft shadows
- grain/noise texture sangat subtle
- decorative serif letters
- lines
- small ornaments
- flower-inspired minimal shapes

Tetap minimal.

Jangan membuat desain seperti template wedding generik.

Nuansa yang diinginkan:

```text
luxury editorial wedding
+
modern minimalism
+
cinematic photography
```

---

# 29. INTERACTION DETAIL

Tambahkan:

### Hero

Parallax background ringan.

### Opening

Fade/scale transition.

### Gallery

Hover zoom.

### Countdown

Number transition.

### Music

Rotating icon saat aktif.

### Scroll

Smooth reveal.

### Buttons

Hover:

```text
scale
background transition
letter-spacing transition
```

Semua interaction harus terasa halus.

---

# 30. DATA MODEL

Gunakan TypeScript type untuk data Sanity.

Contoh:

```ts
export interface Wedding {
  brideName: string
  brideFullName: string
  brideParents?: string
  bridePhoto?: SanityImage
  groomName: string
  groomFullName: string
  groomParents?: string
  groomPhoto?: SanityImage
  heroImage?: SanityImage
  weddingDate: string
  weddingTime?: string
  venue?: string
  venueAddress?: string
  mapsUrl?: string
  quote?: string
  quoteAuthor?: string
  story?: Story[]
  events?: WeddingEvent[]
  gallery?: GalleryImage[]
  music?: SanityFile
  closingMessage?: string
}
```

Sesuaikan dengan schema final.

---

# 31. ENVIRONMENT VARIABLES

Buat:

```text
.env.local
```

Minimal:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
```

Tambahkan environment variable lain hanya jika diperlukan.

Jangan commit `.env.local`.

Tambahkan:

```text
.env.local
```

ke `.gitignore`.

---

# 32. SANITY STUDIO

Setup Sanity Studio.

Studio harus memungkinkan administrator:

- Upload foto
- Edit nama
- Edit tanggal
- Edit event
- Edit story
- Edit quote
- Edit gallery
- Mengatur musik
- Mengubah semua teks invitation

Buat schema yang mudah dipahami oleh admin non-teknis.

Gunakan field title/descriptions yang jelas.

---

# 33. CONTENT VALIDATION

Tambahkan validation Sanity untuk field penting.

Contoh:

```text
Bride name → required
Groom name → required
Wedding date → required
Hero image → required
Event title → required
Venue → required
```

Pastikan admin tidak mudah memasukkan data invalid.

---

# 34. COMPONENT PRINCIPLES

Jangan membuat satu file `page.tsx` yang sangat besar.

Pisahkan section menjadi component.

Contoh:

```tsx
<Hero />
<Couple />
<Quote />
<Story />
<Events />
<Countdown />
<Gallery />
<Closing />
```

`page.tsx` hanya bertugas mengatur composition.

---

# 35. CLIENT / SERVER COMPONENT

Gunakan Server Component secara default.

Gunakan:

```tsx
"use client"
```

hanya untuk component yang memang membutuhkan:

- React state
- Browser API
- Animation interaction
- Audio API
- Countdown timer

Contoh component yang kemungkinan Client Component:

```text
Countdown
MusicPlayer
ScrollReveal
InteractiveGallery
```

---

# 36. ERROR HANDLING

Tambahkan handling untuk:

- Sanity data kosong
- Image tidak tersedia
- Gallery kosong
- Event kosong
- Music tidak tersedia
- Countdown target tidak valid

Website harus tetap dapat dirender meskipun beberapa data CMS belum diisi.

---

# 37. FALLBACK CONTENT

Saat CMS belum memiliki data, gunakan fallback yang aman untuk development.

Contoh:

```text
The Wedding of
Bride Name
&
Groom Name
```

Tetapi jangan menjadikan fallback sebagai hardcoded production content.

---

# 38. README

Buat README yang menjelaskan:

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Production

```bash
npm start
```

## Sanity

Jelaskan:

- cara membuat project Sanity
- cara mendapatkan Project ID
- cara mengatur dataset
- cara menjalankan Sanity Studio
- cara memasukkan content
- cara menghubungkan Sanity ke Next.js

---

# 39. DEVELOPMENT WORKFLOW

Ikuti urutan implementasi berikut.

### STEP 1 — Bootstrap

- Create Next.js project
- Verify Node.js version
- Install dependencies
- Configure Tailwind
- Configure fonts
- Configure ESLint

### STEP 2 — Sanity

- Setup Sanity project
- Setup schema
- Setup client
- Setup image builder
- Setup GROQ query

### STEP 3 — Data Layer

- TypeScript interfaces
- Sanity queries
- Data fetching
- Error handling
- Fallback

### STEP 4 — Layout

Buat:

```text
Hero
Couple
Story
Events
Countdown
Gallery
Closing
```

### STEP 5 — Design System

Implement:

- Colors
- Fonts
- Spacing
- Buttons
- Cards
- Borders
- Responsive breakpoints

### STEP 6 — Animation

Implement:

- Hero animation
- Scroll reveal
- Gallery animation
- Countdown animation
- Music animation

### STEP 7 — Music

Implement audio player dan user interaction.

### STEP 8 — Responsive

Test semua breakpoint.

### STEP 9 — Performance

Optimize images, rendering, bundle dan animation.

### STEP 10 — SEO

Implement metadata dan Open Graph.

### STEP 11 — Quality Check

Run:

```bash
npm run lint
npm run build
```

Perbaiki semua error.

---

# 40. DESIGN DIRECTION

Gunakan design direction berikut:

```text
Style:
Luxury Editorial Wedding

Mood:
Romantic
Elegant
Warm
Timeless

Typography:
Elegant serif + modern sans serif

Photography:
Large cinematic photographs

Layout:
Editorial asymmetrical layout

Animation:
Soft cinematic transitions

Color:
Warm neutral / ivory / beige / brown

Spacing:
Generous whitespace

UI:
Minimal
Clean
Premium
```

Hindari:

```text
❌ excessive gradients
❌ excessive shadows
❌ overly colorful UI
❌ generic wedding template look
❌ excessive animations
❌ giant unnecessary buttons
❌ cluttered sections
```

---

# 41. MOBILE EXPERIENCE

Mobile adalah prioritas utama.

Pada mobile:

- Hero harus tetap cinematic
- Nama pengantin tetap mudah dibaca
- Countdown berubah menjadi 4-column compact layout
- Gallery menggunakan editorial stacked layout
- Music button tetap accessible
- CTA cukup besar untuk disentuh
- Decorative elements jangan menutupi teks

Pastikan website terasa seperti **mobile wedding invitation**, bukan desktop website yang diperkecil.

---

# 42. FINAL EXPECTED RESULT

Hasil akhir harus berupa:

```text
Next.js Application
        +
Sanity CMS
        +
Premium Wedding UI
        +
Responsive Design
        +
Music
        +
Photo Collage
        +
Countdown
        +
Modern Typography
        +
Framer Motion / GSAP
        +
SEO
        +
Performance Optimization
```

Website harus dapat dijalankan dengan:

```bash
npm run dev
```

dan production build dengan:

```bash
npm run build
npm start
```

---

# 43. IMPORTANT AGENT RULES

Saat mengerjakan project:

1. Jangan langsung membuat seluruh project dalam satu file.
2. Bangun secara bertahap.
3. Setelah setiap tahap selesai, pastikan tidak ada TypeScript error.
4. Jangan menggunakan dependency yang tidak diperlukan.
5. Gunakan versi package yang kompatibel dengan Node.js **v20.18.3**.
6. Gunakan TypeScript strict mode jika memungkinkan.
7. Jangan hardcode data wedding pada UI apabila data dapat berasal dari Sanity.
8. Prioritaskan performance dan mobile UX.
9. Pastikan animasi tidak membuat website terasa lambat.
10. Gunakan semantic HTML.
11. Gunakan accessible labels.
12. Gunakan `next/image`.
13. Jangan menggunakan autoplay audio tanpa user interaction.
14. Jangan membuat API yang tidak dibutuhkan.
15. Jangan membuat route tambahan yang tidak diperlukan.
16. Jangan menggunakan database lain karena Sanity menjadi CMS.
17. Gunakan Server Components secara default.
18. Gunakan Client Components hanya ketika dibutuhkan.
19. Pastikan countdown tidak mengalami hydration mismatch.
20. Jalankan lint dan production build sebelum menyatakan project selesai.

---

# 44. ACCEPTANCE CRITERIA

Project dianggap selesai apabila:

```text
[ ] Next.js berjalan pada Node.js v20.18.3
[ ] TypeScript tidak memiliki error
[ ] ESLint tidak memiliki error
[ ] Sanity terhubung dengan benar
[ ] Wedding data berasal dari Sanity
[ ] Hero menggunakan image dari Sanity
[ ] Couple section tersedia
[ ] Love story tersedia
[ ] Event details tersedia
[ ] Countdown realtime berjalan
[ ] Photo collage tersedia
[ ] Music player tersedia
[ ] Opening experience tersedia
[ ] Framer Motion / GSAP digunakan
[ ] Responsive mobile
[ ] Responsive tablet
[ ] Responsive desktop
[ ] SEO metadata tersedia
[ ] Open Graph tersedia
[ ] Accessibility diperhatikan
[ ] Reduced motion diperhatikan
[ ] Images teroptimasi
[ ] npm run lint berhasil
[ ] npm run build berhasil
[ ] README tersedia
```

---

# 45. OUTPUT YANG DIHARAPKAN DARI AGENT

Kerjakan project secara bertahap.

Pada setiap tahap:

1. Jelaskan file yang dibuat atau diubah.
2. Tampilkan kode yang relevan.
3. Jalankan/check command yang diperlukan.
4. Perbaiki error sebelum melanjutkan.
5. Jangan melompati konfigurasi penting.
6. Pastikan setiap tahap menghasilkan project yang tetap runnable.

Urutan output:

```text
PHASE 1
Project Setup

PHASE 2
Sanity Setup

PHASE 3
Schema & Data Layer

PHASE 4
UI Components

PHASE 5
Animations

PHASE 6
Music

PHASE 7
Responsive Optimization

PHASE 8
SEO & Accessibility

PHASE 9
Performance

PHASE 10
Final Testing
```

Di akhir pekerjaan, berikan:

```text
1. Final project structure
2. Dependency list
3. Environment variables required
4. How to run locally
5. How to configure Sanity
6. How to edit wedding content
7. How to replace music
8. How to deploy
9. Final testing result
```

## FINAL INSTRUCTION

Jangan hanya membuat website yang "berfungsi".

Buat website yang secara visual terasa seperti:

> **premium digital wedding invitation dengan nuansa luxury editorial, cinematic photography, elegant typography, subtle animation, dan pengalaman mobile yang sangat smooth.**

Prioritaskan **visual quality, typography, spacing, photography composition, animation quality, performance, dan maintainability** secara bersamaan.