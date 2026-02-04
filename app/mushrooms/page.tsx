import { Metadata } from "next";
import { MushroomsDirectoryContent } from "@/components/mushrooms/mushrooms-directory-content";

export const metadata: Metadata = {
  title: "Mushrooms",
  description: "Directory of gourmet mushroom species we grow: Black Pearl King Oyster, Lion's Mane, Chestnut, Pioppino.",
};

export default function MushroomsPage() {
  return <MushroomsDirectoryContent />;
}
