import Image from "next/image";
import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/Home/HeroCarousel";
import LoanProducts from "@/components/Home/LoanProducts";
import HowItWorks from "@/components/Home/HowItWorks";
import EmiCalculator from "@/components/Home/EmiCalculator";
import Partners from "@/components/Home/Partners";
import Stats from "@/components/Home/Stats";
import Testimonials from "@/components/Home/Testimonials";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <>
    <Navbar/>
    <HeroCarousel/>
    <LoanProducts />
    <HowItWorks /> 
    <EmiCalculator />
    <Partners />
    <Stats />
    <Testimonials />
    <Footer />
    </>
  );
}
