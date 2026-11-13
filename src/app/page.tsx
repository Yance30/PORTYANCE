"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Award,
  BriefcaseBusiness,
  ChartNoAxesColumnIncreasing,
  Check,
  Code2,
  Database,
  House,
  Layers3,
  LockKeyhole,
  Mail,
  Menu,
  MoveUpRight,
  PanelsTopLeft,
  Shapes,
  Smartphone,
  UserRound,
  UsersRound,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { experiences } from "./experience-data";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import * as THREE from "three";

const projects = [
  {
    name: "Kedai Rakdjat POS",
    type: "Aplikasi kasir & dashboard",
    categories: ["Website", "Aplikasi"],
    description: "POS local-first untuk kedai makan: transaksi tetap berjalan offline di tablet, sinkron ke cloud saat online, dengan dashboard omzet pemilik, layar dapur, QRIS, dan cetak struk Bluetooth.",
    year: "2026",
    visual: "kedai",
    label: "Aplikasi kasir",
    stack: ["React", "TypeScript", "Tailwind CSS", "Supabase", "Dexie"],
    github: "https://github.com/Yance30/kedai-rakdjat",
    previewTitle: "KEDAI RAKDJAT / POS",
    previewHeading: "Kasir kedai",
    previewSubtitle: "Offline-first · QRIS · Layar dapur",
    caseStudy: {
      challenge: "Kasir kedai harus tetap melayani saat internet putus, sementara pemilik perlu memantau omzet dan dapur dari perangkat terpisah.",
      approach: "Membangun PWA local-first dengan React, TypeScript, dan Dexie di tablet sebagai sumber data utama; sinkronisasi upsert ke Supabase mengisi dashboard owner dan KDS. Pembayaran QRIS statis dikonfirmasi manual, struk dicetak via Bluetooth ESC/POS.",
      outcome: "Alur dine-in lengkap (denah meja, pesanan terbuka, bill sementara), rekonsiliasi kas per pecahan uang saat tutup shift, serta grafik pemasukan 7 hari untuk penilaian kinerja.",
    },
  },
  {
    name: "Tokopedia Analytics",
    type: "Dashboard & analitik data",
    categories: ["Dashboard"],
    description: "Dashboard analitik ulasan produk Tokopedia 2019 dengan filter kategori, rating, sentimen, dan visualisasi interaktif.",
    year: "2026",
    visual: "tokopedia",
    label: "Dashboard analitik",
    stack: ["Python", "Streamlit", "Pandas", "Plotly"],
    github: "https://github.com/Yance30/Big-Data",
    previewTitle: "TOKOPEDIA ANALYTICS",
    previewHeading: "Ulasan produk",
    previewSubtitle: "Dataset 2019 · Analisis interaktif",
    caseStudy: {
      challenge: "Ulasan produk perlu ditinjau dari berbagai kategori, rating, dan sentimen agar polanya mudah dipahami.",
      approach: "Menyusun filter dan visualisasi interaktif menggunakan Python, Streamlit, Pandas, dan Plotly.",
      outcome: "Dashboard analitik yang memungkinkan pengunjung mengeksplorasi ulasan dengan filter dan visualisasi.",
    },
  },
  {
    name: "Tandur",
    type: "Prototipe website",
    categories: ["Website"],
    description: "Prototipe perangkat kerja akad salam untuk KSPPS/BMT; data bersifat ilustratif dan belum memakai backend atau autentikasi nyata.",
    year: "2026",
    visual: "tandur",
    label: "Prototipe web",
    stack: ["JavaScript", "HTML", "CSS", "Vercel"],
    github: "https://github.com/Yance30/Tandur",
    demo: "https://tandur-psi.vercel.app",
    loginPreview: "/login/tandur",
    previewTitle: "TANDUR / AKAD SALAM",
    previewHeading: "Tumbuh bersama",
    previewSubtitle: "Perangkat kerja KSPPS / BMT",
    caseStudy: {
      challenge: "Alur perangkat kerja akad salam untuk KSPPS/BMT perlu disajikan dalam antarmuka yang mudah dijelajahi.",
      approach: "Membuat prototipe antarmuka web. Data yang ditampilkan bersifat ilustratif; prototipe belum memakai backend atau autentikasi nyata.",
      outcome: "Prototipe alur kerja yang dapat ditinjau melalui demo dan pratinjau halaman masuk.",
    },
  },
  {
    name: "JALA Fraud Analytics",
    type: "Dashboard & analitik data",
    categories: ["Dashboard"],
    description: "Dashboard analitik berbasis data sintetis untuk membantu memprioritaskan pemeriksaan klaim BPJS melalui fitur graf dan model deteksi.",
    year: "2026",
    visual: "jala",
    label: "Prototipe analitik",
    stack: ["Python", "Streamlit", "NetworkX", "scikit-learn"],
    github: "https://github.com/Yance30/Jala",
    demo: "https://jala-fraud.streamlit.app/",
    previewTitle: "JALA / FRAUD ANALYTICS",
    previewHeading: "Tinjauan klaim",
    previewSubtitle: "Indikasi risiko · Data sintetis",
    caseStudy: {
      challenge: "Pemeriksaan klaim membutuhkan cara untuk membantu memprioritaskan kasus yang perlu ditinjau.",
      approach: "Membangun prototipe analitik dengan fitur graf dan model deteksi menggunakan data sintetis.",
      outcome: "Dashboard untuk mengeksplorasi indikasi risiko dan membantu prioritisasi pemeriksaan; data bukan data klaim nyata.",
    },
  },
  {
    name: "ExploreLocal",
    type: "Aplikasi Android",
    categories: ["Aplikasi"],
    description: "Aplikasi Android untuk menjelajahi UMKM lokal, melihat promosi dan lokasi, dengan alur autentikasi pengguna.",
    year: "2025",
    visual: "explore",
    label: "Aplikasi seluler",
    stack: ["Kotlin", "Jetpack Compose", "Supabase", "osmdroid"],
    github: "https://github.com/OraclePanjaitan/ExploreLocal",
    previewTitle: "EXPLORELOCAL / UMKM",
    previewHeading: "UMKM lokal",
    previewSubtitle: "Promosi · Peta · Jelajahi",
    caseStudy: {
      challenge: "Pengguna memerlukan cara untuk menemukan UMKM lokal, promosi, dan lokasi dalam satu aplikasi.",
      approach: "Mengembangkan aplikasi Android dengan Kotlin dan Jetpack Compose, serta integrasi Supabase dan osmdroid.",
      outcome: "Aplikasi untuk menjelajahi UMKM, melihat promosi dan lokasi, serta menggunakan alur autentikasi.",
    },
  },
  {
    name: "NyaperGO",
    type: "Website & Aplikasi",
    categories: ["Website", "Aplikasi"],
    description: "Aplikasi pemesanan makanan dengan katalog menu, pencarian, keranjang, akun, dan pengelolaan lokasi.",
    year: "2025",
    visual: "nyaper",
    label: "Pemesanan makanan",
    stack: ["Laravel", "PHP", "Blade", "Tailwind CSS"],
    github: "https://github.com/erlangga-create/projek_pemweb",
    loginPreview: "/login/nyapergo",
    previewTitle: "NYAPERGO / PESAN MAKANAN",
    previewHeading: "Menu favoritmu",
    previewSubtitle: "Menu · Cart · Delivery",
    caseStudy: {
      challenge: "Pemesanan makanan perlu menyatukan penelusuran menu, pencarian, keranjang, akun, dan lokasi.",
      approach: "Membangun pengalaman website dan aplikasi menggunakan Laravel, PHP, Blade, dan Tailwind CSS.",
      outcome: "Alur pemesanan yang mencakup katalog menu, pencarian, keranjang, akun, dan pengelolaan lokasi.",
    },
  },
];

type Project = (typeof projects)[number];

const projectScreens: Record<string, { src: string; title: string; source: string; note: string }[]> = {
  jala: [{ src: "/project-previews/jala-desktop.png", title: "Tinjauan klaim", source: "https://github.com/Yance30/Jala/blob/main/artifacts/ux-review-desktop.png", note: "Screenshot prototipe dari repositori JALA. Angka pada layar adalah data pengujian, bukan hasil operasional BPJS." }],
  tandur: [
    { src: "/project-previews/tandur-home.png", title: "Beranda", source: "https://github.com/Yance30/Tandur/blob/main/hasil-ui/01-P1-beranda.png", note: "Screenshot asli prototipe Tandur; data dan identitas di dalam demo bersifat contoh." },
    { src: "/project-previews/tandur-workspace.png", title: "Ruang kerja petugas", source: "https://github.com/Yance30/Tandur/blob/main/hasil-ui/21-F1-petugas-beranda.png", note: "Alur kerja petugas pada prototipe; nilai akad dan data lembaga pada layar adalah contoh." },
  ],
};

const biStories: Record<string, { question: string; metrics: string[]; data: string; insight: string; action: string; limit: string }> = {
  tokopedia: {
    question: "Kategori mana yang perlu ditinjau dari sisi pengalaman pelanggan?",
    metrics: ["Distribusi rating", "Volume ulasan", "Sentimen per kategori"],
    data: "Ulasan produk Tokopedia tahun 2019; analisis dibatasi pada cakupan dataset.",
    insight: "Bandingkan rating dengan volume ulasan sebelum menyimpulkan kualitas sebuah kategori.",
    action: "Gunakan filter kategori dan sentimen untuk memilih kelompok ulasan yang perlu dibaca lebih lanjut.",
    limit: "Data historis, bukan kondisi Tokopedia saat ini. Belum ada dampak bisnis terukur yang diklaim.",
  },
  jala: {
    question: "Klaim mana yang perlu diprioritaskan untuk pemeriksaan lebih lanjut?",
    metrics: ["Indikasi risiko", "Relasi antarklaim", "Prioritas pemeriksaan"],
    data: "Data klaim sintetis untuk mendemonstrasikan alur analitik; bukan data pasien atau klaim nyata.",
    insight: "Indikasi risiko adalah petunjuk untuk pemeriksaan, bukan bukti terjadinya fraud.",
    action: "Tinjau kasus yang ditandai beserta relasinya, lalu validasi konteks sebelum membuat keputusan.",
    limit: "Prototipe dengan data sintetis; hasil tidak membuktikan akurasi atau kesiapan penggunaan operasional.",
  },
};

