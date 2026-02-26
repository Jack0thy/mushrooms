import { Metadata } from "next";
import { HomePageContent } from "@/components/home/home-page-content";
import { getMedusaProducts, isMedusaConfigured } from "@/lib/medusa";

export const metadata: Metadata = {
  title: "Cedar Roots Mushrooms | Gourmet mushrooms & growing supplies",
  description:
    "Gourmet mushrooms for the kitchen and cultures and spawn for growers. Local pickup and weekly delivery in the Ottawa Valley.",
};

export default async function HomePage() {
  const products = isMedusaConfigured() ? await getMedusaProducts() : [];
  return <HomePageContent products={products} />;
}
