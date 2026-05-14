import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ContactModal from "@/components/ContactModal";
import TeamModal from "@/components/TeamModal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SkullDevs | Engineering the Future",
  description: "Boutique software development agency specializing in high-performance digital products and technical consulting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body>
        {children}
        <ContactModal />
        <TeamModal />
      </body>
    </html>
  );
}
