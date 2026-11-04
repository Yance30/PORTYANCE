import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { experiences, getExperience } from "../../experience-data";
import { notFound } from "next/navigation";

type ExperiencePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return experiences.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ExperiencePageProps): Promise<Metadata> {
  const { slug } = await params;
  const experience = getExperience(slug);
  if (!experience) notFound();

  return {
    title: `${experience.role} | Pengalaman Organisasi | Portyance`,
    description: experience.description,
  };
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const { slug } = await params;
  const experience = getExperience(slug);
  if (!experience) notFound();

  return (
    <main className="experience-detail-page">
      <header className="experience-detail-header">
        <Link className="experience-detail-brand" href="/#beranda">
          <span className="wordmark-icon">P<span>.</span></span>
          <span>PORTYANCE<small>PORTOFOLIO DIGITAL</small></span>
        </Link>
        <Link className="experience-back-link" href="/#pengalaman">
          <ArrowLeft size={16} /> Kembali ke pengalaman
        </Link>
      </header>

      <article className="experience-detail-content">
        <div className="experience-detail-heading">
          <span className="eyebrow">PENGALAMAN ORGANISASI</span>
          <h1>{experience.role}</h1>
          <div className="experience-detail-meta">
            <span>{experience.organization}</span>
            {experience.period && <span>{experience.period}</span>}
          </div>
        </div>

        <section className="experience-description" aria-labelledby="activity-description">
          <span className="eyebrow">TENTANG KEGIATAN</span>
          <h2 id="activity-description">Peran dan dokumentasi</h2>
          <p>{experience.description}</p>
        </section>

        {experience.images && (
          <section className="experience-gallery" aria-label={`Dokumentasi ${experience.role}`}>
            {experience.images.map((image) => (
              <figure key={image.src}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1100px) 44vw, 500px"
                  loading="lazy"
                />
                <figcaption>{image.alt}</figcaption>
              </figure>
            ))}
          </section>
        )}

        <Link className="experience-back-button" href="/#pengalaman">
          <ArrowLeft size={16} /> Kembali ke semua pengalaman
        </Link>
      </article>

      <footer className="experience-detail-footer">
        <span>PORTYANCE · PENGALAMAN ORGANISASI</span>
        <Link href="/#kontak">Hubungi saya <ArrowUpRight size={14} /></Link>
      </footer>
    </main>
  );
}
