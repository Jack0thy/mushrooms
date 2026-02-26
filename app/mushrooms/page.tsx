import { Metadata } from "next";
import { MushroomsDirectoryContent } from "@/components/mushrooms/mushrooms-directory-content";

export const metadata: Metadata = {
  title: "Species",
  description: "Species we grow: taste, texture, best uses. For curious kitchens.",
};

export default function MushroomsPage() {
  return <MushroomsDirectoryContent />;
}
