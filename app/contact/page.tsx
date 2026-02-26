import { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Cedar Roots Mushrooms. Questions, orders, weekly delivery.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-xl px-4 py-16 md:py-22">
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
        Contact
      </h1>
      <p className="mt-3 text-muted-foreground">
        Have a question or want to place an order? Send us a message.
      </p>
      <ContactForm className="mt-10" />
      <div className="mt-12 space-y-4 rounded-lg border border-border/80 bg-muted/20 p-6 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">Elsewhere</p>
        <p>
          <a
            href="mailto:info@cedarrootsmushrooms.com"
            className="underline underline-offset-2 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            info@cedarrootsmushrooms.com
          </a>
        </p>
        <p>Local pickup: Pembroke. Weekly delivery in the Ottawa Valley.</p>
        <p>Wholesale inquiries welcome.</p>
      </div>
    </div>
  );
}
