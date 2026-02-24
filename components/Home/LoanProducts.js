"use client";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import {
  FaUser,
  FaBriefcase,
  FaHome,
  FaCar,
  FaBuilding,
  FaChartLine,
  FaGraduationCap,
} from "react-icons/fa";
import { loanDetails } from "@/data/loanDetails";

const iconMap = {
  "personal-loan": FaUser,
  "business-loan": FaBriefcase,
  "home-loan": FaHome,
  "auto-loan": FaCar,
  "loan-against-property": FaBuilding,
  "loan-against-shares": FaChartLine,
  "education-loan": FaGraduationCap,
};

export default function LoanProducts() {
  const scrollRef = useRef(null);
  const loans = useMemo(() => [...loanDetails, ...loanDetails], []);

  useEffect(() => {
    const container = scrollRef.current;

    const scroll = () => {
      if (!container) return;
      container.scrollLeft += 1;
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
        container.scrollLeft = 0;
      }
    };

    const interval = setInterval(scroll, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-primary to-[#061733] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16 text-white">
          <h2 className="text-2xl md:text-4xl font-bold">Our Loan Products</h2>
          <p className="text-white/70 mt-3 text-sm md:text-base">
            Simple, fast and reliable loan solutions for every need
          </p>
        </div>

        <div ref={scrollRef} className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar pb-4">
          {loans.map((loan, i) => {
            const Icon = iconMap[loan.slug] || FaUser;
            return (
              <Link
                key={`${loan.slug}-${i}`}
                href={`/services/${loan.slug}`}
                className="
                min-w-[220px] sm:min-w-[250px] md:min-w-[300px] lg:min-w-[330px]
                bg-white
                border border-accent/20
                p-6 sm:p-7 md:p-8 rounded-2xl
                hover:-translate-y-1 hover:shadow-xl
                transition duration-300 group block"
              >
                <div className="text-accent mb-3 sm:mb-4 group-hover:scale-110 transition">
                  <Icon size={26} />
                </div>

                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-primary">
                  {loan.title}
                </h3>

                <p className="text-gray-600 text-sm sm:text-base">{loan.shortDesc}</p>

                <p className="mt-3 text-accent font-semibold text-sm sm:text-base">
                  Read Details -
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
