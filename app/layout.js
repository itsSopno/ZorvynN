import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata = {
  title: "Zorvyn — Next-Gen Platform",
  description: "Zorvyn is a modern full-stack Next.js platform with GSAP animations and Tailwind CSS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} antialiased bg-[#050816] text-white`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
