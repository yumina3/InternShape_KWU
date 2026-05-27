/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, Mentor, MenteeProgress, Message, Task, SharedResource } from "./types";

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "proj_1",
    title: "Sistem E-Commerce untuk Sari Roti",
    category: "Pengembangan Web",
    difficulty: "Menengah",
    description: "Mengembangkan platform e-commerce lokal untuk toko roti tradisional guna mendigitalisasi pesanan harian dan sistem pelacakan inventaris mereka.",
    logoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEpsFyZov9kmHd68BI5gTGHgLuKt5CCR0JV7ushXGTXPwYGldjxvAsrs15knTVjyTGeJ1wrINuuFUfK2ol6yaLSnrLjfk9Lpqwwu0eSKDAMCxUNDlrW00oX8Rzmb0OyGfPZjM5zzRU_C2QWIx7fJeDpx1Jg-U_K2pfswGDjT-rZJUDbEbaZKJvKwVC11WU5Ip4E4CFZe-joIPx4nNqQ3Hh8_aSLnqKneTzypb9c5VlUqUr0m18oMwzoBQAgpA6CLsStJegdHWAfu0",
    skillsNeeded: ["React.js", "Tailwind CSS", "PostgreSQL"],
    mentorName: "Dr. Aris Setiawan",
    mentorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBR2PYMWdsf4VOI5RjZTvUy-gadpR_kWWe6C1WW7jIzwFMfg3Utn530LooE9wUH1_eIdeL5jY9d23YTPEwDPw58K2NA43JTOHuuYkNaLQxolo7py8s5LIcGboZ3MGXVeGGGXyI3j4nTId9mtf-RpdclOQPGupLErCS0jPOPB1bo2KzZ1Ng-99Oz-qY2_ooISZUc_8bDhQ3lQ_k6fZTfV-gEJzx9PCb2fp8Yy8gJT8oj5K8YNLWFq8QbhjibK6NFJYIoBZsUrSBnmno",
    duration: 3,
    applied: false,
    starred: false
  },
  {
    id: "proj_2",
    title: "Pertumbuhan Sosial untuk Kopi Lokal",
    category: "Pemasaran Digital",
    difficulty: "Pemula",
    description: "Menerapkan strategi TikTok dan Instagram Reels yang komprehensif untuk meningkatkan lalu lintas organik bagi pemanggangan kopi butik.",
    logoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhnuYFJ_QpUn2ABfjwAoPknzuL2upw-knhaxOfqG58ktGzog_Rq1_koega5rRCOnJN0mNj36dzPQbYAOHMJnj2FzQ2hpF49wDyaIQ5Yw_N9WcvGXAN7zJ39-u9BK3XWsknFVAEQIUS8uE5oQ-smqR3Boe2M52G3LkpSJz-Cx3qDO5F-rqZhp7ftDpFZvBtVNmFrY5sBc8JlmWyNU5wjbvzvB4hVogykRQnFWw2XlD-4pwOKxA9TFTSwqgSN4wptRI5eq7LW6xnA6c",
    skillsNeeded: ["Video Editing", "Copywriting", "SEO"],
    mentorName: "Prof. Maya Indah",
    mentorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNC3nWKITRZUi1w5ibteTU9qKpFy4rai8iQJ1UohHlsUwFYRdnqEjTxMY5h2ly_88GrJ_grJ1qhy8y48bCVf54KugdTaj6o4bO-k2JRgupXiYiMqxjduuSMAWKlwn0hq0FbHemSaHguENvlqvJDzlAgQgsXCXsyHZeUG_SLBzShniqq_G5ucTD07GBlES6hdaQdiFL-JmApTrsBp6ftUaWifbaZr_t0_inhEDj-Kv_mSLMffV00uTBwiYkDaMNf-NGZ96_foRSQ8U",
    duration: 2,
    applied: false,
    starred: false
  },
  {
    id: "proj_3",
    title: "Audit Rantai Pasok - Textile Co.",
    category: "Strategi Bisnis",
    difficulty: "Lanjutan",
    description: "Menganalisis dan mengoptimalkan lini masa produksi untuk produsen garmen lokal guna mengurangi limbah dan meningkatkan waktu penyelesaian ekspor.",
    logoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKoOOp90smTzfnAlDd4y-3UNYdwBFM6vAaoizuo310UFkxoDw9TSExr2TVGYlpgF0en_iHLs5QqNJGlGLBolSuXv44jjTuRFyN5mRqASo1aAQI4yOKrg8ZsHVH9Fx8XEbIB-EzU_JYs90whN3pSwkW1cxHD0tnEUuxUFVErDao8UmQULDC-IXFsoIWBXgFb5HEJr6oTdJHhcPooRE6C4RdZiaw-r0hSwtJf9WKNFakmPLM1nS2KdkoBwXEgKcS9jqLZqmXqFQApaw",
    skillsNeeded: ["Analisis Data", "Lean Six Sigma", "Laporan Keuangan"],
    mentorName: "Drs. Henry Wijaya",
    mentorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3ZgjoOiZgHwwX9DMN-hOeFJnBfFhbbLY_xodh_76QZk7tixRDd4On118PpFlKL09F0nFr_7rey8W18A3wJwJO6FpnWwbIDrSvmwVUPAXU-PjNjnQrhDB3Bohms1pso9HNf9JP3Pa-FKThi1TZHN8U13hPqkSGzgoHoVhPUk8zh6IPwnr3vPCWoJSRtKsVUOOKoMWBxjEEY4yZ_6O4Ja-PuyAZ27qLrnJpPbbxgrerKpb3Y977KxRQCC2EwP4jeliemU_4_2A3z6w",
    duration: 6,
    applied: false,
    starred: false
  },
  {
    id: "proj_4",
    title: "Peramalan Permintaan untuk Sayur Fresh",
    category: "Sains Data",
    difficulty: "Menengah",
    description: "Menggunakan data penjualan historis untuk membangun model prediksi sederhana untuk pengisian stok produk segar selama puncak musiman.",
    logoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBY3LbHs3aFbUDTuAxDcQBsiu1NpxkeuGtqAEYg6xRml30SE_u-WJdy_p7JfIwsrEfTGC-KXUVcQDnKKwly7ze0PgZvTJRGgO8ysGbDQccn21J2ouW4dwVeiJa5NXWtTHBL7cjTLtrVjDa4W8DZKg8K6q10cd0OqjSuhz4P5Igstw2z2SY4ufgqUoNRpyydV6gN7yK_z6XIzP-Fax1SOVjaE9eLboQRFrV6gNqYBBx1W3OL_uZAAHU_vbQMtxsLAqmx0BOT-CD60nU",
    skillsNeeded: ["Python", "Pandas", "Data Viz"],
    mentorName: "Dr. Sarah Wijaya",
    mentorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBurGJwbpyH9NKMoPLOULbiO8niudCdI3yqfJYswPkv-ALUfLLdT1fYMPED86PuEsp0Q8NLNS-1GNxOyaDCP9mByDKjPY0PE1WH1uKP6nVAMlOBnji6YhONO_l-FLp976mwqcp-XR2zk0DKJD6OK2v6_SecAKyqc8Ee0LDoCnQJ1CnVJu8WCvn-wb0OgGpUT7qUfq1OSR32tWGXLprjzvmpK4XtPAeQknDgkP5zwY4uUVnogekqruPzkpBoBbmS1Nj9L-Lez1qx_gA",
    duration: 4,
    applied: false,
    starred: false
  }
];

