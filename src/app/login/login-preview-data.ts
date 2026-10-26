export const loginPreviewData = {
  tandur: {
    name: "Tandur",
    theme: "tandur",
    eyebrow: "RUANG KERJA AKAD SALAM",
    headline: "Tumbuh bersama, dengan akad yang terjaga.",
    description: "Perangkat kerja untuk membantu lembaga mengelola proses akad salam dengan lebih terstruktur.",
    formTitle: "Selamat datang kembali",
    formDescription: "Masuk ke ruang kerja lembaga Anda.",
    emailLabel: "Email atau nomor telepon",
    passwordLabel: "Kata sandi",
    submitLabel: "Masuk ke ruang kerja",
  },
  nyapergo: {
    name: "NyaperGO",
    theme: "nyapergo",
    eyebrow: "PESAN MAKANAN FAVORITMU",
    headline: "Nikmatnya tinggal selangkah lagi.",
    description: "Masuk untuk melihat menu dan melanjutkan pesananmu.",
    formTitle: "Selamat datang di NyaperGO",
    formDescription: "Masuk ke akunmu untuk mulai memesan.",
    emailLabel: "Email",
    passwordLabel: "Password",
    submitLabel: "Masuk",
  },
} as const;

export type LoginPreviewSlug = keyof typeof loginPreviewData;

export function isLoginPreviewSlug(slug: string): slug is LoginPreviewSlug {
  return Object.hasOwn(loginPreviewData, slug);
}
