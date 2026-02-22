import { Metadata } from "next";
import { HomePageContent } from "@/components/home/home-page-content";
import { getMedusaProducts, isMedusaConfigured } from "@/lib/medusa";

export const metadata: Metadata = {
  title: "Ever Again Mushrooms | Rediscover Cooking",
  description:
    "Craft-grown gourmet mushrooms for curious kitchens. Local pickup and weekly delivery in the Ottawa Valley. Cook something new again.",
};

export default async function HomePage() {
  const products = isMedusaConfigured() ? await getMedusaProducts() : [];
  return <HomePageContent products={products} />;
}
