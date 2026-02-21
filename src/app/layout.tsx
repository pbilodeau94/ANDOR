import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ANDOR | Autoimmune Neurological DisOrders Registry",
  description:
    "ANDOR is a division-wide research collaborative within MGB Neurology, Division of Neuroimmunology, dedicated to advancing autoimmune neurology through registries, clinical trials, and translational research.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${instrumentSerif.variable} antialiased`}>
        <Navbar />
        <main className="min-h-screen pt-14">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
