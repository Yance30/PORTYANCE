"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  BriefcaseBusiness,
  Check,
  Code2,
  House,
  Layers3,
  LockKeyhole,
  Mail,
  Menu,
  MoveUpRight,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import { experiences } from "./experience-data";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

const projects = [
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
  },
];

type Project = (typeof projects)[number];

const filters = ["Semua", "Website", "Aplikasi", "Dashboard"] as const;
const navigation = [
  ["Beranda", "beranda"],
  ["Proyek", "karya"],
  ["Tentang", "tentang"],
  ["Pengalaman", "pengalaman"],
  ["Kontak", "kontak"],
] as const;
const navigationIcons = [
  House,
  BriefcaseBusiness,
  UserRound,
  UsersRound,
  Mail,
];

const skills = [
  { name: "Flutter", mark: "F", group: "Mobile", style: "flutter" },
  { name: "Dart", mark: "D", group: "Bahasa", style: "dart" },
  { name: "Kotlin", mark: "K", group: "Bahasa", style: "kotlin" },
  { name: "Java", mark: "J", group: "Bahasa", style: "java" },
  { name: "C++", mark: "C++", group: "Bahasa", style: "cpp" },
  { name: "Python", mark: "Py", group: "Bahasa", style: "python" },
  { name: "JavaScript", mark: "JS", group: "Bahasa", style: "javascript" },
  { name: "TypeScript", mark: "TS", group: "Bahasa", style: "typescript" },
  { name: "React", mark: "⚛", group: "Web", style: "react" },
  { name: "Node.js", mark: "N", group: "Web", style: "node" },
  { name: "SQL", mark: "SQL", group: "Database", style: "sql" },
  { name: "Figma", mark: "F", group: "Design", style: "figma" },
];

const contactEmail = "yansgrouppansi@gmail.com";
const contactLinks = {
  github: "https://github.com/Yance30",
  linkedin: "https://www.linkedin.com/in/yanceadhynatapanjaitan/",
};

