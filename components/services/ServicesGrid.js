import Link from "next/link";
import {
  FaHome,
  FaCar,
  FaBriefcase,
  FaUser,
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

export default function ServicesGrid() {
  return (
    <section className="py-24 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {loanDetails.map((service) => {
            const Icon = iconMap[service.slug] || FaUser;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition block"
              >
                <div className="text-3xl text-accent mb-4">
                  <Icon />
                </div>

                <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>

                <p className="text-gray-600 mb-6">{service.shortDesc}</p>

                <p className="text-accent font-semibold">Read Details -&gt;</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