export const INITIAL_MENTORS: Mentor[] = [
  {
    id: "ment_1",
    name: "Dr. Sarah Jenkins",
    role: "Direktur AI",
    company: "TechNova Labs",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_xYUbpMd14VM9ZzB1s-fpALekjXVjqlGWfQx-Ja3HUI5XbGRfMTLw6ZWpe87husXLCxhTr3RU5nffqrhbkqBUHidaOYAeClVj0vH4Huv2FRM85Uh7uvpzyGeGY4wGt-n6NyJselX7eElbMvGROaodoypobLPQ7vuuso7Rf1uBH3xPPY9sxPD2N0QtUFdtimYKTJShR2bCgL5XnCbpQOmWbxboTVhGMArGv8gGzw1Xv-ymPV3TGiw4AEa7Dhayq2wqHVBpNwTwVpk",
    rating: 4.9,
    studentsCount: 128,
    skills: ["Kecerdasan Buatan", "Strategi Produk", "Etika"],
    bio: "Mantan peneliti Stanford yang berspesialisasi dalam jaringan saraf dan implementasi AI yang etis. Telah membimbing 45+ profesional ke peran kepemimpinan."
  },
  {
    id: "ment_2",
    name: "Marcus Chen",
    role: "VP Desain",
    company: "Horizon Fintech",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuADZfCguyNblGAfgTQ33QWKgLRLqL5jx0swPmD42dGzUKVDuazuYunleBYN9FPjFTM5x7d_pDvqta54GeTId-kEZC0wD4PtH4p9-NNGxSeg2npvr6xnP8bRYzw8JUtHca6OWCRDfhSs1PQ5c9S3MuwWGgdAo6ddf5EP8lAl8Sy6NGsa7K4dRDe59WjGodgbvxCGxh5XdGTNaUVZWihzPMscHFRZMuRbXeFOxrxrNUlQu2M0VRj33CwopfAfphSL5r54caQ_MjYwG78",
    rating: 5.0,
    studentsCount: 84,
    skills: ["Desain UI/UX", "Kepemimpinan", "Fintech"],
    bio: "Mengembangkan tim desain di lingkungan pertumbuhan tinggi. Ahli dalam sistem desain dan komunikasi eksekutif untuk pemimpin kreatif."
  },
  {
    id: "ment_3",
    name: "Elena Rodriguez",
    role: "Ilmuwan Data Senior",
    company: "Meta",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBItxP9BnohKNfx88pwVbZOaZLwuAobBrD2AxbeqhQy7kkarNx86l7AXmMoccT2SAQ_xXww-qd5Y7RJcV-ssYmu_1HzblH4lOjVV45neTpkOZ0kiLRGViOjwVjuzDZfyG29eTWEnw7TWnc5nCb66Ng7PZcCq3jEsKEPnv6Wy73ySUbNhpdjyDplOaxiY1jT8xz5L_FwRA7_EIWN1cocfZab7wYJ7jOzWtxpIBKcCweiPaD5TtnInZNUQ1wGfoLulhZI88_oeIm1JJA",
    rating: 4.8,
    studentsCount: 210,
    skills: ["Sains Data", "Python", "Analitik"],
    bio: "Bersemangat dalam mengubah data kompleks menjadi wawasan produk yang dapat ditindaklanjuti. Spesialis dalam pengujian A/B dan pemodelan pertumbuhan."
  },
  {
    id: "ment_4",
    name: "Jordan Smith",
    role: "Manajer Produk Prinsipal",
    company: "Stripe",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJVOHOSITlHig52sSvdAg8EsG4B6-4cFRlc0VoSfZ5VC2Xf1OA3HizmkW09tPs7ThfIIaqTRm6Wakp2UF6eu1TKn1_e23ihKVYFA-N_gXgpm38K48-lLsNc7FRqQcfxcU4xNv1U7ulQtLjrjylV2HorIOSD19672GWerIiEEAdNA2eWvwRK6UyF2hw0Bxmzax-PMXWH7O4p2ASDAPNl7c6N5lp0LGq-TD28hXKBcmJ49hRBJhl48g6aLy1TMjhkoV9yCFHlZI6aDg",
    rating: 4.9,
    studentsCount: 56,
    skills: ["Manajemen Produk", "Fintech", "Desain API"],
    bio: "Spesialis infrastruktur dan API. Membantu Manajer Produk menavigasi kompleksitas teknis dan manajemen pemangku kepentingan."
  }
];

