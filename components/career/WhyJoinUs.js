import { FaChartLine, FaUsers, FaLaptopHouse } from "react-icons/fa";

export default function WhyJoinUs() {
  return (
    <section className="py-24 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-primary mb-12">
          Why Work With Us
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <FaChartLine className="text-3xl text-accent mx-auto mb-4"/>
            <h3 className="font-bold text-black">Career Growth</h3>
            <p className="text-gray-500 mt-2">
              Fast learning environment with real growth opportunities.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <FaUsers className="text-3xl text-accent mx-auto mb-4"/>
            <h3 className="font-bold text-black">Friendly Culture</h3>
            <p className="text-gray-500 mt-2">
              Supportive team and collaborative work culture.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <FaLaptopHouse className="text-3xl text-accent mx-auto mb-4"/>
            <h3 className="font-bold text-black">Work Flexibility</h3>
            <p className="text-gray-500 mt-2">
              Balanced work life with flexible environment.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
