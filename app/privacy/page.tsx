import { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-semibold">Privacy</h1>
      <p className="mt-4 text-muted-foreground">Privacy policy placeholder. Add your policy here.</p>
    </div>
  );
}
