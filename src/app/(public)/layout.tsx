import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./../globals.css";

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { PopupWidget } from "./components/PopupWidget";
import infoAPP from "@/lib/infoapp";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    `Home | ${infoAPP.name} ${infoAPP.version}`,
  description: infoAPP.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <ThemeProvider attribute="class">
        <Navbar />
        <div>{children}</div>
        <Footer />
        {/*<PopupWidget /> */}
      </ThemeProvider>
    </div>
  );
}
