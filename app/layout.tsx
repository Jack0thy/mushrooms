import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartProvider } from "@/components/cart/cart-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: {
    default: "Cedar Roots Mushrooms | Local Gourmet Mushrooms & Cultivation",
    template: "%s | Cedar Roots Mushrooms",
  },
  description:
    "Local, craft-grown gourmet mushrooms. Fresh mushrooms for cooking, liquid cultures and grain spawn for growers, and guides to help you succeed. Madawaska, Maine.",
  openGraph: {
    type: "website",
    locale: "en_US",
  },
  metadataBase: new URL("https://cedarrootsmushrooms.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable + " font-sans min-h-screen flex flex-col"}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
