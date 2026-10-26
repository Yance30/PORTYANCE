"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Award,
  BriefcaseBusiness,
  Check,
  Code2,
  CodeXml,
  House,
  Layers3,
  LockKeyhole,
  Mail,
  Menu,
  MoveUpRight,
  Sparkles,
  Trophy,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
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
    type: "Dashboard & Data Analytics",
    categories: ["Dashboard"],
    description: "Dashboard analitik ulasan produk Tokopedia 2019 dengan filter kategori, rating, sentimen, dan visualisasi interaktif.",
    year: "2026",
    visual: "tokopedia",
    label: "Business intelligence",
    stack: ["Python", "Streamlit", "Pandas", "Plotly"],
    github: "https://github.com/Yance30/Big-Data",
    previewTitle: "TOKOPEDIA ANALYTICS",
    previewHeading: "Product reviews",
    previewSubtitle: "Dataset 2019 · Interactive analysis",
  },
  {
    name: "Tandur",
    type: "Website Prototype",
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
    previewSubtitle: "Perangkat kerja untuk KSPPS / BMT",
  },
  {
    name: "JALA Fraud Analytics",
    type: "Dashboard & Data Analytics",
    categories: ["Dashboard"],
    description: "Dashboard analitik berbasis data sintetis untuk membantu memprioritaskan pemeriksaan klaim BPJS melalui fitur graf dan model deteksi.",
    year: "2026",
    visual: "jala",
    label: "Prototype analytics",
    stack: ["Python", "Streamlit", "NetworkX", "scikit-learn"],
    github: "https://github.com/Yance30/Jala",
    demo: "https://jala-fraud.streamlit.app/",
    previewTitle: "JALA / FRAUD ANALYTICS",
    previewHeading: "Claim review",
    previewSubtitle: "Risk signals · Synthetic data",
  },
  {
    name: "ExploreLocal",
    type: "Aplikasi Android",
    categories: ["Aplikasi"],
    description: "Aplikasi Android untuk menjelajahi UMKM lokal, melihat promosi dan lokasi, dengan alur autentikasi pengguna.",
    year: "2025",
    visual: "explore",
    label: "Mobile application",
    stack: ["Kotlin", "Jetpack Compose", "Supabase", "osmdroid"],
    github: "https://github.com/OraclePanjaitan/ExploreLocal",
    previewTitle: "EXPLORELOCAL / UMKM",
    previewHeading: "Local businesses",
    previewSubtitle: "Promos · Maps · Discover",
  },
  {
    name: "NyaperGO",
    type: "Website & Aplikasi",
    categories: ["Website", "Aplikasi"],
    description: "Aplikasi pemesanan makanan dengan katalog menu, pencarian, keranjang, akun, dan pengelolaan lokasi.",
    year: "2025",
    visual: "nyaper",
    label: "Food ordering",
    stack: ["Laravel", "PHP", "Blade", "Tailwind CSS"],
    github: "https://github.com/erlangga-create/projek_pemweb",
    loginPreview: "/login/nyapergo",
    previewTitle: "NYAPERGO / FOOD ORDERING",
    previewHeading: "Your favorite bites",
    previewSubtitle: "Menu · Cart · Delivery",
  },
];

type Project = (typeof projects)[number];