export const INITIAL_MENTEES: MenteeProgress[] = [
  {
    id: "m_1",
    name: "Elena Rodriguez",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKAAjFXsPW5SZqE2S5poKPzoVIj4WjiJPUzUxf2CYAAu4aYI84Z0O1_LWgn7eJPKgx6OZj_MGsZO04cDwmAJvmhAUPUjwUoXtPkYtdp-V_l-XDydTOnwwkY3bne41TM516k_QrCpEEdlIK0MiB0Zv8rUfeiuHPoFKETpwRXhQSFrI-hqSpC4DZvjesEJXX1tXh-NFowvnsk7QJnWtQZ2U_S8tptKP0ILY__2t09jsL_huZC0afG8-97YFj2fXM8AN1uT0yw5N5TBY",
    projectTitle: "Migrasi Rantai Pasok Digital",
    company: "EcoCraft Ceramics",
    progress: 75
  },
  {
    id: "m_2",
    name: "Samuel Chen",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPCk4GYSBNaLGSy1mWO2ifQ2Rmx-YO_NFUcDEBkoR_UB9_1ftdavV-Qf0LUlcu0FlXJpgVasgTDdcIgRW3jSU5rgn1gbZvImRCfIV5EADRX_HJOV3lA5_clwvLttjI1emw2hg1kHfaewccsG5-a14mYOim2_pMXHKQw8db0mdG7oEajI4jTQTteufLK1U2oCwuIYHROn2qa4tsTAY7xqrxF7JmoR8JHWaIEwwAxMNAg3X4eCMUv_QPSS3gJ6yYf1uKWFRhzGAE2Ck",
    projectTitle: "AI Optimasi Armada",
    company: "Apex Logistics",
    progress: 32
  },
  {
    id: "m_3",
    name: "Amara Okafor",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqrhAMfebEH4k-Td19Op_BlewXx1wddB1S1slnrOKAX-5juFUYqJ99AT9mnH6F7fSd1rYL0Az-lf6v5WhqCUxROLfu-PyC3KSZXYhFix5eACAXxj21M82GrRxqZZsHI9za9lvdYfDMozclCFqsq1016r0NGe_6wqbyBHrwjZN1BUjNHv4UzKuxC_iT_1W2hSMkLIYZB2tqy-9NLfaSlBWAUw-CeDTVAkbNsGNPurugEApz9rVDAMXsPlVEvpQee75kZAlRpxSEgn0",
    projectTitle: "Ekspansi Strategi Ekspor",
    company: "GreenRoot Agri-Tech",
    progress: 92
  }
];

