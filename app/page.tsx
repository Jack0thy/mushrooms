import { Metadata } from "next";
import { HomePageContent } from "@/components/home/home-page-content";
import { getMedusaProducts, isMedusaConfigured } from "@/lib/medusa";

export const metadata: Metadata = {
  title: "Cedar Roots Mushrooms | Local Gourmet Mushrooms & Cultivation",
  description:
    "Local, craft-grown gourmet mushrooms. Fresh mushrooms for cooking, liquid cultures and grain spawn for growers. Madawaska, Maine.",
};

export default async function HomePage() {
  const products = isMedusaConfigured() ? await getMedusaProducts() : [];
  return <HomePageContent products={products} />;
}
