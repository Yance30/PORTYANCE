"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Leaf, LockKeyhole, ShoppingBasket } from "lucide-react";
import { loginPreviewData, type LoginPreviewSlug } from "../login-preview-data";

const tandurRoles = ["Petugas", "Manajer", "DPS", "Admin"] as const;

export default function LoginPreview({ project }: { project: LoginPreviewSlug }) {
  const content = loginPreviewData[project];
  const [activeRole, setActiveRole] = useState<(typeof tandurRoles)[number]>("Manajer");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(`Ini hanya preview visual ${content.name}; login belum terhubung dan tidak ada data yang dikirim.`);
  }

  return (
    <main className={`login-preview-page login-preview-${content.theme}`}>
      <div className="login-preview-shell">
        <section className="login-preview-story" aria-label={`Tentang ${content.name}`}>
          <Link className="login-preview-back" href="/">
            <ArrowLeft size={16} /> Kembali ke portofolio
          </Link>
          <div className="login-preview-brand">
            <span className="login-preview-brand-mark">
              {project === "tandur" ? <Leaf size={22} /> : <ShoppingBasket size={22} />}
            </span>
            <span>{content.name}</span>
          </div>
          <div className="login-preview-story-copy">
            <span className="login-preview-eyebrow">{content.eyebrow}</span>
            <h1>{content.headline}</h1>
            <p>{content.description}</p>
          </div>
          <div className="login-preview-art" aria-hidden="true">
            {project === "tandur" ? (
              <>
                <div className="tandur-art-sun" />
                <div className="tandur-art-field"><i /><i /><i /><i /></div>
                <div className="tandur-art-leaf"><Leaf size={52} strokeWidth={1} /></div>
              </>
            ) : (
              <>
                <div className="nyaper-art-plate" />
                <div className="nyaper-art-bowl"><i /><i /><i /><i /><i /></div>
                <span className="nyaper-art-spark nyaper-art-spark-one">✳</span>
                <span className="nyaper-art-spark nyaper-art-spark-two">✳</span>
              </>
            )}
          </div>
          <span className="login-preview-story-foot">PORTFOLIO PROJECT / LOGIN CONCEPT</span>
        </section>

        <section className="login-preview-form-panel" aria-labelledby="login-preview-title">
          <div className="login-preview-form-wrap">
            <div className="login-preview-notice">
              <LockKeyhole size={14} />
              <span>Kolom preview bisa diedit langsung — autentikasi belum aktif</span>
            </div>
            <span className="login-preview-form-eyebrow">{content.name} / LOGIN</span>
            <h2 id="login-preview-title">{content.formTitle}</h2>
            <p className="login-preview-form-description">{content.formDescription}</p>

            {project === "tandur" && (
              <div className="login-preview-roles" role="group" aria-label="Pilih peran">
                {tandurRoles.map((role) => (
                  <button
                    key={role}
                    type="button"
                    aria-pressed={activeRole === role}
                    className={activeRole === role ? "is-selected" : ""}
                    onClick={() => setActiveRole(role)}
                  >
                    {role}
                  </button>
                ))}
              </div>
            )}

            <form className="login-preview-form" onSubmit={handleSubmit}>
              {project === "tandur" && (
                <label>
                  Lembaga
                  <input type="text" placeholder="Nama KSPPS / BMT" autoComplete="organization" />
                </label>
              )}
              <label>
                {content.emailLabel}
                <input
                  type="email"
                  placeholder={project === "tandur" ? "nama@lembaga.id" : "nama@email.com"}
                  autoComplete="email"
                  required
                />
              </label>
              <label>
                {content.passwordLabel}
                <span className="login-preview-password">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan kata sandi"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                    onClick={() => setShowPassword((visible) => !visible)}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </span>
              </label>
              <div className="login-preview-form-options">
                <label><input type="checkbox" /> Ingat saya</label>
                <span>Lupa kata sandi?</span>
              </div>
              <button className="login-preview-submit" type="submit">
                {content.submitLabel} <ArrowRight size={17} />
              </button>
            </form>

            {message && <p className="login-preview-feedback" role="status">{message}</p>}
            {project === "tandur" && <p className="login-preview-account-note">Akun demo tidak perlu menggunakan kredensial pribadi.</p>}
            <Link className="login-preview-repo-link" href="/" aria-label="Kembali melihat proyek di portofolio">
              Kembali ke proyek <ArrowLeft size={14} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
