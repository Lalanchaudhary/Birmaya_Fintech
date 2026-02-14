import { FaClock, FaBolt, FaShieldAlt } from "react-icons/fa";

export default function ApplyBenefits() {
  return (
    <section className="py-20 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">

        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <FaClock className="text-3xl text-accent mx-auto mb-4"/>
          <h3 className="font-bold text-lg text-primary">Quick Approval</h3>
          <p className="text-gray-500">Get loan approval within 24–48 hours.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <FaBolt className="text-3xl text-accent mx-auto mb-4"/>
          <h3 className="font-bold text-lg text-primary">Minimal Documentation</h3>
          <p className="text-gray-500">Simple process with minimal paperwork.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <FaShieldAlt className="text-3xl text-accent mx-auto mb-4"/>
          <h3 className="font-bold text-lg text-primary">100% Secure</h3>
          <p className="text-gray-500">Your data is completely safe with us.</p>
        </div>

      </div>
    </section>
  );
}
