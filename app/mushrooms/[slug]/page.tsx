import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSpeciesBySlug, species } from "@/data/species";
import { getMedusaProducts, isMedusaConfigured } from "@/lib/medusa";
import { MushroomDetail } from "@/components/mushrooms/mushroom-detail";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const slugs = species.map((s) => ({ slug: s.slug }));
  // Include "mushrooms" so /mushrooms/mushrooms is pre-rendered (shows 404; no species with this slug)
  slugs.push({ slug: "mushrooms" });
  return slugs;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getSpeciesBySlug(slug);
  if (!s) return { title: "Species not found" };
  return { title: s.name, description: s.tagline };
}

export default async function MushroomDetailPage({ params }: Props) {
  const { slug } = await params;
  const s = getSpeciesBySlug(slug);
  if (!s) notFound();
  const allProducts = isMedusaConfigured() ? await getMedusaProducts() : [];
  const products = allProducts.filter((p) => p.speciesSlug === slug);
  return <MushroomDetail species={s} products={products} />;
}
