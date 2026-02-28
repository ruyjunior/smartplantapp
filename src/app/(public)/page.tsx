import { Container } from "./components/Container";
import { Hero } from "./components/Hero";
import { SectionTitle } from "./components/SectionTitle";
import { Benefits } from "./components/Benefits";
import { Video } from "./components/Video";
import { Testimonials } from "./components/Testimonials";
import { Faq } from "./components/Faq";
import { Cta } from "./components/Cta";
import { Metadata } from "next";


import { benefitOne, benefitTwo } from "./components/data";
import infoAPP from "@/lib/infoapp";

export const metadata: Metadata = {
  title:
    `Home | ${infoAPP.name} ${infoAPP.version}`,
  description: infoAPP.description,
};

export default function Home() {
  return (
      <Hero />
    )
}
