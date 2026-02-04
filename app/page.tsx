import { Metadata } from "next";
import { HomePageContent } from "@/components/home/home-page-content";

export const metadata: Metadata = {
  title: "Cedar Roots Mushrooms | Local Gourmet Mushrooms & Cultivation",
  description:
    "Local, craft-grown gourmet mushrooms. Fresh mushrooms for cooking, liquid cultures and grain spawn for growers. Madawaska, Maine.",
};

export default function HomePage() {
  return <HomePageContent />;
}
