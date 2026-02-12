import Image from "next/image";
import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import LoanProducts from "@/components/LoanProducts";
import HowItWorks from "@/components/HowItWorks";
import EmiCalculator from "@/components/EmiCalculator";
export default function Home() {
  return (
    <>
    <Navbar/>
    <HeroCarousel/>
    <LoanProducts />
    <HowItWorks /> 
    <EmiCalculator />
    </>
  );
}