const filters = ["Semua", "Website", "Aplikasi", "Dashboard"] as const;
const navigation = [
  ["Beranda", "beranda"],
  ["Proyek", "karya"],
  ["Pengalaman", "pengalaman"],
  ["Tentang", "tentang"],
  ["Kontak", "kontak"],
] as const;
const navigationIcons = [
  House,
  BriefcaseBusiness,
  UsersRound,
  UserRound,
  Mail,
];

const skills = [
  { name: "Python", group: "Bahasa" },
  { name: "SQL", group: "Database" },
  { name: "Power BI", group: "Dashboard" },
  { name: "JavaScript", group: "Bahasa" },
  { name: "TypeScript", group: "Bahasa" },
  { name: "React", group: "Web" },
  { name: "Node.js", group: "Web" },
  { name: "Flutter", group: "Mobile" },
  { name: "Dart", group: "Bahasa" },
  { name: "Kotlin", group: "Bahasa" },
  { name: "Java", group: "Bahasa" },
  { name: "C++", group: "Bahasa" },
  { name: "Figma", group: "Design" },
] as const;

const skillIcons = {
  Mobile: Smartphone,
  Bahasa: Code2,
  Web: PanelsTopLeft,
  Database,
  Design: Shapes,
  Dashboard: ChartNoAxesColumnIncreasing,
};

const contactEmail = "yansgrouppansi@gmail.com";
const contactLinks = {
  github: "https://github.com/Yance30",
  linkedin: "https://www.linkedin.com/in/yanceadhynatapanjaitan/",
};

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const getReducedMotionSnapshot = () => window.matchMedia(reducedMotionQuery).matches;
const getServerReducedMotionSnapshot = () => false;

function subscribeToReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia(reducedMotionQuery);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function useReducedMotionPreference() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  );
}

function updateCardSpotlight(event: React.PointerEvent<HTMLElement>) {
  if (event.pointerType !== "mouse") return;
  const bounds = event.currentTarget.getBoundingClientRect();
  const x = ((event.clientX - bounds.left) / bounds.width) * 100;
  const y = ((event.clientY - bounds.top) / bounds.height) * 100;
  event.currentTarget.style.setProperty("--spotlight-x", `${x}%`);
  event.currentTarget.style.setProperty("--spotlight-y", `${y}%`);
}

function ProjectVisual({ project }: { project: Project }) {
  const screen = projectScreens[project.visual]?.[0];
  if (screen) return <div className="project-screenshot"><Image src={screen.src} alt={`Screenshot ${project.name}: ${screen.title}`} fill sizes="(max-width: 640px) 100vw, 50vw" /></div>;
  return (
    <div className={`project-visual visual-${project.visual}`} aria-hidden="true">
      <div className="visual-top"><span>{project.previewTitle}</span></div>
      <div className="visual-main">
        <div className="visual-copy">
          <strong>{project.previewHeading}</strong>
          <span>{project.previewSubtitle}</span>
        </div>
        <div className="visual-art">
          <i /><i /><i /><i /><i />
        </div>
      </div>
      <div className="visual-bottom">{project.stack.slice(0, 3).join(" · ")}</div>
    </div>
  );
}

