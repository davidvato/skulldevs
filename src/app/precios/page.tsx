import type { Metadata } from "next";
import PreciosClient from "@/components/PreciosClient";

export const metadata: Metadata = {
  title: "SkullDevs | Precios y Cotizador",
  description: "Cotizador de automatización y transformación digital en pesos mexicanos: Excel a dashboards, WhatsApp, sitios web, CRM, ERP, agendamiento, documentos e IA supervisada. Precios accesibles para pequeñas empresas.",
};

export default function PreciosPage() {
  return <PreciosClient />;
}