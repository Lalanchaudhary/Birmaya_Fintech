"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

const logos = [
  "/partners/hdfc.jpg",
  "/partners/icici.jpg",
  "/partners/bajaj.jpg",
  "/partners/kotak.jpg",
  "/partners/tatacapital.jpg",
  "/partners/mahindra.jpg",
  "/partners/indusind.jpg",
  "/partners/idfcFirst.jpg",
  "/partners/gro.jpg",
  "/partners/iifl.jpg",
  "/partners/hero.jpg",
  "/partners/incred.png",
  "/partners/kreditBee.png",
  "/partners/l&t.jpg",
  "/partners/unity.jpg",
  "/partners/yesBank.jpg",
  "/partners/shriram.jpg",
  "/partners/muthoot.jpg",
  "/partners/protium.jpg",
  "/partners/poonawala.png",
  "/partners/piramal.jpg",

];

export default function Partners() {
  const scrollRef = useRef();

  useEffect(() => {
    const container = scrollRef.current;

    const scroll = () => {
      if (container) {
        container.scrollLeft += 1;
        if (
          container.scrollLeft >=
          container.scrollWidth - container.clientWidth
        ) {
          container.scrollLeft = 0;
        }
      }
    };

    const interval = setInterval(scroll, 20);
    return () => clearInterval(interval);
  }, []);

  return (
<section className="py-24 bg-gradient-to-b from-white to-[#F5F8FF] overflow-hidden">
  <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}
    <div className="text-center mb-14">
      <h2 className="text-3xl font-bold text-primary">
        Our Trusted Partners
      </h2>
      <p className="text-gray-500 mt-2">
        We collaborate with India’s leading banks & NBFCs
      </p>
    </div>

    {/* Logo Slider */}
    <div
      ref={scrollRef}
      className="flex items-center gap-10 overflow-x-auto no-scrollbar pb-4"
    >
      {[...logos, ...logos].map((logo, i) => (
        <div
          key={i}
          className="min-w-[160px] bg-white p-4 rounded-xl shadow-sm 
          hover:shadow-lg hover:-translate-y-1 transition duration-300"
        >
          <Image
            src={logo}
            alt="partner"
            width={140}
            height={70}
            className="object-contain"
          />
        </div>
      ))}
    </div>
  </div>
</section>

  );
}
