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
  title: "SkullDevs | Transformación Digital Automatizada",
  description: "Transformación digital para tu empresa: ¿todavía corres en Excel? Te transformamos a Power BI y automatizamos tus procesos para que decidas con datos reales, en tiempo real.",
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
