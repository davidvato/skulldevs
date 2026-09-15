import type { Metadata } from "next";
import CvHugoClient from "@/components/CvHugoClient";

export const metadata: Metadata = {
  title: "Hugo F. Bribiesca Balboa | CV",
  description: "Curriculum de Hugo F. Bribiesca Balboa — Senior Project Manager, Technical Project Manager, Product Owner y Business Analyst.",
  robots: { index: false, follow: false },
};

export default function CvHugoPage() {
  return <CvHugoClient />;
}