function ProjectVisual({ project }: { project: Project }) {
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

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.58, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function CursorEffects({
  introVisible,
  pageProgress,
}: {
  introVisible: boolean;
  pageProgress: number;
}) {
  const shouldReduceMotion = useReducedMotion();
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

function HeroArtwork({ shouldReduceMotion }: { shouldReduceMotion: boolean | null }) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(pointerX, { stiffness: 160, damping: 22, mass: 0.5 });
  const rotateY = useSpring(pointerY, { stiffness: 160, damping: 22, mass: 0.5 });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    pointerX.set((0.5 - y) * 12);
    pointerY.set((x - 0.5) * 14);
  };

  const resetTilt = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.div
      className="hero-art hero-art-3d"
      aria-label="Foto portrait pemilik portfolio"
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      style={shouldReduceMotion ? undefined : {
        rotateX,
        rotateY,
        transformPerspective: 1100,
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="hero-art-orbit hero-art-orbit-back" aria-hidden="true" />
      <div className="hero-art-orbit hero-art-orbit-front" aria-hidden="true" />
      <Image
        className="portrait-image"
        src="/yance-portrait.png"
        alt="Portrait pemilik portfolio"
        fill
        priority
        sizes="(max-width: 640px) 100vw, (max-width: 900px) 45vw, 460px"
        draggable={false}
      />
      <div className="portrait-shade" />
      <div className="portrait-glint" aria-hidden="true" />
      <div className="hero-float-card hero-float-code" aria-hidden="true">
        <span><i /> LIVE PREVIEW</span>
        <b>&lt;build /&gt;</b>
        <small>Ide jadi pengalaman digital</small>
      </div>
      <div className="hero-float-card hero-float-stack" aria-hidden="true">
        <span className="hero-stack-marks"><i>JS</i><i>Py</i><i>UI</i></span>
        <b>Digital maker</b>
        <small>Web · Data · Mobile</small>
      </div>
      <span className="portrait-index"><Asterisk size={13} /> PORTFOLIO / 2026</span>
      <span className="portrait-caption">DESIGN <i>×</i> DEVELOPMENT</span>
    </motion.div>
  );
}

export default function Home() {
  const [introVisible, setIntroVisible] = useState(true);
  const introSkipRef = useRef<HTMLButtonElement>(null);
  const [activePage, setActivePage] = useState("beranda");
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("Semua");
  const [menuOpen, setMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const activePageIndex = navigation.findIndex(([, page]) => page === activePage);
  const visibleProjects = projects.filter(
    (project) => activeFilter === "Semua" || project.categories.includes(activeFilter),
  );
  const pageProgress = (activePageIndex + 1) / navigation.length;

  const navigateToPage = (page: string) => {
    if (!navigation.some(([, id]) => id === page)) return;
    if (window.location.hash !== `#${page}`) {
      window.history.pushState(null, "", `#${page}`);
    }
    setActivePage(page);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
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
    const introDuration = shouldReduceMotion ? 200 : 700;
    const timeoutId = window.setTimeout(dismissIntro, introDuration);

    return () => window.clearTimeout(timeoutId);
  }, [dismissIntro, introVisible, shouldReduceMotion]);

  useEffect(() => {
    document.getElementById(activePage)?.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  }, [activePage, shouldReduceMotion]);

  useEffect(() => {
    const syncPageFromUrl = () => {
      const requestedPage = window.location.hash.slice(1);
      const page = navigation.some(([, id]) => id === requestedPage)
        ? requestedPage
        : "beranda";
      setActivePage(page);
      setMenuOpen(false);
    };

    syncPageFromUrl();
    window.addEventListener("hashchange", syncPageFromUrl);
    return () => window.removeEventListener("hashchange", syncPageFromUrl);
  }, []);

  return (
    <>
      <CursorEffects introVisible={introVisible} pageProgress={pageProgress} />
      <AnimatePresence>
        {introVisible && (
          <motion.div
            className="intro-screen"
            role={introVisible ? "dialog" : undefined}
            aria-modal={introVisible ? true : undefined}
            aria-label="Intro Portyance"
            aria-hidden={!introVisible}
            style={{ pointerEvents: introVisible ? "auto" : "none" }}
            initial={{ y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { y: "-100%" }}
            transition={{ duration: shouldReduceMotion ? 0.15 : 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="intro-grid" aria-hidden="true" />
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
                transition={{ delay: 0.14, duration: 0.38, ease: "easeOut" }}
              >
                Halo, saya <span>Yance.</span>
              </motion.h2>
              <motion.div
                className="intro-progress"
                initial={{ opacity: 0, scaleX: 0.65 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.14, duration: 0.25 }}
              >
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: shouldReduceMotion ? 0.1 : 0.48, delay: 0.18, ease: "easeInOut" }}
                />
              </motion.div>
              <motion.span
                className="intro-loading"
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.25 }}
              >
                MENYIAPKAN PORTOFOLIO
              </motion.span>
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

      <section className="hero section-wrap portfolio-page" id="beranda" hidden={activePage !== "beranda"}>
        <motion.div
          className="hero-copy"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <div className="eyebrow"><span className="status-dot" /> PORTFOLIO / INDONESIA</div>
          <h1>Yance Adhy Nata<br />Panjaitan<span className="hero-role">Mahasiswa Sistem Informasi · Pengembangan Web & Dashboard Analitik</span></h1>
          <p className="hero-description">
            Saya membangun aplikasi web dan dashboard analitik untuk mengubah kebutuhan bisnis menjadi solusi digital.
          </p>
          <div className="hero-actions">
            <button className="button button-light" onClick={() => navigateToPage("karya")}>Lihat proyek <ArrowDownRight size={17} /></button>
            <button className="text-link" onClick={() => navigateToPage("kontak")}>Hubungi saya <ArrowUpRight size={16} /></button>
          </div>
          <div className="hero-meta">
            <span className="hero-focus-label">FOKUS UTAMA</span>
            <span>Pengembangan web</span>
            <span>Aplikasi</span>
            <span>Dashboard & analitik data</span>
          </div>
        </motion.div>

        <HeroArtwork shouldReduceMotion={shouldReduceMotion} />
        <button className="scroll-cue" onClick={() => navigateToPage("karya")}><ArrowDownRight size={14} /> LIHAT KARYA</button>
      </section>

      <section className="intro-strip" aria-label="Ringkasan" hidden={activePage !== "beranda"}>
        <div className="section-wrap intro-inner">
          <div className="dashboard-stat"><strong>05</strong><span>PROYEK PORTOFOLIO</span></div>
          <div className="dashboard-stat"><strong>12</strong><span>BAHASA & TOOLS</span></div>
          <div className="dashboard-stat"><strong>05</strong><span>PENGALAMAN ORGANISASI</span></div>
        </div>
      </section>

      <section className="work-section section-wrap portfolio-page" id="karya" hidden={activePage !== "karya"}>
        <Reveal className="section-heading">
          <>
            <div>
              <span className="eyebrow section-eyebrow">02 / PROYEK PILIHAN</span>
              <h2>Karya pilihan<span className="muted-period">.</span></h2>
              <p className="section-lead">Lima proyek dari dashboard analitik, aplikasi, hingga prototipe web.</p>
            </div>
            <span className="work-count">2025 sampai 2026<br />05 PROYEK</span>
          </>
        </Reveal>
        <div className="filter-row" role="group" aria-label="Filter kategori karya">
          {filters.map((filter) => (
            <motion.button
              key={filter}
              className={`filter-chip${activeFilter === filter ? " is-active" : ""}`}
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
              transition={{ type: "spring", stiffness: 420, damping: 26 }}
            >
              {filter}<span>{filter === "Semua" ? projects.length : projects.filter((project) => project.categories.includes(filter)).length}</span>
            </motion.button>
          ))}
          <span className="filter-hint"><MoveUpRight size={13} /> Pilih kategori</span>
        </div>
        <motion.div layout className="project-grid">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.article
                className="project-card"
                key={project.name}
                layout
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={shouldReduceMotion ? undefined : { y: -5, rotate: index % 2 === 0 ? -0.35 : 0.35 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
                viewport={{ once: true, amount: 0.15 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
              >
                <div className="project-preview">
                  <ProjectVisual project={project} />
                  <span className="project-label">{project.label}</span>
                </div>
                <div className="project-info">
                  <div>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
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
                  </div>
                  <div className="project-meta"><span>{project.type}</span><span>{project.year}</span></div>
                </div>
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
      </section>

      <section className="leadership-section portfolio-page" id="pengalaman" hidden={activePage !== "pengalaman"}>
        <div className="section-wrap">
          <Reveal className="section-heading leadership-heading">
            <>
              <div>
                <span className="eyebrow section-eyebrow">04 / PENGALAMAN ORGANISASI</span>
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
            {experiences.map((item, index) => (
              <motion.article
                className={`leadership-card${item.images ? " leadership-card-featured" : ""}`}
                key={item.slug}
                initial={shouldReduceMotion ? false : { opacity: 0, x: -14 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                whileHover={shouldReduceMotion ? undefined : { y: -5, rotateX: 2 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.4, delay: index * 0.055, ease: "easeOut" }}
              >
                <Link
                  className={`leadership-card-link${item.images ? " leadership-card-featured" : ""}`}
                  href={`/pengalaman/${item.slug}`}
                  aria-label={`Lihat kegiatan ${item.role}`}
                >
                  <span className="leadership-index">0{index + 1}</span>
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
                          sizes="(max-width: 640px) 72px, 96px"
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
      </section>

      <section className="about-section section-wrap portfolio-page" id="tentang" hidden={activePage !== "tentang"}>
        <div className="about-profile">
          <div className="about-stamp">
            <Image src="/yance-portrait.png" alt="Foto profil Yance" fill sizes="(max-width: 640px) 100vw, 36vw" />
            <span>YANCE<br />PORTFOLIO</span>
          </div>
          <Reveal className="about-content" delay={0.1}>
            <span className="eyebrow section-eyebrow">03 / TENTANG SAYA</span>
            <h2>Halo, saya Yance.</h2>
            <p>
              Saya tertarik mengembangkan aplikasi dan sistem digital yang bermanfaat.
              Saya senang belajar melalui eksplorasi teknologi, desain, dan kolaborasi.
            </p>
            <div className="about-points">
              <span><Check size={15} /> Fokus: web dan aplikasi mobile</span>
              <span><Check size={15} /> Minat: data, UI/UX, dan sistem informasi</span>
              <span><Check size={15} /> Prinsip: komunikatif, kolaboratif, dan bertanggung jawab</span>
            </div>
          </Reveal>
        </div>
        <div className="about-facts">
          <motion.article
            className="about-fact"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            whileHover={shouldReduceMotion ? undefined : { x: 5, y: -4, rotateY: -3, rotateX: 2 }}
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
            whileHover={shouldReduceMotion ? undefined : { x: 5, y: -4, rotateY: -3, rotateX: 2 }}
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
            whileHover={shouldReduceMotion ? undefined : { x: 5, y: -4, rotateY: -3, rotateX: 2 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.35, delay: 0.16 }}
          >
            <span className="eyebrow section-eyebrow">TUJUAN</span>
            <h3>Berkembang di Bidang IT</h3>
            <p>Terus meningkatkan keterampilan teknis, mengembangkan proyek nyata, dan memperoleh pengalaman untuk berkontribusi dalam dunia teknologi informasi.</p>
          </motion.article>
        </div>
        <section className="about-skills" aria-labelledby="about-skills-title">
          <div className="about-skills-heading">
            <span className="eyebrow section-eyebrow">KEAHLIAN</span>
            <h3 id="about-skills-title">Teknologi yang saya gunakan</h3>
            <p>Bahasa pemrograman, pengembangan web dan mobile, basis data, serta perangkat desain.</p>
          </div>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <motion.article
                className="skill-card"
                key={skill.name}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                whileHover={shouldReduceMotion ? undefined : { y: -7, rotateX: 5, rotateY: -3 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ type: "spring", stiffness: 360, damping: 24, delay: shouldReduceMotion ? 0 : index * 0.025 }}
              >
                <span className={`skill-mark skill-mark-${skill.style}`} aria-hidden="true">{skill.mark}</span>
                <span className="skill-name">{skill.name}</span>
                <span className="skill-group">{skill.group}</span>
              </motion.article>
            ))}
          </div>
          <div className="skill-focus">
            <div>
              <span className="eyebrow section-eyebrow">FOKUS PENGEMBANGAN</span>
              <div className="skill-pills">
                <span>Dashboard & analitik data</span>
                <span>Visualisasi data</span>
                <span>Sistem informasi</span>
              </div>
            </div>
            <div>
              <span className="eyebrow section-eyebrow">KETERAMPILAN KOLABORASI</span>
              <div className="skill-pills">
                <span>Komunikasi</span>
                <span>Kolaborasi</span>
                <span>Koordinasi tim</span>
                <span>Tanggung jawab</span>
              </div>
            </div>
          </div>
        </section>
      </section>

      <section className="contact-section section-wrap portfolio-page" id="kontak" hidden={activePage !== "kontak"}>
        <div className="contact-topline"><span className="eyebrow">05 / KONTAK</span><span>MARI MULAI BERKOLABORASI</span></div>
        <div className="contact-layout">
          <motion.div
            className="contact-copy"
            initial={shouldReduceMotion ? false : { opacity: 0, x: -18 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            whileHover={shouldReduceMotion ? undefined : { rotateY: -2, z: 8 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
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
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.1 }}
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
        <div className="contact-bottom">
          <span>PORTYANCE · PORTFOLIO</span>
          <button onClick={() => navigateToPage("beranda")}>Kembali ke beranda <ArrowRight size={14} /></button>
        </div>
      </section>

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