function ProjectCaseStudy({ project, shouldReduceMotion, onClose }: { project: Project; shouldReduceMotion: boolean; onClose: () => void }) {
  const [selectedScreen, setSelectedScreen] = useState(0);
  const screens = projectScreens[project.visual];
  const screen = screens?.[selectedScreen];
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      headingRef.current?.focus({ preventScroll: true });
      headingRef.current?.closest("article")?.scrollIntoView({ behavior: shouldReduceMotion ? "instant" : "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [shouldReduceMotion]);

  return <motion.section
    id={`project-focus-${projects.indexOf(project)}`}
    className="project-case-inline"
    initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    exit={{ opacity: 0, height: 0 }}
    transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
    aria-label={`Studi kasus ${project.name}`}
  >
    <div className="project-focus-heading">
      <div><span className="eyebrow">DI BALIK PROYEK</span><h3 ref={headingRef} tabIndex={-1}>Studi kasus {project.name}</h3></div>
      <button type="button" className="project-focus-close" onClick={onClose} aria-label={`Tutup studi kasus ${project.name}`}><X size={20} /></button>
    </div>
    {screen && <div className="project-gallery">
      {screens.length > 1 && <div className="project-gallery-tabs" role="group" aria-label="Pilih screenshot">
        {screens.map((item, index) => <button key={item.src} type="button" aria-pressed={index === selectedScreen} onClick={() => setSelectedScreen(index)}>{item.title}</button>)}
      </div>}
      <AnimatePresence mode="wait" initial={false}>
        <motion.a key={screen.src} href={screen.src} target="_blank" rel="noopener noreferrer" className="project-gallery-image"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
          aria-label={`Buka screenshot lengkap ${screen.title}`}>
          <Image src={screen.src} alt={`${project.name} — ${screen.title}`} fill sizes="(max-width: 640px) 100vw, 80vw" />
          <span>Buka gambar lengkap <ArrowUpRight size={14} /></span>
        </motion.a>
      </AnimatePresence>
      <p className="project-gallery-note">{screen.note} <a href={screen.source} target="_blank" rel="noopener noreferrer">Lihat sumber <ArrowUpRight size={12} /></a></p>
    </div>}
    <ProjectJourney project={project} shouldReduceMotion={shouldReduceMotion} />
    <div className="project-links">
      <a href={project.github} target="_blank" rel="noopener noreferrer"><Code2 size={14} /> Lihat kode <ArrowUpRight size={12} /></a>
      {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer">Buka demo <ArrowUpRight size={12} /></a>}
      <button type="button" className="project-focus-trigger" onClick={onClose}>Tutup studi kasus <X size={14} /></button>
    </div>
  </motion.section>;
}

function AnimatedSection({ children, className, id }: { children: React.ReactNode; className: string; id: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotionPreference();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });
  const drift = useTransform(progress, [0, 1], [30, -30]);
  const draw = useTransform(progress, [0, 0.3, 1], [0, 1, 1]);
  const glowOpacity = useTransform(progress, [0, 0.3, 0.75, 1], [0, 0.6, 0.45, 0]);
  return <section ref={sectionRef} className={`${className} animated-section`} id={id}>
    <div className={`section-motion-scene section-motion-${id}`} aria-hidden="true">
      <motion.div className="section-light-wash" style={reduced ? { opacity: 0.3 } : { y: drift, opacity: glowOpacity }} />
      {id !== "beranda" && <>
        <motion.span className="section-draw-line" style={{ scaleX: reduced ? 1 : draw }} />
        <motion.svg className="section-line-art" viewBox="0 0 500 320" style={reduced ? undefined : { y: drift }}>
          <motion.path d={id === "pengalaman" ? "M430 20H340V100H240V180H140V260H40" : id === "tentang" ? "M420 160C420 300 80 300 80 160S420 20 420 160M350 160C350 260 150 260 150 160S350 60 350 160" : id === "kontak" ? "M20 230C160 230 120 70 250 70S350 230 480 230M20 260C160 260 120 100 250 100S350 260 480 260" : "M40 240L180 100H330L460 230M40 270L180 130H330L460 260"}
            style={{ pathLength: reduced ? 1 : draw }} />
        </motion.svg>
      </>}
    </div>
    {children}
  </section>;
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotionPreference();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 32, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.75, delay: shouldReduceMotion ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ProjectJourney({
  project,
  shouldReduceMotion,
}: {
  project: Project;
  shouldReduceMotion: boolean;
}) {
  const [progress, setProgress] = useState(0);
  const steps = [
    { title: "Masalah bisnis", detail: project.caseStudy.challenge },
    ...(biStories[project.visual] ? [{ title: "Sumber & cakupan data", detail: biStories[project.visual].data }] : []),
    { title: "Proses analisis & implementasi", detail: project.caseStudy.approach },
    { title: "Hasil yang tersedia", detail: project.caseStudy.outcome },
    ...(biStories[project.visual] ? [
      { title: "Cara membaca insight", detail: biStories[project.visual].insight },
      { title: "Rekomendasi penggunaan", detail: biStories[project.visual].action },
      { title: "Batasan", detail: biStories[project.visual].limit },
    ] : []),
  ];

  const updateProgress = (event: React.UIEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    const scrollableDistance = element.scrollHeight - element.clientHeight;
    setProgress(scrollableDistance > 0 ? element.scrollTop / scrollableDistance : 1);
  };

  return (
    <div className="project-journey" onScroll={updateProgress}>
      <div
        className="project-journey-progress"
        role="progressbar"
        aria-label={`Progres studi kasus ${project.name}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
      >
        <span style={{ transform: `scaleY(${progress})` }} />
      </div>
      <ol className="project-journey-steps" aria-label="Tahapan studi kasus">
        {steps.map((step, index) => (
          <motion.li
            key={step.title}
            initial={shouldReduceMotion ? false : { opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.35, delay: shouldReduceMotion ? 0 : index * 0.12 }}
          >
            <span className="project-journey-index">0{index + 1}</span>
            <div>
              <h4>{step.title}</h4>
              <p>{step.detail}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

function CursorEffects({
  introVisible,
  pageProgress,
}: {
  introVisible: boolean;
  pageProgress: MotionValue<number>;
}) {
  const shouldReduceMotion = useReducedMotionPreference();
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const smoothX = useSpring(pointerX, { stiffness: 420, damping: 36, mass: 0.25 });
  const smoothY = useSpring(pointerY, { stiffness: 420, damping: 36, mass: 0.25 });
  const trailX = useSpring(pointerX, { stiffness: 125, damping: 24, mass: 0.45 });
  const trailY = useSpring(pointerY, { stiffness: 125, damping: 24, mass: 0.45 });
  const tailX = useSpring(pointerX, { stiffness: 72, damping: 20, mass: 0.55 });
  const tailY = useSpring(pointerY, { stiffness: 72, damping: 20, mass: 0.55 });
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const smoothProgress = useSpring(pageProgress, { stiffness: 120, damping: 30, mass: 0.35 });

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      setVisible(true);
    };
    const handlePointerOver = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const target = event.target;
      setInteractive(target instanceof Element && Boolean(
        target.closest("a, button, [role='button'], input, textarea, select, [data-cursor]"),
      ));
    };
    const handlePointerOut = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.relatedTarget === null) setVisible(false);
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse") document.body.classList.add("custom-cursor-pressed");
    };
    const handlePointerUp = () => document.body.classList.remove("custom-cursor-pressed");

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerover", handlePointerOver);
    window.addEventListener("pointerout", handlePointerOut);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.body.classList.remove("custom-cursor-active", "custom-cursor-pressed");
    };
  }, [pointerX, pointerY, shouldReduceMotion]);

  useEffect(() => {
    document.body.classList.toggle("custom-cursor-active", visible && !shouldReduceMotion);
  }, [shouldReduceMotion, visible]);

  return (
    <>
      <motion.div
        className={`scroll-progress${introVisible ? " scroll-progress-intro" : ""}`}
        style={{ scaleX: smoothProgress }}
        aria-hidden="true"
      />
      {!shouldReduceMotion && visible && (
        <>
          <motion.span
            className="custom-cursor-trail cursor-trail-back"
            style={{ left: tailX, top: tailY }}
            aria-hidden="true"
          />
          <motion.span
            className="custom-cursor-trail cursor-trail-front"
            style={{ left: trailX, top: trailY }}
            aria-hidden="true"
          />
          <motion.div
            className={`custom-cursor-aura${interactive ? " is-interactive" : ""}`}
            style={{ left: smoothX, top: smoothY }}
            animate={{ width: interactive ? 54 : 36, height: interactive ? 54 : 36, opacity: visible ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 360, damping: 25 }}
            aria-hidden="true"
          >
            <span className="cursor-aura-inner" />
            {interactive && <ArrowUpRight className="cursor-hover-icon" size={15} />}
          </motion.div>
          <motion.span
            className="custom-cursor-dot"
            style={{ left: pointerX, top: pointerY }}
            animate={{ scale: interactive ? 0.55 : 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
            aria-hidden="true"
          />
        </>
      )}
    </>
  );
}

const scenePalettes: Record<string, number> = {
  beranda: 0xe4ad85,
  karya: 0x9ac4b2,
  tentang: 0xc3a88d,
  pengalaman: 0xe3aa73,
  kontak: 0xabb3e7,
};

function PortfolioWorld({
  activePage,
  focusedProject,
  experienceProgress,
  shouldReduceMotion,
}: {
  activePage: string;
  focusedProject: number | null;
  experienceProgress: MotionValue<number>;
  shouldReduceMotion: boolean | null;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const paletteTarget = useRef(new THREE.Color(scenePalettes.beranda));
  const renderScene = useRef<(() => void) | null>(null);
  const wakeScene = useRef<(() => void) | null>(null);
  const sceneState = useRef({ activePage, focusedProject, experienceProgress: experienceProgress.get() });

  useEffect(() => {
    paletteTarget.current.setHex(scenePalettes[activePage] ?? scenePalettes.beranda);
    sceneState.current.activePage = activePage;
    renderScene.current?.();
    wakeScene.current?.();
  }, [activePage]);

  useEffect(() => {
    sceneState.current.focusedProject = focusedProject;
    renderScene.current?.();
    wakeScene.current?.();
  }, [focusedProject]);

  useEffect(() => {
    return experienceProgress.on("change", (value) => {
      sceneState.current.experienceProgress = value;
      wakeScene.current?.();
    });
  }, [experienceProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const mobile = window.matchMedia("(max-width: 640px)").matches;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: !mobile,
        powerPreference: "low-power",
      });
    } catch (error) {
      console.error("Unable to initialize the portfolio's 3D scene.", error);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.35));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80);
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, -2);
    const ambientLight = new THREE.AmbientLight(0xffe6d3, 0.72);
    scene.add(ambientLight);

    const portalLight = new THREE.PointLight(scenePalettes.beranda, 24, 10, 2);
    scene.add(portalLight);
    const stageSpacing = 12;
    const stageCenters = Object.fromEntries(
      navigation.map(([, page], index) => [page, index * stageSpacing]),
    ) as Record<string, number>;

    const studioFloor = new THREE.GridHelper(68, 68, 0x9a7158, 0x665d56);
    studioFloor.position.set(stageSpacing * 2, -3.1, -3);
    const floorMaterials = Array.isArray(studioFloor.material) ? studioFloor.material : [studioFloor.material];
    floorMaterials.forEach((material) => {
      material.transparent = true;
      material.opacity = 0.16;
      material.depthWrite = false;
    });
    scene.add(studioFloor);

    const studioWall = new THREE.Mesh(
      new THREE.PlaneGeometry(stageSpacing * 5.2, 14),
      new THREE.MeshBasicMaterial({
        color: 0x22201d,
        transparent: true,
        opacity: 0.16,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    );
    studioWall.position.set(stageSpacing * 2, 1.8, -8.5);
    scene.add(studioWall);

    const studioProps: THREE.Object3D[] = [];
    const studioMaterials: THREE.Material[] = [];
    const makeMaterial = (color: number, opacity = 0.24) => {
      const material = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.16,
        metalness: 0.68,
        roughness: 0.36,
        transparent: true,
        opacity,
        depthWrite: false,
      });
      studioMaterials.push(material);
      return material;
    };
    const addStageObject = (page: string, object: THREE.Object3D, x: number, y: number, z: number) => {
      const center = stageCenters[page] ?? 0;
      object.position.set(center + x, y, z);
      object.userData.stage = page;
      scene.add(object);
      studioProps.push(object);
      return object;
    };

    const desk = new THREE.Mesh(
      new THREE.BoxGeometry(5.2, 0.12, 1.9),
      makeMaterial(0x93745d, 0.18),
    );
    addStageObject("karya", desk, 0, -1.7, -3.4);
    const projectScreens = projects.map((project, index) => {
      const group = new THREE.Group();
      const frame = new THREE.Mesh(
        new THREE.BoxGeometry(1.48, 0.94, 0.08),
        makeMaterial(0xcab29b, 0.36),
      );
      const screen = new THREE.Mesh(
        new THREE.PlaneGeometry(1.33, 0.78),
        makeMaterial(index % 2 === 0 ? 0x789187 : 0x98745d, 0.35),
      );
      screen.position.z = 0.052;
      const chartBars = Array.from({ length: 4 }, (_, barIndex) => {
        const height = 0.12 + ((index + barIndex * 3) % 4) * 0.09;
        const bar = new THREE.Mesh(
          new THREE.BoxGeometry(0.1, height, 0.018),
          makeMaterial(barIndex % 2 ? 0xb5c4ba : 0xe4ad85, 0.56),
        );
        bar.position.set(-0.43 + barIndex * 0.16, -0.2 + height / 2, 0.074);
        bar.scale.y = 0.04;
        group.add(bar);
        return bar;
      });
      group.add(frame, screen);
      const targetX = (index - 2) * 1.55;
      const targetY = -0.3 + (index % 2) * 0.4;
      addStageObject("karya", group, targetX + (index % 2 ? -0.7 : 0.7), targetY - 0.9, -4.1);
      return { group, chartBars, targetX, targetY, index };
    });

    const aboutFrames = [-1.25, 0, 1.25].map((x, index) => {
      const frame = new THREE.Mesh(
        new THREE.BoxGeometry(0.82, 1.5 + (index % 2) * 0.36, 0.08),
        makeMaterial(index === 1 ? 0xc3a88d : 0x8c8173, 0.26),
      );
      addStageObject("tentang", frame, x, 0.1, -4.8);
      return frame;
    });

    const timelineGroup = new THREE.Group();
    const timelineBase = new THREE.Mesh(
      new THREE.BoxGeometry(5.2, 0.045, 0.045),
      makeMaterial(0xc9c1b6, 0.25),
    );
    timelineGroup.add(timelineBase);
    const timelineProgressMaterial = new THREE.MeshBasicMaterial({
      color: scenePalettes.pengalaman,
      transparent: true,
      opacity: 0.86,
      depthWrite: false,
    });
    studioMaterials.push(timelineProgressMaterial);
    const timelineProgress = new THREE.Mesh(
      new THREE.BoxGeometry(5.2, 0.075, 0.075),
      timelineProgressMaterial,
    );
    timelineProgress.position.x = -2.6;
    timelineProgress.geometry.translate(2.6, 0, 0);
    timelineGroup.add(timelineProgress);
    const timelineNodes = experiences.map((_, index) => {
      const node = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.11, 1),
        makeMaterial(0xe4ad85, 0.7),
      );
      node.position.x = (index / Math.max(experiences.length - 1, 1) - 0.5) * 4.7;
      timelineGroup.add(node);
      return node;
    });
    addStageObject("pengalaman", timelineGroup, 0, 0.2, -4.5);

    const contactFrame = new THREE.Group();
    const contactFrameMaterial = makeMaterial(0xabb3e7, 0.3);
    [-1.2, 1.2].forEach((x) => {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.1, 3.3, 0.12), contactFrameMaterial);
      post.position.set(x, 0.05, 0);
      contactFrame.add(post);
    });
    const contactLintel = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.12, 0.12), contactFrameMaterial);
    contactLintel.position.y = 1.68;
    contactFrame.add(contactLintel);
    const contactFloor = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 0.04, 1.8),
      makeMaterial(0xabb3e7, 0.2),
    );
    contactFloor.position.y = -1.62;
    contactFrame.add(contactFloor);
    addStageObject("kontak", contactFrame, 0, 0, -4.6);

    const portal = new THREE.Group();
    scene.add(portal);
    const portalRings: THREE.Mesh[] = [];
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: scenePalettes.beranda,
      transparent: true,
      opacity: 0.58,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const addPortalRing = (
      radius: number,
      tube: number,
      arc: number,
      startAngle: number,
      opacity: number,
    ) => {
      const material = ringMaterial.clone();
      material.opacity = opacity;
      const mesh = new THREE.Mesh(
        new THREE.TorusGeometry(radius, tube, 8, 160, arc),
        material,
      );
      mesh.rotation.set(Math.PI * 0.12, Math.PI * 0.1, startAngle);
      portal.add(mesh);
      portalRings.push(mesh);
      return mesh;
    };

    addPortalRing(1.78, 0.018, Math.PI * 2, 0, 0.48);
    addPortalRing(1.92, 0.009, Math.PI * 2, 0.7, 0.3);
    const arcA = addPortalRing(2.08, 0.026, Math.PI * 0.34, 0.4, 0.82);
    const arcB = addPortalRing(2.08, 0.021, Math.PI * 0.28, 3.1, 0.7);
    const arcC = addPortalRing(1.55, 0.012, Math.PI * 0.22, 4.8, 0.68);

    const portalMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(scenePalettes.beranda) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;
        uniform vec3 uColor;
        void main() {
          vec2 centered = vUv - 0.5;
          float radius = length(centered) * 2.0;
          float angle = atan(centered.y, centered.x);
          float ring = smoothstep(0.58, 0.7, radius) * (1.0 - smoothstep(0.84, 0.96, radius));
          float current = 0.5 + 0.5 * sin(angle * 13.0 - uTime * 1.7 + radius * 20.0);
          float filaments = pow(max(0.0, sin(angle * 23.0 + uTime * 2.4 - radius * 15.0)), 12.0);
          float center = (1.0 - smoothstep(0.08, 0.75, radius)) * 0.12;
          float alpha = ring * (0.18 + current * 0.26 + filaments * 0.42) + center;
          gl_FragColor = vec4(uColor * (0.55 + current * 0.7), alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const portalSurface = new THREE.Mesh(new THREE.CircleGeometry(1.68, 96), portalMaterial);
    portalSurface.position.z = -0.12;
    portal.add(portalSurface);

    const core = new THREE.Group();
    portal.add(core);
    const coreGeometry = new THREE.IcosahedronGeometry(0.62, 2);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x17110f,
      emissive: scenePalettes.beranda,
      emissiveIntensity: 1.6,
      metalness: 0.8,
      roughness: 0.24,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    core.add(coreMesh);

    const coreWire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.7, 1),
      new THREE.MeshBasicMaterial({
        color: scenePalettes.beranda,
        wireframe: true,
        transparent: true,
        opacity: 0.52,
        blending: THREE.AdditiveBlending,
      }),
    );
    core.add(coreWire);

    const coreHalo = new THREE.Mesh(
      new THREE.TorusGeometry(0.92, 0.012, 8, 100),
      new THREE.MeshBasicMaterial({
        color: scenePalettes.beranda,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
      }),
    );
    coreHalo.rotation.set(0.8, 0.35, 0);
    core.add(coreHalo);

    const crystalMaterial = new THREE.MeshStandardMaterial({
      color: 0xf0c6a9,
      emissive: scenePalettes.beranda,
      emissiveIntensity: 0.55,
      metalness: 0.7,
      roughness: 0.28,
      flatShading: true,
    });
    const crystals = Array.from({ length: mobile ? 4 : 7 }, (_, index) => {
      const crystal = new THREE.Mesh(
        new THREE.OctahedronGeometry(index % 2 ? 0.09 : 0.13, 0),
        crystalMaterial,
      );
      const angle = (index / (mobile ? 4 : 7)) * Math.PI * 2;
      const radius = 2.32 + (index % 2) * 0.22;
      crystal.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, (index % 3) * 0.28 - 0.3);
      crystal.userData.phase = index * 1.7;
      portal.add(crystal);
      return crystal;
    });

    const starsGeometry = new THREE.BufferGeometry();
    const starCount = mobile ? 110 : 260;
    const starPositions = new Float32Array(starCount * 3);
    const randomValue = (seed: number) => {
      const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
      return value - Math.floor(value);
    };
    const updateStarField = (width: number, height: number) => {
      const halfHeight = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * 12;
      const halfWidth = halfHeight * (width / height);
      for (let index = 0; index < starCount; index += 1) {
        const offset = index * 3;
        starPositions[offset] = (randomValue(index + 1) * 2 - 1) * (stageSpacing * 2 + halfWidth);
        starPositions[offset + 1] = (randomValue(index + 201) * 2 - 1) * halfHeight * 1.4;
        starPositions[offset + 2] = -18 + randomValue(index + 401) * 24;
      }
      starsGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    };
    const stars = new THREE.Points(
      starsGeometry,
      new THREE.PointsMaterial({
        color: scenePalettes.beranda,
        size: mobile ? 0.035 : 0.03,
        transparent: true,
        opacity: 0.72,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    scene.add(stars);

    const pointer = new THREE.Vector2();
    const targetCamera = new THREE.Vector2();
    const isReducedMotion = shouldReduceMotion === true;
    let elapsed = 0;
    let previousTime: number | null = null;
    let frameId = 0;
    let isVisible = false;
    let viewportWidth = 0;
    let viewportHeight = 0;
    let activeCameraX = 0;
    let activeCameraY = 0.1;
    let activeCameraZ = 10;
    let activeLookAtX = 0;
    let activeLookAtY = 0;
    let activeLookAtZ = -2;
    let lastInteraction = performance.now();
    const projectLookAtTarget = new THREE.Vector3();

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      viewportWidth = bounds.width;
      viewportHeight = bounds.height;
      renderer.setSize(bounds.width, bounds.height, false);
      camera.aspect = bounds.width / bounds.height;
      camera.updateProjectionMatrix();
      const compact = bounds.width < 640;
      portal.position.set(compact ? 0.35 : 2.45, 0.05, -2.7);
      portal.scale.setScalar(compact ? 0.82 : 1);
      portalLight.position.copy(portal.position);
      updateStarField(bounds.width, bounds.height);
      render();
    };

    const render = () => {
      if (!viewportWidth || !viewportHeight) return;
      const target = paletteTarget.current;
      const colorBlend = isReducedMotion ? 1 : 0.035;
      portalRings.forEach((ring) => {
        const material = ring.material as THREE.MeshBasicMaterial;
        material.color.lerp(target, colorBlend);
      });
      portalMaterial.uniforms.uTime.value = elapsed;
      (portalMaterial.uniforms.uColor.value as THREE.Color).lerp(target, colorBlend);
      coreMaterial.emissive.lerp(target, colorBlend);
      (coreWire.material as THREE.MeshBasicMaterial).color.lerp(target, colorBlend);
      (coreHalo.material as THREE.MeshBasicMaterial).color.lerp(target, colorBlend);
      crystalMaterial.emissive.lerp(target, colorBlend);
      (stars.material as THREE.PointsMaterial).color.lerp(target, colorBlend);
      portalLight.color.lerp(target, colorBlend);
      portal.rotation.y = Math.sin(elapsed * 0.24) * 0.12 + pointer.x * 0.08;
      portal.rotation.x = Math.cos(elapsed * 0.2) * 0.055 - pointer.y * 0.06;
      portal.rotation.z = Math.sin(elapsed * 0.12) * 0.035;
      arcA.rotation.z = elapsed * 0.22;
      arcB.rotation.z = -elapsed * 0.17;
      arcC.rotation.z = elapsed * 0.12;
      core.rotation.y = elapsed * 0.38;
      core.rotation.x = Math.sin(elapsed * 0.3) * 0.14;
      coreWire.rotation.y = -elapsed * 0.26;
      coreWire.rotation.x = elapsed * 0.17;
      coreHalo.rotation.z = elapsed * 0.2;
      crystals.forEach((crystal) => {
        crystal.rotation.x += 0.006;
        crystal.rotation.y += 0.009;
        crystal.position.y += Math.sin(elapsed * 1.4 + crystal.userData.phase) * 0.0007;
      });
      const positions = starsGeometry.getAttribute("position") as THREE.BufferAttribute;
      for (let index = 2; index < positions.array.length; index += 3) {
        positions.array[index] += 0.018;
        if (positions.array[index] > 6) positions.array[index] = -18;
      }
      positions.needsUpdate = true;
      stars.rotation.z = Math.sin(elapsed * 0.04) * 0.018;
      const current = sceneState.current;
      const stageX = stageCenters[current.activePage] ?? 0;
      const focus = current.activePage === "karya" && current.focusedProject !== null;
      const reducedMotionBlend = isReducedMotion ? 1 : 0.045;
      activeCameraX += (stageX - activeCameraX) * reducedMotionBlend;
      activeCameraY += ((current.activePage === "pengalaman" ? 0.3 : 0.1) - activeCameraY) * reducedMotionBlend;
      activeCameraZ += ((focus ? 8.7 : 10) - activeCameraZ) * reducedMotionBlend;
      activeLookAtX += (stageX - activeLookAtX) * reducedMotionBlend;
      activeLookAtY += ((focus ? 0.25 : 0) - activeLookAtY) * reducedMotionBlend;
      activeLookAtZ += ((focus ? -4.2 : -2) - activeLookAtZ) * reducedMotionBlend;
      const targetFov = focus ? 35 : 42;
      camera.fov += (targetFov - camera.fov) * reducedMotionBlend;
      camera.updateProjectionMatrix();
      targetCamera.set(isReducedMotion ? 0 : pointer.x * 0.28, isReducedMotion ? 0 : pointer.y * 0.18);
      camera.position.x += (activeCameraX + targetCamera.x - camera.position.x) * (isReducedMotion ? 1 : 0.045);
      camera.position.y += (activeCameraY + targetCamera.y - camera.position.y) * (isReducedMotion ? 1 : 0.045);
      camera.position.z += (activeCameraZ - camera.position.z) * reducedMotionBlend;
      projectLookAtTarget.set(activeLookAtX, activeLookAtY, activeLookAtZ);
      camera.lookAt(projectLookAtTarget);
      studioProps.forEach((object) => {
        const page = object.userData.stage as string | undefined;
        if (page) object.visible = page === current.activePage;
      });
      projectScreens.forEach(({ group, chartBars, targetX, targetY, index }) => {
        const selected = focus && current.focusedProject === index;
        const assembly = current.activePage === "karya" ? 1 : 0;
        const targetXPosition = targetX + (assembly ? 0 : (index % 2 ? -0.7 : 0.7));
        const targetYPosition = targetY + (selected ? 0.56 : 0) - (assembly ? 0 : 0.9);
        const assemblyBlend = isReducedMotion ? 1 : assembly ? 0.085 : 0.16;
        group.position.x += (stageCenters.karya + targetXPosition - group.position.x) * assemblyBlend;
        group.position.y += (targetYPosition - group.position.y) * assemblyBlend;
        group.rotation.y += ((selected ? -0.1 : 0) - group.rotation.y) * 0.12;
        group.scale.setScalar(selected ? 1.1 : 1);
        chartBars.forEach((bar) => {
          bar.scale.y += ((assembly ? 1 : 0.04) - bar.scale.y) * assemblyBlend;
        });
        group.children.forEach((part) => {
          if (part instanceof THREE.Mesh) {
            const material = part.material as THREE.MeshStandardMaterial;
            material.emissiveIntensity += ((selected ? 0.55 : 0.16) - material.emissiveIntensity) * 0.12;
          }
        });
      });
      aboutFrames.forEach((frame, index) => {
        frame.rotation.y = Math.sin(elapsed * 0.22 + index) * 0.06;
      });
      const timelineAmount = Math.max(0.02, current.experienceProgress);
      timelineProgress.scale.x = timelineAmount;
      timelineNodes.forEach((node, index) => {
        const progress = index / Math.max(timelineNodes.length - 1, 1);
        const material = node.material as THREE.MeshStandardMaterial;
        material.emissiveIntensity = progress <= current.experienceProgress ? 0.8 : 0.12;
        node.scale.setScalar(progress <= current.experienceProgress ? 1.25 : 0.8);
      });
      contactFrame.rotation.y = Math.sin(elapsed * 0.18) * 0.04;
      renderer.render(scene, camera);
    };
    renderScene.current = render;

    const animate = (time: number) => {
      if (previousTime !== null) elapsed += Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;
      render();
      if (time - lastInteraction > 12000) {
        frameId = 0;
        return;
      }
      if (!isReducedMotion && isVisible && document.visibilityState === "visible") {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    const startAnimation = () => {
      if (isReducedMotion || !isVisible || document.visibilityState !== "visible" || frameId) return;
      previousTime = null;
      lastInteraction = performance.now();
      frameId = window.requestAnimationFrame(animate);
    };

    const stopAnimation = () => {
      window.cancelAnimationFrame(frameId);
      frameId = 0;
      previousTime = null;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (isReducedMotion || event.pointerType !== "mouse") return;
      pointer.set((event.clientX / window.innerWidth - 0.5) * 2, (0.5 - event.clientY / window.innerHeight) * 2);
      lastInteraction = performance.now();
      startAnimation();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) startAnimation();
      else stopAnimation();
    });
    intersectionObserver.observe(canvas);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") startAnimation();
      else stopAnimation();
    };
    wakeScene.current = () => {
      lastInteraction = performance.now();
      startAnimation();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopAnimation();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      wakeScene.current = null;
      renderScene.current = null;
      const geometries = new Set<THREE.BufferGeometry>();
      const disposedMaterials = new Set<THREE.Material>();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          geometries.add(object.geometry);
          const objectMaterials = Array.isArray(object.material) ? object.material : [object.material];
          objectMaterials.forEach((material) => disposedMaterials.add(material));
        }
      });
      studioMaterials.forEach((material) => material.dispose());
      geometries.forEach((geometry) => geometry.dispose());
      disposedMaterials.forEach((material) => material.dispose());
      ringMaterial.dispose();
      renderer.dispose();
    };
  }, [shouldReduceMotion]);

  return <canvas className="portfolio-world-canvas" data-scene={activePage} ref={canvasRef} aria-hidden="true" />;
}

function HeroArtwork({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  const [paused, setPaused] = useState(false);
  const motionDisabled = shouldReduceMotion || paused;
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(pointerX, { stiffness: 160, damping: 22, mass: 0.5 });
  const rotateY = useSpring(pointerY, { stiffness: 160, damping: 22, mass: 0.5 });
  const portraitX = useTransform(rotateY, [-7, 7], [-12, 12]);
  const portraitY = useTransform(rotateX, [-6, 6], [10, -10]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (motionDisabled || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    pointerX.set((0.5 - y) * 10);
    pointerY.set((x - 0.5) * 12);
  };

  const resetTilt = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.div
      className="hero-art hero-art-3d hero-motion-art"
      data-motion={motionDisabled ? "paused" : "running"}
      aria-label="Foto portrait pemilik portfolio"
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        rotateX: motionDisabled ? 0 : rotateX,
        rotateY: motionDisabled ? 0 : rotateY,
        transformPerspective: 1100,
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="portrait-aurora" aria-hidden="true" />
      <svg className="portrait-orbits" viewBox="0 0 500 500" aria-hidden="true" focusable="false">
        <g className="portrait-orbit-path">
          <ellipse cx="250" cy="250" rx="224" ry="172" />
          <circle cx="26" cy="250" r="5" />
          <circle cx="474" cy="250" r="3" />
        </g>
        <g className="portrait-orbit-path portrait-orbit-reverse">
          <ellipse cx="250" cy="250" rx="188" ry="236" />
          <circle cx="250" cy="14" r="4" />
        </g>
      </svg>
      <motion.div
        className="hero-portrait-layer"
        style={{ x: motionDisabled ? 0 : portraitX, y: motionDisabled ? 0 : portraitY }}
      >
        <Image
          className="portrait-image"
          src="/yance-portrait.png"
          alt="Portrait pemilik portfolio"
          fill
          loading="eager"
          sizes="(max-width: 640px) 100vw, (max-width: 900px) 45vw, 460px"
          draggable={false}
        />
      </motion.div>
      <div className="portrait-shade" />
      <div className="portrait-glint" aria-hidden="true" />
      <span className="portrait-index"><Asterisk size={13} /> PORTFOLIO / 2026</span>
      {!shouldReduceMotion && <button className="portrait-motion-toggle" type="button" aria-pressed={paused}
        onClick={() => { resetTilt(); setPaused((value) => !value); }}>
        {paused ? "Putar animasi" : "Jeda animasi"}
      </button>}
    </motion.div>
  );
}

export default function Home() {
  const [introVisible, setIntroVisible] = useState(true);
  const introSkipRef = useRef<HTMLButtonElement>(null);
  const [activePage, setActivePage] = useState("beranda");
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("Semua");
  const [focusedProject, setFocusedProject] = useState<number | null>(null);
  const [expandedProject, setExpandedProject] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.3);
  const [musicError, setMusicError] = useState("");
  const shouldReduceMotion = useReducedMotionPreference();
  const pageProgress = useMotionValue(0);
  const experienceProgress = useMotionValue(0);
  const heroScrollOffset = useMotionValue(0);
  const scenePointerX = useMotionValue(0);
  const scenePointerY = useMotionValue(0);
  const sceneRotateX = useSpring(scenePointerY, { stiffness: 70, damping: 24, mass: 0.8 });
  const sceneRotateY = useSpring(scenePointerX, { stiffness: 70, damping: 24, mass: 0.8 });
  const musicRef = useRef<HTMLAudioElement>(null);
  const introPointerX = useMotionValue(0);
  const introPointerY = useMotionValue(0);
  const introRotateX = useSpring(introPointerY, { stiffness: 90, damping: 24 });
  const introRotateY = useSpring(introPointerX, { stiffness: 90, damping: 24 });
  const introGridX = useTransform(introRotateY, [-8, 8], [-15, 15]);
  const introGridY = useTransform(introRotateX, [-6, 6], [-12, 12]);
  const activePageIndex = navigation.findIndex(([, page]) => page === activePage);
  const visibleProjects = projects.filter(
    (project) => activeFilter === "Semua" || project.categories.includes(activeFilter),
  ).sort((a, b) => Number(b.categories.includes("Dashboard")) - Number(a.categories.includes("Dashboard")));
  const navigateToPage = (page: string) => {
    if (!navigation.some(([, id]) => id === page)) return;
    if (window.location.hash !== `#${page}`) {
      window.history.pushState(null, "", `#${page}`);
    }
    setActivePage(page);
    if (page !== "karya") setExpandedProject(null);
    setMenuOpen(false);
    document.getElementById(page)?.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const toggleMusic = async () => {
    const audio = musicRef.current;
    if (!audio) return;

    if (musicEnabled) {
      audio.pause();
      setMusicEnabled(false);
      return;
    }

    try {
      audio.volume = musicVolume;
      await audio.play();
      setMusicError("");
      setMusicEnabled(true);
    } catch (error) {
      console.error("Unable to play the selected music file.", error);
      setMusicError("Musik tidak dapat diputar. Coba lagi.");
      setMusicEnabled(false);
    }
  };

  const updateMusicVolume = (volume: number) => {
    setMusicVolume(volume);
    if (musicRef.current) musicRef.current.volume = volume;
  };

  useEffect(() => {
    if (!expandedProject) return;
    document.getElementById(`project-focus-${projects.indexOf(expandedProject)}`)?.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
      block: "nearest",
    });
  }, [expandedProject, shouldReduceMotion]);

  const handleIntroPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    introPointerX.set((x - 0.5) * 8);
    introPointerY.set((0.5 - y) * 6);
  };

  const resetIntroPointer = () => {
    introPointerX.set(0);
    introPointerY.set(0);
  };

  const handleScenePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    scenePointerX.set((x - 0.5) * 0.6);
    scenePointerY.set((0.5 - y) * 0.4);
  };

  const resetScenePointer = () => {
    scenePointerX.set(0);
    scenePointerY.set(0);
  };

  const dismissIntro = useCallback(() => {
    setIntroVisible(false);
    window.requestAnimationFrame(() => {
      document.querySelector<HTMLElement>(".wordmark")?.focus();
    });
  }, []);

  useEffect(() => {
    if (!introVisible) return;

    introSkipRef.current?.focus();
    const introDuration = shouldReduceMotion ? 200 : 4800;
    const timeoutId = window.setTimeout(dismissIntro, introDuration);

    return () => window.clearTimeout(timeoutId);
  }, [dismissIntro, introVisible, shouldReduceMotion]);

  useEffect(() => {
    let frame = 0;
    const updateDocumentScroll = () => {
      frame = 0;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      pageProgress.set(maxScroll > 0 ? window.scrollY / maxScroll : 0);

      const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 0;
      const activeLine = window.scrollY + headerHeight + window.innerHeight * 0.28;
      let nextPage: (typeof navigation)[number][1] = navigation[0][1];

      for (const [, page] of navigation) {
        const section = document.getElementById(page);
        if (section && section.getBoundingClientRect().top + window.scrollY <= activeLine) {
          nextPage = page;
        }
      }

      setActivePage((currentPage) => currentPage === nextPage ? currentPage : nextPage);
      if (nextPage !== "karya") setExpandedProject(null);

      const hero = document.getElementById("beranda");
      if (hero) heroScrollOffset.set(Math.min(Math.max(-hero.getBoundingClientRect().top, 0), 100));

      const experience = document.getElementById("pengalaman");
      if (experience) {
        const sectionTop = experience.getBoundingClientRect().top + window.scrollY;
        const progress = Math.min(Math.max((activeLine - sectionTop) / experience.offsetHeight, 0), 1);
        experience.style.setProperty("--experience-progress", String(progress));
        experienceProgress.set(progress);
      }
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateDocumentScroll);
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    updateDocumentScroll();
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [experienceProgress, heroScrollOffset, pageProgress]);

  useEffect(() => {
    const syncPageFromUrl = () => {
      const requestedPage = window.location.hash.slice(1);
      const page = navigation.some(([, id]) => id === requestedPage)
        ? requestedPage
        : "beranda";
      setActivePage(page);
      setMenuOpen(false);
      if (window.location.hash) {
        window.requestAnimationFrame(() => {
          document.getElementById(page)?.scrollIntoView({
            behavior: shouldReduceMotion ? "auto" : "smooth",
            block: "start",
          });
        });
      }
    };

    window.addEventListener("hashchange", syncPageFromUrl);
    window.addEventListener("popstate", syncPageFromUrl);
    syncPageFromUrl();
    return () => {
      window.removeEventListener("hashchange", syncPageFromUrl);
      window.removeEventListener("popstate", syncPageFromUrl);
    };
  }, [shouldReduceMotion]);

  return (
    <>
      <CursorEffects introVisible={introVisible} pageProgress={pageProgress} />
      <audio
        ref={musicRef}
        src="/silhouette.mp3"
        preload="none"
        loop
        onError={() => {
          setMusicError("File musik tidak dapat dimuat.");
          setMusicEnabled(false);
        }}
      />
      <PortfolioWorld
        activePage={activePage}
        focusedProject={focusedProject}
        experienceProgress={experienceProgress}
        shouldReduceMotion={shouldReduceMotion}
      />
      <AnimatePresence>
        {introVisible && (
          <motion.div
            className="intro-screen"
            role={introVisible ? "dialog" : undefined}
            aria-modal={introVisible ? true : undefined}
            aria-label="Intro Portyance"
            aria-hidden={!introVisible}
            style={{ pointerEvents: introVisible ? "auto" : "none" }}
            onPointerMove={handleIntroPointerMove}
            onPointerLeave={resetIntroPointer}
            initial={shouldReduceMotion ? false : { opacity: 1, scale: 1 }}
            exit={shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 1.08, rotateX: -8, y: "-8vh", filter: "blur(12px)" }}
            transition={{ duration: shouldReduceMotion ? 0.15 : 0.78, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div className="intro-grid" style={{ x: introGridX, y: introGridY }} aria-hidden="true" />
            <div className="intro-world" aria-hidden="true">
              <span className="intro-world-ring intro-world-ring-back" />
              <span className="intro-world-ring intro-world-ring-front" />
              <span className="intro-world-core" />
              <span className="intro-world-sweep" />
              <i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
            </div>
            <div className="intro-topline">
              <span>PORTYANCE <i>®</i></span>
              <span>INDEPENDENT DIGITAL PORTFOLIO</span>
              <button className="intro-skip" ref={introSkipRef} onClick={dismissIntro}>
                LEWATI <ArrowUpRight size={13} />
              </button>
            </div>

            <div className="intro-center">
              <motion.div
                className="intro-emblem"
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.7, rotate: -12 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                whileHover={shouldReduceMotion ? undefined : { rotateX: 12, rotateY: -14, z: 24 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={shouldReduceMotion ? undefined : {
                  rotateX: introRotateX,
                  rotateY: introRotateY,
                  transformPerspective: 1000,
                }}
              >
                <span className="intro-orbit intro-orbit-outer" />
                <span className="intro-orbit intro-orbit-inner" />
                <span className="intro-monogram">P<span>.</span></span>
                <Asterisk className="intro-spark" size={21} strokeWidth={1.2} />
              </motion.div>
              <motion.span
                className="intro-kicker"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.3 }}
              >
                DESAIN <i>×</i> PENGEMBANGAN <i>×</i> GAGASAN
              </motion.span>
              <motion.h2
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.55, ease: "easeOut" }}
              >
                Halo, saya <span>Yance.</span>
              </motion.h2>
              <motion.p
                className="intro-description"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.55, ease: "easeOut" }}
              >
                Selamat datang di ruang digital saya. Jelajahi karya, pengalaman, dan hal yang saya bangun.
              </motion.p>
              <motion.div
                className="intro-progress"
                initial={{ opacity: 0, scaleX: 0.65 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.75, duration: 0.4 }}
              >
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: shouldReduceMotion ? 0.1 : 3.7, delay: 0.9, ease: "easeInOut" }}
                />
              </motion.div>
              <motion.span
                className="intro-loading"
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.3 }}
              >
                MENYIAPKAN PENGALAMAN
              </motion.span>
              <motion.button
                className="intro-enter"
                onClick={dismissIntro}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7, duration: 0.4 }}
              >
                MASUK KE PORTOFOLIO <ArrowUpRight size={14} />
              </motion.button>
            </div>

            <div className="intro-bottomline">
              <span>PENGEMBANG DIGITAL</span>
              <span>INDONESIA · 2026</span>
              <span>PILIH HALAMAN <ArrowDownRight size={13} /></span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main inert={introVisible}>
      <header className="site-header">
        <motion.button
          className="wordmark"
          onClick={() => navigateToPage("beranda")}
          aria-label="Portyance, ke beranda"
          whileHover={shouldReduceMotion ? undefined : { x: 2 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
        >
          <span className="wordmark-icon">P<span>.</span></span>
          <span>PORTYANCE<small>PORTOFOLIO DIGITAL</small></span>
        </motion.button>
        <div className="header-page-context" aria-live="polite">
          <span className="header-page-count">0{activePageIndex + 1}<i>/</i>0{navigation.length}</span>
          <span className="header-page-divider" aria-hidden="true" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              className="header-page-label"
              key={activePage}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -5 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
            >
              {navigation[activePageIndex]?.[0] ?? "Beranda"}
            </motion.span>
          </AnimatePresence>
        </div>
        <motion.button
          className="header-cta"
          onClick={() => navigateToPage("kontak")}
          whileHover={shouldReduceMotion ? undefined : { y: -2 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
        >
          Hubungi saya <ArrowUpRight size={15} />
        </motion.button>
        <div className={`music-control${musicEnabled ? " is-enabled" : ""}`}>
          <motion.button
            className={`sound-toggle${musicEnabled ? " is-enabled" : ""}`}
            type="button"
            aria-label={musicEnabled ? "Matikan musik relaksasi" : "Nyalakan musik relaksasi"}
            aria-pressed={musicEnabled}
            title={musicEnabled ? "Musik relaksasi aktif" : "Musik relaksasi mati"}
            onClick={() => void toggleMusic()}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.9 }}
          >
            {musicEnabled ? <Volume2 size={17} /> : <VolumeX size={17} />}
            <span>Musik</span>
          </motion.button>
          {musicEnabled && (
            <div className="music-player">
              <span className="music-track-name">KANA-BOON · Silhouette</span>
              <label className="music-volume-control">
                <Volume2 size={15} />
                <span>Volume</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={musicVolume}
                  aria-label="Volume musik relaksasi"
                  onChange={(event) => updateMusicVolume(Number(event.currentTarget.value))}
                />
              </label>
            </div>
          )}
          {musicError && <span className="music-error" role="status">{musicError}</span>}
        </div>
        <motion.button
          className="menu-toggle"
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.9, rotate: menuOpen ? -8 : 8 }}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </motion.button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Navigasi mobile"
            initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
          >
            {navigation.map(([label, page], index) => (
              <motion.button
                key={page}
                className={activePage === page ? "is-current" : ""}
                aria-current={activePage === page ? "page" : undefined}
                onClick={() => navigateToPage(page)}
                initial={shouldReduceMotion ? false : { opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, x: 12 }}
                transition={{ duration: 0.2, delay: shouldReduceMotion ? 0 : index * 0.045 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              >
                <span>0{index + 1}</span>{label}
                <motion.span
                  aria-hidden="true"
                  whileHover={shouldReduceMotion ? undefined : { x: 3, y: -3 }}
                >
                  <ArrowUpRight size={18} />
                </motion.span>
              </motion.button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      <motion.div
        className="scene-transition"
        initial={shouldReduceMotion ? false : {
          opacity: 0,
          filter: "blur(4px)",
          scale: 0.97,
          rotateX: 3,
          rotateY: -5,
          x: 22,
          z: -80,
        }}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 1, rotateX: 0, rotateY: 0, x: 0, z: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.72, ease: [0.2, 0.8, 0.2, 1] }}
        style={{ transformPerspective: 1400 }}
      >
      <motion.div
        className="portfolio-scene"
        style={shouldReduceMotion ? undefined : {
          transformPerspective: 1400,
          rotateX: sceneRotateX,
          rotateY: sceneRotateY,
        }}
        onPointerMove={handleScenePointerMove}
        onPointerLeave={resetScenePointer}
      >
      <div className="scene-atmosphere" aria-hidden="true">
        <i /><i /><i /><i /><i /><i />
      </div>
      <AnimatedSection
        className="hero section-wrap portfolio-page"
        id="beranda"
      >
        <motion.div
          className="hero-copy"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
            <span className="eyebrow hero-bi-eyebrow">BUSINESS INTELLIGENCE · WEB DEVELOPMENT</span>
          <h1>
            <motion.span className="hero-name-line" initial={shouldReduceMotion ? false : { opacity: 0, y: 28, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.8, delay: 0.15 }}>Yance Adhy Nata</motion.span>
            <motion.span className="hero-name-line" initial={shouldReduceMotion ? false : { opacity: 0, y: 28, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.8, delay: 0.3 }}>Panjaitan</motion.span>
            <span className="hero-role">Mahasiswa Sistem Informasi · Business Intelligence & Pengembangan Web</span>
          </h1>
          <p className="hero-description">
            Saya merancang dashboard analitik dan aplikasi web yang membantu menjelaskan masalah, mengeksplorasi data, dan menyajikan informasi dengan lebih jelas.
          </p>
          <div className="hero-actions">
            <button className="button button-light" onClick={() => navigateToPage("karya")}>Lihat proyek <ArrowDownRight size={17} /></button>
            <button className="text-link" onClick={() => navigateToPage("kontak")}>Hubungi saya <ArrowUpRight size={16} /></button>
          </div>
          <div className="hero-meta">
            <span className="hero-focus-label">FOKUS UTAMA</span>
            <span>Dashboard & analitik data</span>
            <span>Pengembangan web</span>
            <span>Aplikasi</span>
          </div>
        </motion.div>

        <div className="hero-showcase">
          <HeroArtwork shouldReduceMotion={shouldReduceMotion} />
          <div className="showcase-caption"><span>DESIGN <i>×</i> DEVELOPMENT</span><span>DATA WITH PURPOSE</span></div>
        </div>
        <button className="scroll-cue" onClick={() => navigateToPage("karya")}><ArrowDownRight size={14} /> LIHAT KARYA</button>
      </AnimatedSection>

      <section className="intro-strip" aria-label="Ringkasan">
        <div className="section-wrap intro-inner">
          <div className="dashboard-stat"><strong>{String(projects.length).padStart(2, "0")}</strong><span>PROYEK</span></div>
          <div className="dashboard-stat"><strong>{String(skills.length).padStart(2, "0")}</strong><span>BAHASA & TOOLS</span></div>
          <div className="dashboard-stat"><strong>{String(experiences.length).padStart(2, "0")}</strong><span>PENGALAMAN ORGANISASI</span></div>
        </div>
      </section>

      <AnimatedSection className="work-section section-wrap portfolio-page" id="karya">
        <Reveal className="section-heading">
          <>
            <div>
              <span className="eyebrow section-eyebrow">02 / PROYEK PILIHAN</span>
              <h2>Karya pilihan<span className="muted-period">.</span></h2>
              <p className="section-lead">Dari pertanyaan bisnis ke eksplorasi data. Jelajahi dua proyek analitik unggulan, dilanjutkan aplikasi dan prototipe web.</p>
            </div>
            <span className="work-count">2025 sampai 2026<br />{String(projects.length).padStart(2, "0")} PROYEK</span>
          </>
        </Reveal>
        <div className="filter-row" role="group" aria-label="Filter kategori karya">
          {filters.map((filter) => (
            <motion.button
              key={filter}
              className={`filter-chip${activeFilter === filter ? " is-active" : ""}`}
              aria-pressed={activeFilter === filter}
              onClick={() => {
                setActiveFilter(filter);
                setExpandedProject(null);
              }}
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
              transition={{ type: "spring", stiffness: 420, damping: 26 }}
            >
              {filter}<span>{filter === "Semua" ? projects.length : projects.filter((project) => project.categories.includes(filter)).length}</span>
            </motion.button>
          ))}
          <span className="filter-hint"><MoveUpRight size={13} /> Pilih kategori</span>
        </div>
        <p className="project-filter-status" role="status" aria-live="polite">{visibleProjects.length} proyek ditampilkan · {activeFilter}</p>
        <motion.div layout={!shouldReduceMotion} className="project-grid">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project) => (
              <motion.article
                className={`project-card${biStories[project.visual] ? " project-card-bi" : ""}${projectScreens[project.visual] ? " project-card-with-screen" : ""}${expandedProject?.name === project.name ? " project-card-expanded" : ""}`}
                key={project.name}
                layout={!shouldReduceMotion}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={shouldReduceMotion || expandedProject?.name === project.name ? undefined : { y: -2 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.995 }}
                data-card-spotlight
                onPointerMove={updateCardSpotlight}
                viewport={{ once: true, amount: 0.15 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
                transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 28, layout: { duration: 0.4 }, opacity: { duration: 0.2 } }}
                style={shouldReduceMotion ? undefined : { transformPerspective: 1100 }}
                onPointerEnter={() => setFocusedProject(projects.indexOf(project))}
                onPointerLeave={() => setFocusedProject((current) => current === projects.indexOf(project) ? null : current)}
                onFocusCapture={() => setFocusedProject(projects.indexOf(project))}
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setFocusedProject((current) => current === projects.indexOf(project) ? null : current);
                  }
                }}
              >
                <div className="project-preview">
                  <ProjectVisual project={project} />
                  <span className="project-label">{project.label}</span>
                  <span className="preview-disclosure">{projectScreens[project.visual] ? "Screenshot proyek" : "Ilustrasi antarmuka"}</span>
                </div>
                <div className="project-info">
                  <div>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    {biStories[project.visual] && (
                      <div className="bi-project-summary">
                        <span className="bi-summary-label">PERTANYAAN ANALISIS</span>
                        <h4>{biStories[project.visual].question}</h4>
                        <div className="bi-metrics">{biStories[project.visual].metrics.map((metric) => <span key={metric}>{metric}</span>)}</div>
                        <details className="bi-insight-detail">
                          <summary>Panduan membaca analisis <ArrowUpRight size={14} /></summary>
                          <p>{biStories[project.visual].insight}</p>
                        </details>
                      </div>
                    )}
                    <div className="project-stack" aria-label={`Teknologi ${project.name}`}>
                      {project.stack.map((technology) => <span key={technology}>{technology}</span>)}
                    </div>
                    <div className="project-links">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`Buka repositori ${project.name} di GitHub`}>
                        <Code2 size={13} /> GitHub <ArrowUpRight size={12} />
                      </a>
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`Lihat demo ${project.name}`}>
                          Lihat demo <ArrowUpRight size={12} />
                        </a>
                      )}
                      {"loginPreview" in project && project.loginPreview && (
                        <Link href={project.loginPreview} aria-label={`Lihat tampilan login ${project.name}`}>
                          <LockKeyhole size={13} /> Pratinjau masuk <ArrowUpRight size={12} />
                        </Link>
                      )}
                    </div>
                    <button
                      className="project-focus-trigger"
                      id={`project-trigger-${project.visual}`}
                      type="button"
                      aria-expanded={expandedProject?.name === project.name}
                      aria-controls={`project-focus-${projects.indexOf(project)}`}
                      onClick={() => setExpandedProject((current) => current?.name === project.name ? null : project)}
                    >
                      {expandedProject?.name === project.name ? "Tutup studi kasus" : "Jelajahi studi kasus"}
                      <ArrowUpRight size={13} />
                    </button>
                  </div>
                  <div className="project-meta"><span>{project.type}</span><span>{project.year}</span></div>
                </div>
                <AnimatePresence initial={false}>
                  {expandedProject?.name === project.name && <ProjectCaseStudy key={project.visual} project={project} shouldReduceMotion={shouldReduceMotion} onClose={() => {
                    setExpandedProject(null);
                    document.getElementById(`project-trigger-${project.visual}`)?.focus({ preventScroll: true });
                  }} />}
                </AnimatePresence>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
        {visibleProjects.length === 0 && (
          <div className="project-empty" role="status">
            <Layers3 size={22} strokeWidth={1.4} />
            <p>Belum ada proyek pada kategori <strong>{activeFilter}</strong>.</p>
          </div>
        )}
        <p className="sample-note"><Asterisk size={14} /> Ringkasan disusun dari repositori yang ditinjau. Demo tersedia untuk proyek yang memiliki tautan demo.</p>
      </AnimatedSection>

      <AnimatedSection className="leadership-section portfolio-page" id="pengalaman">
        <div className="section-wrap">
          <Reveal className="section-heading leadership-heading">
            <>
              <div>
                <span className="eyebrow section-eyebrow">03 / PENGALAMAN ORGANISASI</span>
                <h2>Pengalaman<br /><span className="leadership-heading-muted">berorganisasi.</span></h2>
              </div>
              <div className="leadership-heading-aside">
                <p className="leadership-intro">Belajar memimpin, berkolaborasi, dan bertanggung jawab lewat pengalaman organisasi.</p>
                <span className="leadership-total">
                  <strong>{String(experiences.length).padStart(2, "0")}</strong> PENGALAMAN
                </span>
              </div>
            </>
          </Reveal>
          <div className="leadership-list">
            <span className="experience-timeline" aria-hidden="true" />
            {experiences.map((item, index) => (
              <motion.article
                className={`leadership-card${item.images ? " leadership-card-featured" : ""}`}
                key={item.slug}
                initial={shouldReduceMotion ? false : {
                  opacity: 0,
                  x: index % 2 === 0 ? -32 : 32,
                  y: 22,
                  scale: 0.96,
                }}
                whileInView={shouldReduceMotion ? undefined : {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                }}
                whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.995 }}
                data-card-spotlight
                onPointerMove={updateCardSpotlight}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ type: "spring", stiffness: 180, damping: 22, delay: index * 0.07 }}
                style={shouldReduceMotion ? undefined : { transformPerspective: 1100 }}
              >
                <Link
                  className={`leadership-card-link${item.images ? " leadership-card-featured" : ""}`}
                  href={`/pengalaman/${item.slug}`}
                  aria-label={`Lihat kegiatan ${item.role}`}
                >
                  <motion.span
                    className="leadership-index"
                    initial={shouldReduceMotion ? false : { scale: 0.7, opacity: 0.4 }}
                    whileInView={shouldReduceMotion ? undefined : { scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.18 }}
                    transition={{ type: "spring", stiffness: 340, damping: 20, delay: index * 0.07 + 0.1 }}
                  >
                    0{index + 1}
                  </motion.span>
                  {item.images ? (
                    <div className="leadership-photos">
                      {item.images.map((image) => (
                        <Image
                          key={image.src}
                          className="leadership-photo"
                          src={image.src}
                          alt={image.alt}
                          width={image.width}
                          height={image.height}
                          sizes="(max-width: 640px) 33px, 106px"
                          loading="lazy"
                        />
                      ))}
                    </div>
                  ) : (
                    <span className="leadership-mark" aria-hidden="true">{item.initials}</span>
                  )}
                  <div className="leadership-copy">
                    <h3>{item.role}</h3>
                    <p>{item.organization}</p>
                    {item.period && <span className={`leadership-period${item.period.length > 10 ? " period-long" : ""}`}>{item.period}</span>}
                  </div>
                  <ArrowUpRight className="leadership-arrow" size={17} aria-hidden="true" />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="about-section section-wrap portfolio-page" id="tentang">
        <div className="about-profile">
          <motion.div
            className="about-stamp"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.78, y: 22 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
          >
            <Image src="/yance-portrait.png" alt="Foto profil Yance" fill sizes="(max-width: 640px) 100vw, 36vw" />
            <span>YANCE<br />PORTFOLIO</span>
          </motion.div>
          <Reveal className="about-content" delay={0.1}>
              <span className="eyebrow section-eyebrow">04 / PROFIL</span>
            <h2>Halo, saya Yance.</h2>
            <p>
              Saya mahasiswa Sistem Informasi dengan minat pada Business Intelligence dan pengembangan produk digital. Saya menggabungkan analisis data, perancangan antarmuka, dan pengembangan aplikasi dalam proyek akademik maupun mandiri.
            </p>
            <div className="about-points">
              <span><Check size={15} /> Fokus: web dan aplikasi mobile</span>
              <span><Check size={15} /> Minat: data, UI/UX, dan sistem informasi</span>
              <span><Check size={15} /> Prinsip: komunikatif, kolaboratif, dan bertanggung jawab</span>
            </div>
          </Reveal>
        </div>
        <section className="achievement-feature" aria-labelledby="achievement-title">
          <div className="achievement-copy">
            <span className="eyebrow section-eyebrow"><Award size={15} /> PENCAPAIAN UNGGULAN</span>
            <h3 id="achievement-title">Juara 1 Business Plan tingkat nasional</h3>
            <p>Youth Economics Science Competition 2026 (YES-C 2026), diselenggarakan Himpunan Mahasiswa Departemen Ilmu Ekonomi, Fakultas Ekonomi dan Bisnis, Universitas Negeri Padang.</p>
            <span className="achievement-meta">3–8 November 2026 <i aria-hidden="true">·</i> Tingkat nasional</span>
            <a href="/sertifikat-yes-c-2026.jpg" target="_blank" rel="noopener noreferrer" className="achievement-link">Lihat sertifikat <ArrowUpRight size={15} /></a>
          </div>
          <a className="achievement-image-link" href="/sertifikat-yes-c-2026.jpg" target="_blank" rel="noopener noreferrer" aria-label="Buka sertifikat YES-C 2026 ukuran penuh">
            <Image src="/sertifikat-yes-c-2026.jpg" alt="Sertifikat Juara 1 Lomba Business Plan tingkat nasional pada Youth Economics Science Competition 2026" width={1755} height={1241} sizes="(max-width: 760px) 100vw, 42vw" />
          </a>
        </section>
        <div className="about-facts">
          <motion.article
            className="about-fact"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.995 }}
            data-card-spotlight
            onPointerMove={updateCardSpotlight}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.35 }}
          >
            <span className="eyebrow section-eyebrow">PENDIDIKAN</span>
            <h3>Mahasiswa Sistem Informasi</h3>
            <p>Menempuh pendidikan di bidang Sistem Informasi dengan mempelajari teknologi, proses bisnis, dan pengembangan sistem digital.</p>
          </motion.article>
          <motion.article
            className="about-fact"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.995 }}
            data-card-spotlight
            onPointerMove={updateCardSpotlight}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.35, delay: 0.08 }}
          >
            <span className="eyebrow section-eyebrow">FOKUS KARIER</span>
            <h3>Pengembangan web & aplikasi</h3>
            <p>Mengembangkan kemampuan dalam pembuatan website, aplikasi, database, dan analisis data untuk membangun solusi digital.</p>
          </motion.article>
          <motion.article
            className="about-fact"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.995 }}
            data-card-spotlight
            onPointerMove={updateCardSpotlight}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.35, delay: 0.16 }}
          >
            <span className="eyebrow section-eyebrow">TUJUAN</span>
            <h3>Berkembang di Bidang IT</h3>
            <p>Terus meningkatkan keterampilan teknis, mengembangkan proyek nyata, dan memperoleh pengalaman untuk berkontribusi dalam dunia teknologi informasi.</p>
          </motion.article>
        </div>
        <section className="about-skills" aria-labelledby="about-skills-title">
          <motion.div
            className="about-skills-heading"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow section-eyebrow">KEAHLIAN</span>
            <h3 id="about-skills-title">Teknologi yang saya gunakan</h3>
            <p>Teknologi pengembangan aplikasi, analitik data, dan desain antarmuka.</p>
          </motion.div>
          <div className="skills-grid">
            {skills.map((skill, index) => {
              const SkillIcon = skillIcons[skill.group];
              return (
                <motion.article
                className="skill-card"
                key={skill.name}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
                data-card-spotlight
                onPointerMove={updateCardSpotlight}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ type: "spring", stiffness: 360, damping: 24, delay: shouldReduceMotion ? 0 : index * 0.025 }}
              >
                <span className="skill-mark" aria-hidden="true"><SkillIcon size={20} strokeWidth={1.7} /></span>
                <span className="skill-name">{skill.name}</span>
                <span className="skill-group">{skill.group}</span>
                </motion.article>
              );
            })}
          </div>
          <div className="skill-focus">
            <div>
              <span className="eyebrow section-eyebrow">FOKUS PENGEMBANGAN</span>
              <div className="skill-pills">
                <motion.span whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.04 }}>Dashboard & analitik data</motion.span>
                <motion.span whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.04 }}>Visualisasi data</motion.span>
                <motion.span whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.04 }}>Sistem informasi</motion.span>
              </div>
            </div>
            <div>
              <span className="eyebrow section-eyebrow">KETERAMPILAN KOLABORASI</span>
              <div className="skill-pills">
                <motion.span whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.04 }}>Komunikasi</motion.span>
                <motion.span whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.04 }}>Kolaborasi</motion.span>
                <motion.span whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.04 }}>Koordinasi tim</motion.span>
                <motion.span whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.04 }}>Tanggung jawab</motion.span>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection className="contact-section section-wrap portfolio-page" id="kontak">
        <motion.div
          className="contact-topline"
          initial={shouldReduceMotion ? false : { opacity: 0, y: -14 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.08 }}
        >
          <span className="eyebrow">05 / KONTAK</span><span>MARI MULAI BERKOLABORASI</span>
        </motion.div>
        <div className="contact-layout">
          <motion.div
            className="contact-copy"
            initial={shouldReduceMotion ? false : { opacity: 0, x: -18 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.16 }}
          >
            <h2>Mari buat sesuatu<br /><span>yang berarti.</span></h2>
            <p>Ceritakan tentang kebutuhan atau idemu. Formulir ini akan menyiapkan email di aplikasi email perangkatmu.</p>
            <div className="contact-links">
              <motion.a href={`mailto:${contactEmail}`} whileHover={shouldReduceMotion ? undefined : { x: 5 }}>
                <Mail size={15} /> {contactEmail}
              </motion.a>
              <motion.a href={contactLinks.linkedin} target="_blank" rel="noopener noreferrer" whileHover={shouldReduceMotion ? undefined : { x: 5 }}>
                <BriefcaseBusiness size={15} /> LinkedIn <ArrowUpRight size={13} />
              </motion.a>
              <motion.a href={contactLinks.github} target="_blank" rel="noopener noreferrer" whileHover={shouldReduceMotion ? undefined : { x: 5 }}>
                <Code2 size={15} /> GitHub <ArrowUpRight size={13} />
              </motion.a>
            </div>
          </motion.div>
          <motion.form
            className="contact-form"
            initial={shouldReduceMotion ? false : { opacity: 0, x: 18 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            whileHover={shouldReduceMotion ? undefined : { rotateY: 2, rotateX: -1, z: 12 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.995, rotateX: -1 }}
            data-card-spotlight
            onPointerMove={updateCardSpotlight}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.28 }}
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const subject = `Pesan portofolio dari ${String(formData.get("name"))}`;
              const body = [
                `Nama: ${String(formData.get("name"))}`,
                `Email: ${String(formData.get("email"))}`,
                "",
                String(formData.get("message")),
              ].join("\n");
              window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            }}
          >
            <label>Nama<input name="name" autoComplete="name" required /></label>
            <label>Email<input name="email" type="email" autoComplete="email" required /></label>
            <label>Pesan<textarea name="message" rows={3} required /></label>
            <button className="button button-light" type="submit">Siapkan email <ArrowUpRight size={17} /></button>
            <p className="contact-note">Nama, email, dan pesan dapat diisi langsung. Tombol akan membuka aplikasi email dengan detail pesan yang sudah disiapkan.</p>
          </motion.form>
        </div>
        <motion.div
          className="contact-bottom"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.4 }}
        >
          <span>PORTYANCE · PORTFOLIO</span>
          <button onClick={() => navigateToPage("beranda")}>Kembali ke beranda <ArrowRight size={14} /></button>
        </motion.div>
      </AnimatedSection>
      </motion.div>
      </motion.div>

      <nav className="page-controls" aria-label="Navigasi halaman">
        {navigation.map(([label, page], index) => {
          const Icon = navigationIcons[index];
          const isCurrent = activePage === page;

          return (
            <motion.button
              key={page}
              className={`page-nav-button${isCurrent ? " is-current" : ""}`}
              aria-current={isCurrent ? "page" : undefined}
              title={`Buka halaman ${label}`}
              onClick={() => navigateToPage(page)}
              whileHover={shouldReduceMotion ? undefined : { y: -5, scale: 1.04, rotateX: 7, rotateY: index % 2 === 0 ? -4 : 4, z: 12 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
              transition={{ type: "spring", stiffness: 420, damping: 25 }}
            >
              {isCurrent && (
                <motion.span
                  className="page-nav-active"
                  layoutId="page-nav-active"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  aria-hidden="true"
                />
              )}
              <motion.span
                className="page-nav-icon"
                whileHover={shouldReduceMotion ? undefined : { rotate: -8, scale: 1.12 }}
                transition={{ type: "spring", stiffness: 420, damping: 18 }}
              >
                <Icon size={16} strokeWidth={1.7} aria-hidden="true" />
              </motion.span>
              <span>{label}</span>
            </motion.button>
          );
        })}
      </nav>

      </main>
    </>
  );
}
