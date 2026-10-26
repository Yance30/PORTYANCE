import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LoginPreview from "./login-preview";
import { isLoginPreviewSlug, loginPreviewData } from "../login-preview-data";

type LoginPreviewPageProps = {
  params: Promise<{ project: string }>;
};

export function generateStaticParams() {
  return Object.keys(loginPreviewData).map((project) => ({ project }));
}

export async function generateMetadata({ params }: LoginPreviewPageProps): Promise<Metadata> {
  const { project } = await params;
  if (!isLoginPreviewSlug(project)) {
    return { title: "Login Preview — Portyance" };
  }

  return {
    title: `${loginPreviewData[project].name} Login Preview — Portyance`,
    description: `Tampilan preview login ${loginPreviewData[project].name}. Mockup visual, belum terhubung ke autentikasi.`,
  };
}

export default async function LoginPreviewPage({ params }: LoginPreviewPageProps) {
  const { project } = await params;
  if (!isLoginPreviewSlug(project)) notFound();

  return <LoginPreview project={project} />;
}
