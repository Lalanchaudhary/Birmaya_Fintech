import Image from "next/image";
import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/Home/HeroCarousel";
import LoanProducts from "@/components/Home/LoanProducts";
import EmiCalculator from "@/components/Home/EmiCalculator";
import Partners from "@/components/Home/Partners";
import Stats from "@/components/Home/Stats";
import Testimonials from "@/components/Home/Testimonials";
import Awards from "@/components/Home/Awards";
import ContactFaq from "@/components/contact/ContactFAQ";
import RepaymentPopup from "@/components/RepaymentPopup";
export default function Home() {
  return (
    <>
    <HeroCarousel/>
    <LoanProducts />
    <RepaymentPopup />
    <EmiCalculator />
    <Partners />
    <Stats />
    <Awards />
    <Testimonials />
    <ContactFaq />
    </>
  );
}
