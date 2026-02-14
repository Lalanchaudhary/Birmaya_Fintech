'use client';
import AboutHero from "@/components/about/AboutHero";
import AboutIntro from "@/components/about/AboutIntro";
import MissionVision from "@/components/about/MissionVision";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import ServiceCTA from "@/components/services//ServiceCTA";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutIntro />
      <MissionVision />
      <WhyChooseUs />
      <ServiceCTA />
    </>
  );
}
