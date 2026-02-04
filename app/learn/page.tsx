import { Metadata } from "next";
import { LearnPageContent } from "@/components/learn/learn-page-content";

export const metadata: Metadata = {
  title: "Learn",
  description: "Guides on mushroom cultivation, troubleshooting, cooking, and storage. Start here or dive into specifics.",
};

export default function LearnPage() {
  return <LearnPageContent />;
}
