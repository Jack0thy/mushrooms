import { Metadata } from "next";
import { HomePageContent } from "@/components/home/home-page-content";
import { getMedusaProducts, isMedusaConfigured } from "@/lib/medusa";

export const metadata: Metadata = {
  title: "Ever Again Mushrooms | Cooking feels new again",
  description:
    "Small-batch mushrooms and cultivation supplies. For the kitchen, the lab, and the curious. Ottawa Valley.",
};

export default async function HomePage() {
  const products = isMedusaConfigured() ? await getMedusaProducts() : [];
  return <HomePageContent products={products} />;
}