const filters = ["Semua", "Website", "Aplikasi", "Dashboard"] as const;
const navigation = [
  ["Beranda", "beranda"],
  ["Tentang", "tentang"],
  ["Karya", "karya"],
  ["Keahlian", "keahlian"],
  ["Pengalaman", "pengalaman"],
  ["Sertifikasi", "sertifikasi"],
  ["Prestasi", "prestasi"],
  ["Layanan", "layanan"],
  ["Kontak", "kontak"],
];
const navigationIcons = [
  House,
  UserRound,
  BriefcaseBusiness,
  CodeXml,
  UsersRound,
  Award,
  Trophy,
  Layers3,
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

const leadership = [
  {
    role: "Pengembangan Internal PIT",
    organization: "KBMDSI",
    period: "2026",
    initials: "KI",
  },
  {
    role: "Vice Coordinator",
    organization: "MMD Brawijaya",
    period: "Periode tidak dicantumkan",
    initials: "MB",
  },
  {
    role: "Head of Keamanan",
    organization: "Synergy of Symphony · KBMDSI",
    period: "2025",
    initials: "SS",
  },
  {
    role: "Head of Public Relationship",
    organization: "FORTERY · KBMDSI",
    period: "2025",
    initials: "FO",
  },
  {
    role: "Staff Pengembangan Sumber Daya Mahasiswa",
    organization: "KBMDSI",
    period: "2025",
    initials: "SD",
  },
];

const services = [
  {
    number: "01",
    icon: CodeXml,
    title: "Website Development",
    description: "Website responsif dengan struktur dan pengalaman pengguna yang jelas.",
  },
  {
    number: "02",
    icon: BriefcaseBusiness,
    title: "Dashboard Development",
    description: "Ringkasan informasi dan visualisasi data dalam dashboard.",
  },
  {
    number: "03",
    icon: Code2,
    title: "Application Development",
    description: "Pengembangan aplikasi sesuai kebutuhan dan alur pengguna.",
  },
  {
    number: "04",
    icon: Sparkles,
    title: "Data Analysis",
    description: "Mengolah dan menyajikan data agar lebih mudah dipahami.",
  },
  {
    number: "05",
    icon: Layers3,
    title: "UI/UX & Database Design",
    description: "Merancang antarmuka dan struktur data untuk produk digital.",
  },
  {
    number: "06",
    icon: UsersRound,
    title: "IT Consulting",
    description: "Diskusi awal untuk memetakan ide dan kebutuhan solusi teknologi.",
  },
];

const certificationAreas = [
  "Pemrograman",
  "Database",
  "Data Analytics",
  "Cloud Computing",
  "Project Management",
  "Cybersecurity",
  "Pelatihan & Kursus",
];

const achievementAreas = [
  "Kompetisi IT",
  "Akademik",
  "Organisasi",
  "Pencapaian Proyek",
  "Volunteer",
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
                DESIGN <i>×</i> DEVELOPMENT <i>×</i> IDEAS
              </motion.span>
              <motion.h2
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14, duration: 0.38, ease: "easeOut" }}
              >
                Halo, aku <span>Yance.</span>
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
              <span>CREATIVE DEVELOPER</span>
              <span>INDONESIA <i>—</i> 2026</span>
              <span>PILIH HALAMAN <ArrowDownRight size={13} /></span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main inert={introVisible}>
      <header className="site-header">
        <button className="wordmark" onClick={() => navigateToPage("beranda")} aria-label="Portyance, ke beranda">
          <span className="wordmark-icon">P<span>.</span></span>
          <span>PORTYANCE<small>INDEPENDENT PORTFOLIO</small></span>
        </button>
        <button className="header-cta" onClick={() => navigateToPage("kontak")}>Let&apos;s talk <ArrowUpRight size={15} /></button>
        <button
          className="menu-toggle"
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
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
              <button
                key={page}
                className={activePage === page ? "is-current" : ""}
                aria-current={activePage === page ? "page" : undefined}
                onClick={() => navigateToPage(page)}
              >
                <span>0{index + 1}</span>{label}<ArrowUpRight size={18} />
              </button>
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
          <h1>Yance Adhy Nata<br />Panjaitan<span className="hero-role">Information Systems Student</span></h1>
          <p className="hero-description">
            Saya adalah mahasiswa Sistem Informasi yang tertarik pada pengembangan teknologi,
            analisis data, dan pengelolaan sistem informasi. Saya terus mengembangkan keterampilan
            melalui proyek dan pembelajaran untuk menciptakan solusi digital yang efektif dan bermanfaat.
          </p>
          <div className="hero-actions">
            <button className="button button-light" onClick={() => navigateToPage("karya")}>Explore My Projects <ArrowDownRight size={17} /></button>
            <button className="button button-outline" disabled title="Tambahkan file CV untuk mengaktifkan unduhan">Download CV <ArrowDownRight size={17} /></button>
            <button className="text-link" onClick={() => navigateToPage("kontak")}>Contact Me <ArrowUpRight size={16} /></button>
          </div>
          <div className="hero-meta">
            <span className="hero-focus-label">FOKUS UTAMA</span>
            <span>Web Development</span>
            <span>Application Development</span>
            <span>Data Analytics</span>
            <span>Information Systems</span>
            <span>IT Project Management</span>
          </div>
        </motion.div>

        <motion.div
          className="hero-art"
          aria-label="Foto portrait pemilik portfolio"
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.12 }}
        >
          <Image
            className="portrait-image"
            src="/yance-portrait.png"
            alt="Portrait pemilik portfolio"
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 900px) 45vw, 460px"
          />
          <div className="portrait-shade" />
          <div className="portrait-glint" aria-hidden="true" />
          <span className="portrait-index"><Asterisk size={13} /> PORTFOLIO / 2026</span>
          <span className="portrait-caption">DESIGN <i>×</i> DEVELOPMENT</span>
        </motion.div>
        <button className="scroll-cue" onClick={() => navigateToPage("karya")}><ArrowDownRight size={14} /> LIHAT KARYA</button>
      </section>

      <section className="intro-strip" aria-label="Ringkasan" hidden={activePage !== "beranda"}>
        <div className="section-wrap intro-inner">
          <div className="dashboard-stat"><strong>05</strong><span>PROYEK PORTOFOLIO</span></div>
          <div className="dashboard-stat"><strong>12</strong><span>BAHASA & TOOLS</span></div>
          <div className="dashboard-stat"><strong>05</strong><span>PENGALAMAN ORGANISASI</span></div>
          <div className="dashboard-stat"><strong>0</strong><span>SERTIFIKASI</span></div>
        </div>
      </section>

      <section className="work-section section-wrap portfolio-page" id="karya" hidden={activePage !== "karya"}>
        <Reveal className="section-heading">
          <>
            <div>
              <span className="eyebrow section-eyebrow">03 — SELECTED WORK</span>
              <h2>Karya pilihan<span className="muted-period">.</span></h2>
              <p className="section-lead">Lima proyek pilihan dari dashboard analitik hingga aplikasi dan prototipe web.</p>
            </div>
            <span className="work-count">2025 — 2026<br />05 PROJECTS</span>
          </>
        </Reveal>
        <div className="filter-row" role="group" aria-label="Filter kategori karya">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-chip${activeFilter === filter ? " is-active" : ""}`}
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}<span>{filter === "Semua" ? projects.length : projects.filter((project) => project.categories.includes(filter)).length}</span>
            </button>
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
                          Demo <ArrowUpRight size={12} />
                        </a>
                      )}
                      {"loginPreview" in project && project.loginPreview && (
                        <Link href={project.loginPreview} aria-label={`Lihat tampilan login ${project.name}`}>
                          <LockKeyhole size={13} /> Preview login <ArrowUpRight size={12} />
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
        <p className="sample-note"><Asterisk size={14} /> Ringkasan dibuat dari repositori yang ditinjau; demo hanya ditampilkan untuk proyek yang memiliki tautan demo.</p>
      </section>

      <section className="services-section portfolio-page" id="layanan" hidden={activePage !== "layanan"}>
        <div className="section-wrap">
          <Reveal className="section-heading services-heading">
            <>
              <div>
                <span className="eyebrow section-eyebrow">07 — AREA OF INTEREST</span>
                <h2>Area yang ingin<br /><span className="heading-outline">aku kembangkan.</span></h2>
              </div>
              <p className="services-intro">Bidang layanan yang ingin kujelajahi dan kembangkan melalui proyek-proyek digital.</p>
            </>
          </Reveal>
          <div className="service-list">
            {services.map(({ number, icon: Icon, title, description }, index) => (
              <motion.article
                className="service-row"
                key={number}
                initial={shouldReduceMotion ? false : { opacity: 0, x: -18 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
              >
                <span className="service-number">{number}</span>
                <span className="service-icon"><Icon size={20} strokeWidth={1.5} /></span>
                <div className="service-copy"><h3>{title}</h3><p>{description}</p></div>
                <ArrowUpRight className="service-arrow" size={20} />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="skills-section portfolio-page" id="keahlian" hidden={activePage !== "keahlian"}>
        <div className="section-wrap">
          <Reveal className="section-heading skills-heading">
            <>
              <div>
                <span className="eyebrow section-eyebrow">04 — MY TOOLKIT</span>
                <h2>Teknologi yang<br /><span className="heading-outline">aku gunakan.</span></h2>
              </div>
              <p className="skills-intro">Bahasa pemrograman, web dan mobile development, database, serta tools desain.</p>
            </>
          </Reveal>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <motion.article
                className="skill-card"
                key={skill.name}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16, scale: 0.97 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index % 4 * 0.055, ease: "easeOut" }}
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
                <span>Dashboard & Data Analytics</span>
                <span>Data Visualization</span>
                <span>Information Systems</span>
              </div>
            </div>
            <div>
              <span className="eyebrow section-eyebrow">SOFT SKILLS</span>
              <div className="skill-pills">
                <span>Komunikasi</span>
                <span>Kolaborasi</span>
                <span>Koordinasi tim</span>
                <span>Tanggung jawab</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="leadership-section portfolio-page" id="pengalaman" hidden={activePage !== "pengalaman"}>
        <div className="section-wrap">
          <Reveal className="section-heading leadership-heading">
            <>
              <div>
                <span className="eyebrow section-eyebrow">04 — LEADERSHIP & ORGANIZATIONS</span>
                <h2>Pengalaman<br /><span className="leadership-heading-muted">berorganisasi.</span></h2>
              </div>
              <p className="leadership-intro">Belajar memimpin, berkolaborasi, dan bertanggung jawab lewat pengalaman organisasi.</p>
            </>
          </Reveal>
          <div className="leadership-list">
            {leadership.map((item, index) => (
              <motion.article
                className="leadership-card"
                key={`${item.role}-${item.organization}`}
                initial={shouldReduceMotion ? false : { opacity: 0, x: -14 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.4, delay: index * 0.055, ease: "easeOut" }}
              >
                <span className="leadership-index">0{index + 1}</span>
                <span className="leadership-mark" aria-hidden="true">{item.initials}</span>
                <div className="leadership-copy">
                  <h3>{item.role}</h3>
                  <p>{item.organization}</p>
                  <span className={`leadership-period${item.period.length > 10 ? " period-long" : ""}`}>{item.period}</span>
                </div>
                <ArrowUpRight className="leadership-arrow" size={17} aria-hidden="true" />
              </motion.article>
            ))}
          </div>
          <p className="experience-note">Pengalaman yang ditampilkan saat ini berasal dari organisasi yang telah disebutkan. Detail magang, kepanitiaan, kompetisi, proyek tim, dan volunteer dapat ditambahkan jika tersedia.</p>
        </div>
      </section>

      <section className="about-section section-wrap portfolio-page" id="tentang" hidden={activePage !== "tentang"}>
        <div className="about-profile">
          <div className="about-stamp">
            <Image src="/yance-portrait.png" alt="Foto profil Yance" fill sizes="(max-width: 640px) 100vw, 36vw" />
            <span>YANCE<br />PORTFOLIO</span>
          </div>
          <Reveal className="about-content" delay={0.1}>
            <span className="eyebrow section-eyebrow">01 — ABOUT ME</span>
            <h2>Halo, aku Yance.</h2>
            <p>
              Mahasiswa yang tertarik mengembangkan aplikasi dan sistem digital yang
              bermanfaat. Aku senang belajar melalui eksplorasi teknologi, desain, dan
              kolaborasi dalam organisasi.
            </p>
            <div className="about-points">
              <span><Check size={15} /> Fokus: web dan aplikasi mobile</span>
              <span><Check size={15} /> Minat: data, UI/UX, dan sistem informasi</span>
              <span><Check size={15} /> Prinsip: komunikatif, kolaboratif, dan bertanggung jawab</span>
            </div>
          </Reveal>
        </div>
        <div className="about-facts">
          <article className="about-fact">
            <span className="eyebrow section-eyebrow">PENDIDIKAN</span>
            <h3>Mahasiswa Sistem Informasi</h3>
            <p>Menempuh pendidikan di bidang Sistem Informasi dengan mempelajari teknologi, proses bisnis, dan pengembangan sistem digital.</p>
          </article>
          <article className="about-fact">
            <span className="eyebrow section-eyebrow">FOKUS KARIER</span>
            <h3>Web & Application Development</h3>
            <p>Mengembangkan kemampuan dalam pembuatan website, aplikasi, database, dan analisis data untuk membangun solusi digital.</p>
          </article>
          <article className="about-fact">
            <span className="eyebrow section-eyebrow">TUJUAN</span>
            <h3>Berkembang di Bidang IT</h3>
            <p>Terus meningkatkan keterampilan teknis, mengembangkan proyek nyata, dan memperoleh pengalaman untuk berkontribusi dalam dunia teknologi informasi.</p>
          </article>
        </div>
      </section>

      <section className="records-section portfolio-page" id="sertifikasi" hidden={activePage !== "sertifikasi"}>
        <div className="section-wrap">
          <Reveal className="records-heading">
            <span className="eyebrow section-eyebrow">05 — CERTIFICATIONS</span>
            <h2>Sertifikasi & pelatihan.</h2>
            <p>Daftar sertifikat akan menampilkan penyelenggara, tanggal terbit, dan tautan verifikasi.</p>
          </Reveal>
          <div className="record-categories">
            {certificationAreas.map((area) => <span key={area}>{area}</span>)}
          </div>
          <div className="record-empty">
            <Award size={28} strokeWidth={1.3} />
            <h3>Belum ada sertifikat tercantum</h3>
            <p>Sertifikat dan kursus yang sudah diselesaikan akan ditampilkan di bagian ini beserta informasi verifikasinya.</p>
          </div>
        </div>
      </section>

      <section className="records-section portfolio-page" id="prestasi" hidden={activePage !== "prestasi"}>
        <div className="section-wrap">
          <Reveal className="records-heading">
            <span className="eyebrow section-eyebrow">06 — ACHIEVEMENTS</span>
            <h2>Pencapaian & prestasi.</h2>
            <p>Kompetisi, pencapaian akademik, dan kontribusi yang ingin ditonjolkan.</p>
          </Reveal>
          <div className="record-categories">
            {achievementAreas.map((area) => <span key={area}>{area}</span>)}
          </div>
          <div className="record-empty">
            <Trophy size={28} strokeWidth={1.3} />
            <h3>Belum ada prestasi yang ditambahkan</h3>
            <p>Prestasi akan ditampilkan setelah detail, tahun, dan bukti pendukung tersedia.</p>
          </div>
        </div>
      </section>

      <section className="contact-section section-wrap portfolio-page" id="kontak" hidden={activePage !== "kontak"}>
        <div className="contact-topline"><span className="eyebrow">09 — GET IN TOUCH</span><span>LET&apos;S START A CONVERSATION</span></div>
        <div className="contact-layout">
          <div className="contact-copy">
            <h2>Yuk, bikin sesuatu<br /><span>yang berarti.</span></h2>
            <p>Ceritakan sedikit tentang idemu. Formulir ini akan menyiapkan email di aplikasi email perangkatmu.</p>
            <div className="contact-links">
              <a href={`mailto:${contactEmail}`}><Mail size={15} /> {contactEmail}</a>
              <a href={contactLinks.linkedin} target="_blank" rel="noopener noreferrer"><BriefcaseBusiness size={15} /> LinkedIn <ArrowUpRight size={13} /></a>
              <a href={contactLinks.github} target="_blank" rel="noopener noreferrer"><Code2 size={15} /> GitHub <ArrowUpRight size={13} /></a>
            </div>
          </div>
          <form
            className="contact-form"
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
          </form>
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
              whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.04 }}
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
              <Icon size={16} strokeWidth={1.7} aria-hidden="true" />
              <span>{label}</span>
            </motion.button>
          );
        })}
      </nav>

      </main>
    </>
  );
}
