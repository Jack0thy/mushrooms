import { Metadata } from "next";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-semibold">Terms</h1>
      <p className="mt-4 text-muted-foreground">Terms of use placeholder. Add your terms here.</p>
    </div>
  );
}
