import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomeEmailCapture } from "@/components/home/email-capture";

export const metadata: Metadata = {
  title: "Weekly Mushroom Share",
  description: "Subscribe for weekly harvest updates and availability.",
};

export default function SubscribePage() {
  return (
    <div className="container mx-auto max-w-xl px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">Weekly Mushroom Share</h1>
      <p className="mt-4 text-muted-foreground">
        Get harvest updates and know when fresh mushrooms and spawn are available.
      </p>
      <div className="mt-10">
        <HomeEmailCapture />
      </div>
      <Button asChild variant="outline" className="mt-8">
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
}
