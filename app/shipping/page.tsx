import { Metadata } from "next";

export const metadata: Metadata = { title: "Shipping & Pickup" };

export default function ShippingPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-semibold">Shipping & Pickup</h1>
      <p className="mt-4 text-muted-foreground">Local pickup by appointment. Delivery within 30 mi (minimum order TBD). Shipping for cultures and spawn. Add your full policy here.</p>
    </div>
  );
}
