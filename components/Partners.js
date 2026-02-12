"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

const logos = [
  "/partners/hdfc.png",
  "/partners/icici.png",
  "/partners/bajaj.png",
  "/partners/kotak.png",
  "/partners/tata.png",
  "/partners/axis.png",
  "/partners/indusind.png",
  "/partners/aditya.png",
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
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
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
          className="flex items-center gap-16 overflow-x-auto no-scrollbar"
        >
          {[...logos, ...logos].map((logo, i) => (
            <div key={i} className="min-w-[140px] opacity-60 hover:opacity-100 transition">
              <Image
                src={logo}
                alt="partner"
                width={140}
                height={70}
                className="object-contain grayscale hover:grayscale-0 transition"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
