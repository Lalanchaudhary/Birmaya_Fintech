"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import useTypewriter from "./useTypewriter";

const slides = [
  {
    desktop: "/hero/hero1.png",
    mobile: "/hero/mobile/hero1-mobile.png",
    title: "Instant Loan Approval in 24 Hours",
    desc: "Minimal paperwork. Quick verification. Fast disbursal.",
    btn: "Apply Now",
  },
  {
    desktop: "/hero/hero2.png",
    mobile: "/hero/mobile/hero2-mobile.png",
    title: "Fuel Your Business Growth",
    desc: "Flexible business loans designed for your success.",
    btn: "Get Business Loan",
  },
  {
    desktop: "/hero/hero4.png",
    mobile: "/hero/mobile/hero4-mobile.png",
    title: "Your Trusted Financial Partner",
    desc: "Transparent process. No hidden charges.",
    btn: "Talk to Expert",
  },
];


export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const typedTitle = useTypewriter(slides[current].title, 40);
  const typedDesc = useTypewriter(slides[current].desc, 20);
  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkScreen = () => setIsMobile(window.innerWidth < 768);
  checkScreen();
  window.addEventListener("resize", checkScreen);
  return () => window.removeEventListener("resize", checkScreen);
}, []);


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">

      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image src={isMobile ? slide.mobile : slide.desktop} alt="hero" fill className="object-cover" />

          <div className="absolute inset-0 bg-black/60"></div>

          {/* LEFT SIDE TEXT */}
          {index === current && (
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl lg:ml-20 px-6 text-white">
                <div className="max-w-xl">

                  <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    {typedTitle}
                    <span className="animate-pulse">|</span>
                  </h1>

                  <p className="text-lg md:text-xl mb-8">
                    {typedDesc}
                  </p>

                  <button className="bg-accent px-8 py-3 rounded-lg font-semibold text-white hover:scale-105 transition">
                    {slide.btn}
                  </button>

                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              current === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
