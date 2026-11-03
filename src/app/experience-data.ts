export type ExperienceImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Experience = {
  slug: string;
  role: string;
  organization: string;
  period: string;
  initials: string;
  description: string;
  images?: ExperienceImage[];
};

export const experiences: Experience[] = [
  {
    slug: "pengembangan-internal-pit",
    role: "Pengembangan Internal PIT",
    organization: "KBMDSI",
    period: "2026",
    initials: "KI",
    description:
      "Dokumentasi kegiatan pengembangan internal PIT di KBMDSI bersama rekan tim. Foto menunjukkan kebersamaan anggota PIT dalam kegiatan internal. Rincian agenda dan kontribusi spesifik belum dicantumkan.",
    images: [
      {
        src: "/pengembangan-internal-pit.png",
        alt: "Kegiatan pengembangan internal PIT bersama rekan tim",
        width: 1365,
        height: 768,
      },
      {
        src: "/pengembangan-internal-tim.png",
        alt: "Foto tim pengembangan internal di Fakultas Ilmu Komputer",
        width: 768,
        height: 1152,
      },
    ],
  },
  {
    slug: "wakil-koordinator-mmd",
    role: "Wakil Koordinator",
    organization: "MMD Brawijaya",
    period: "",
    initials: "MB",
    description:
      "Pengalaman sebagai Wakil Koordinator di MMD Brawijaya. Informasi mengenai kegiatan yang dikoordinasikan, periode, dan kontribusi spesifik belum dicantumkan.",
  },
  {
    slug: "ketua-divisi-keamanan",
    role: "Ketua Divisi Keamanan",
    organization: "Synergy of Symphony · KBMDSI",
    period: "2025",
    initials: "SS",
    description:
      "Dokumentasi kegiatan Synergy of Symphony bersama KBMDSI dalam peran Ketua Divisi Keamanan. Foto memperlihatkan keterlibatan pada kegiatan tersebut; rincian tugas dan hasil spesifik belum dicantumkan.",
    images: [
      {
        src: "/ketua-divisi-keamanan.png",
        alt: "Kegiatan Yance sebagai Ketua Divisi Keamanan",
        width: 768,
        height: 1152,
      },
      {
        src: "/ketua-divisi-keamanan-tim.png",
        alt: "Foto bersama tim Divisi Keamanan KBMDSI",
        width: 768,
        height: 1024,
      },
    ],
  },
  {
    slug: "kepala-hubungan-masyarakat-fortery",
    role: "Kepala Hubungan Masyarakat",
    organization: "FORTERY · KBMDSI",
    period: "2025",
    initials: "FO",
    description:
      "Pengalaman sebagai Kepala Hubungan Masyarakat di FORTERY, KBMDSI. Rincian kegiatan komunikasi, publikasi, dan kontribusi spesifik belum dicantumkan.",
  },
  {
    slug: "staff-pengembangan-sumber-daya-mahasiswa",
    role: "Staff Pengembangan Sumber Daya Mahasiswa",
    organization: "KBMDSI",
    period: "2025",
    initials: "SD",
    description:
      "Pengalaman sebagai Staff Pengembangan Sumber Daya Mahasiswa di KBMDSI. Rincian program kegiatan dan kontribusi spesifik belum dicantumkan.",
  },
];

export function getExperience(slug: string) {
  return experiences.find((experience) => experience.slug === slug);
}
