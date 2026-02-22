import { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { LocalPickupIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Ever Again Mushrooms.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-2 text-muted-foreground">Have a question or want to place an order? Send us a message.</p>
      <ContactForm className="mt-10" />
      <div className="mt-12 space-y-6 rounded-lg border bg-muted/30 p-6 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">Placeholders</p>
        <p>Email: info@everagainmushrooms.com</p>
        <p className="flex items-center gap-2">
          <LocalPickupIcon className="h-4 w-4" />
          Pickup: Pembroke; weekly delivery in the Ottawa Valley.
        </p>
        <p>Hours: TBD. Wholesale inquiries welcome.</p>
      </div>
    </div>
  );
}
