"use client";
import { useEffect, useRef } from "react";
import {
  FaUser,
  FaBriefcase,
  FaHome,
  FaCar,
  FaBuilding,
  FaChartLine,
} from "react-icons/fa";

const loans = [
  {
    title: "Personal Loan",
    desc: "Quick personal loans for your needs with minimal paperwork.",
    icon: <FaUser size={26} />,
  },
  {
    title: "Business Loan",
    desc: "Flexible funding to grow and expand your business.",
    icon: <FaBriefcase size={26} />,
  },
  {
    title: "Home Loan",
    desc: "Turn your dream home into reality with easy EMIs.",
    icon: <FaHome size={26} />,
  },
  {
    title: "Car Loan",
    desc: "Drive your dream car with low interest financing.",
    icon: <FaCar size={26} />,
  },
  {
    title: "Loan Against Property",
    desc: "Unlock your property’s value for big financial needs.",
    icon: <FaBuilding size={26} />,
  },
  {
    title: "Loan Against Shares",
    desc: "Get liquidity without selling your investments.",
    icon: <FaChartLine size={26} />,
  },
];

export default function LoanProducts() {
  const scrollRef = useRef();

  // Auto scroll
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
    <section className="py-12 md:py-20 bg-gradient-to-br from-primary to-[#061733] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12 md:mb-16 text-white">
          <h2 className="text-2xl md:text-4xl font-bold">
            Our Loan Products
          </h2>
          <p className="text-white/70 mt-3 text-sm md:text-base">
            Simple, fast and reliable loan solutions for every need
          </p>
        </div>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar pb-4"
        >
          {[...loans, ...loans].map((loan, i) => (
            <div
              key={i}
              className="
              min-w-[220px] sm:min-w-[250px] md:min-w-[300px] lg:min-w-[330px]
              bg-white
              border border-accent/20
              p-6 sm:p-7 md:p-8 rounded-2xl
              hover:-translate-y-1 hover:shadow-xl
              transition duration-300 group"
            >
              {/* Icon */}
              <div className="text-accent mb-3 sm:mb-4 group-hover:scale-110 transition">
                {loan.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-primary">
                {loan.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm sm:text-base">
                {loan.desc}
              </p>

              {/* Static CTA */}
              <p className="mt-3 text-accent font-semibold text-sm sm:text-base">
                Learn More →
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