export const INITIAL_CHAT: Message[] = [
  {
    id: "msg_1",
    sender: "mentor",
    text: "Kerja bagus untuk daftar bahannya. Saya sarankan untuk mencari opsi polimer daur ulang untuk casingnya.",
    timestamp: "09:12"
  },
  {
    id: "msg_2",
    sender: "user",
    text: "Terima kasih, Kak Sarah! Saya sudah menambahkan beberapa pemasok lokal yang menangani bahan daur ulang ke lembar kerja.",
    timestamp: "10:45"
  },
  {
    id: "msg_3",
    sender: "mentor",
    text: "Luar biasa. Mari kita diskusikan tahap CAD besok jam 14:00.",
    timestamp: "11:02"
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: "tsk_1",
    name: "Tahap 1: Laporan Sumber Bahan",
    submittedAt: "14 Okt 2024",
    status: "selesai"
  },
  {
    id: "tsk_2",
    name: "Tahap 2: Pemodelan CAD Prototipe",
    deadline: "28 Okt 2024",
    status: "sedang_berjalan"
  },
  {
    id: "tsk_3",
    name: "Tahap 3: Data Penilaian Dampak",
    status: "terkunci"
  }
];

export const INITIAL_RESOURCES: SharedResource[] = [
  {
    id: "res_1",
    name: "Brief_Proyek_V2.pdf",
    type: "document"
  },
  {
    id: "res_2",
    name: "Prakiraan_Anggaran.xlsx",
    type: "spreadsheet"
  },
  {
    id: "res_3",
    name: "Rekaman_Tinjauan_Sprint",
    type: "video"
  }
];

