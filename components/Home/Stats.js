"use client";
import { useEffect, useState } from "react";
import { FaUsers, FaCheckCircle, FaUniversity, FaAward } from "react-icons/fa";

const stats = [
  { icon: <FaUsers />, number: 5000, label: "Happy Customers" },
  { icon: <FaCheckCircle />, number: 12000, label: "Disbursed Amount" },
  { icon: <FaUniversity />, number: 35, label: "Partner Banks" },
  { icon: <FaAward />, number: 10, label: "Years Of Excellence" },
];

export default function Stats() {
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prev) =>
        prev.map((count, i) =>
          count < stats[i].number ? count + Math.ceil(stats[i].number / 80) : stats[i].number
        )
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, i) => (
            <div key={i}>
              <div className="text-3xl mb-4 text-accent flex justify-center">
                {stat.icon}
              </div>

              <h3 className="text-4xl font-bold mb-2">
                {counts[i]}{stat.number ==12000 ? "cr+" : "+"}
              </h3>

              <p className="text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
