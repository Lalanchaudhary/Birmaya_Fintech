"use client";
import { useEffect, useRef } from "react";
import { FaUser, FaBriefcase, FaHome, FaCar, FaBuilding, FaChartLine } from "react-icons/fa";

const loans = [
    {
        title: "Personal Loan",
        desc: "Quick personal loans for your needs with minimal paperwork.",
        icon: <FaUser size={28} />,
    },
    {
        title: "Business Loan",
        desc: "Flexible funding to grow and expand your business.",
        icon: <FaBriefcase size={28} />,
    },
    {
        title: "Home Loan",
        desc: "Turn your dream home into reality with easy EMIs.",
        icon: <FaHome size={28} />,
    },
    {
        title: "Car Loan",
        desc: "Drive your dream car with low interest financing.",
        icon: <FaCar size={28} />,
    },
    {
        title: "Loan Against Property",
        desc: "Unlock your property’s value for big financial needs.",
        icon: <FaBuilding size={28} />,
    },
    {
        title: "Loan Against Shares",
        desc: "Get liquidity without selling your investments.",
        icon: <FaChartLine size={28} />,
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
        <section className="py-8 bg-gradient-to-br from-[#0C2C75] to-[#061733] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Heading */}
                <div className="text-center mb-16 text-white">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Our Loan Products
                    </h2>
                    <p className="text-white/70 mt-3">
                        Simple, fast and reliable loan solutions for every need
                    </p>
                </div>

                {/* Scroll container */}
                <div
                    ref={scrollRef}
                    className="flex gap-8 overflow-x-auto no-scrollbar pb-4"
                >
                    {[...loans, ...loans].map((loan, i) => (
                        <div
                            key={i}
                            className="min-w-[280px] md:min-w-[330px] 
            bg-white backdrop-blur-lg 
            border border-accent/20
            p-8 rounded-2xl 
            hover:bg-white hover:text-gray-800
            transition duration-300 group"
                        >
                            <div className="text-accent mb-5 group-hover:scale-110 transition">
                                {loan.icon}
                            </div>

                            <h3 className="text-xl font-semibold mb-3 text-primary group-hover:text-gray-800">
                                {loan.title}
                            </h3>

                            <p className="text-gray-600">
                                {loan.desc}
                            </p>
                            <button className="mt-2  text-accent font-semibold flex items-center gap-1">
                                Learn More →
                            </button>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );

}