export const INITIAL_COMPLETED_PROJECTS: CompletedProject[] = [
  {
    id: "comp_1",
    title: "Inovasi Desain Kemasan & Branding Jamu Herbal UNNES",
    category: "Pemasaran Digital",
    company: "Jamu Makmur Sejahtera",
    mentorName: "Prof. Maya Indah",
    mentorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNC3nWKITRZUi1w5ibteTU9qKpFy4rai8iQJ1UohHlsUwFYRdnqEjTxMY5h2ly_88GrJ_grJ1qhy8y48bCVf54KugdTaj6o4bO-k2JRgupXiYiMqxjduuSMAWKlwn0hq0FbHemSaHguENvlqvJDzlAgQgsXCXsyHZeUG_SLBzShniqq_G5ucTD07GBlES6hdaQdiFL-JmApTrsBp6ftUaWifbaZr_t0_inhEDj-Kv_mSLMffV00uTBwiYkDaMNf-NGZ96_foRSQ8U",
    finishedAt: "12 Maret 2026",
    certificateId: "CERT-ISHAPE-2026-9812A",
    milestones: [
      {
        title: "Milestone 1: Analisis Pasar Jamu Tradisional",
        description: "Melakukan survei preferensi rasa dan kemasan jamu herbal di kalangan mahasiswa.",
        status: "completed",
        date: "10 Feb 2026",
        feedback: "Riset pasar sangat mendalam dan informatif. Segmentasi demografik mahasiswa UNNES digambarkan sangat baik."
      },
      {
        title: "Milestone 2: Perancangan Konten Sosmed & Reels",
        description: "Membuat desain aset visual modern instagram dan 3 video reels edukasi khasiat jamu.",
        status: "completed",
        date: "24 Feb 2026",
        feedback: "Visualisasi aset video sangat menarik dan ramah generasi Z. Pemilihan tone warna kemasan baru sangat fresh."
      },
      {
        title: "Milestone 3: Evaluasi Feedback Pelanggan",
        description: "Menganalisis tingkat jangkauan dan kepuasan audiens pasca penayangan kampanye digital.",
        status: "completed",
        date: "10 Mar 2026",
        feedback: "Peningkatan engagement rate melebihi target awal sebesar 15%. Luar biasa, laporan analitis yang solid!"
      }
    ]
  },
  {
    id: "comp_2",
    title: "Visualisasi Peta Distribusi UMKM Digital Semarang",
    category: "Sains Data",
    company: "Dinas Koperasi & UMKM Kota Semarang",
    mentorName: "Dr. Sarah Wijaya",
    mentorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBurGJwbpyH9NKMoPLOULbiO8niudCdI3yqfJYswPkv-ALUfLLdT1fYMPED86PuEsp0Q8NLNS-1GNxOyaDCP9mByDKjPY0PE1WH1uKP6nVAMlOBnji6YhONO_l-FLp976mwqcp-XR2zk0DKJD6OK2v6_SecAKyqc8Ee0LDoCnQJ1CnVJu8WCvn-wb0OgGpUT7qUfq1OSR32tWGXLprjzvmpK4XtPAeQknDgkP5zwY4uUVnogekqruPzkpBoBbmS1Nj9L-Lez1qx_gA",
    finishedAt: "28 April 2026",
    certificateId: "CERT-ISHAPE-2026-7734C",
    milestones: [
      {
        title: "Milestone 1: Pengumpulan Data Koordinat UMKM",
        description: "Melakukan geocoding lokasi UMKM binaan dinas di area Semarang Barat dan Timur.",
        status: "completed",
        date: "05 Apr 2026",
        feedback: "Dataset tersusun sangat rapi dan lengkap dengan koordinat latitude/longitude."
      },
      {
        title: "Milestone 2: Pembuatan Peta Interaktif Dashboard",
        description: "Mengembangkan peta visual menggunakan Leaflet.js dengan marker cluster.",
        status: "completed",
        date: "18 Apr 2026",
        feedback: "Fitur pencarian dan filter kategori UMKM bekerja responsif. Desain tooltip estetik."
      },
      {
        title: "Milestone 3: Penyusunan Laporan Peta Distribusi",
        description: "Membuat rekomendasi alokasi bantuan subsidi pemasaran berdasarkan analisis kepadatan industri.",
        status: "completed",
        date: "26 Apr 2026",
        feedback: "Analisis spasial yang akurat. Rekomendasi kebijakan sangat bernilai bagi kepala dinas."
      }
    ]
  }
];

import { CompletedProject } from "./types";

