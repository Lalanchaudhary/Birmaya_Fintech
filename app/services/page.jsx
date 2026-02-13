import ServicesGrid from "@/components/services/ServicesGrid";
import WhyChooseUs from "@/components/services/WhyChooseUs";
import ServiceCTA from "@/components/services/ServiceCTA";
export default function ServicesPage() {
  return (
    <div>

      {/* HERO */}
      <section className="bg-primary text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Loan Services
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            We offer fast, flexible and affordable loan solutions for every need.
          </p>
        </div>
      </section>

      <ServicesGrid />
      <WhyChooseUs />
      <ServiceCTA />

    </div>
  );
}
