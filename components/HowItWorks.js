import { FaFileAlt, FaUpload, FaSearch, FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";

const steps = [
  {
    icon: <FaFileAlt />,
    title: "Apply Online",
    desc: "Complete the simple application form in minutes.",
  },
  {
    icon: <FaUpload />,
    title: "Submit Documents",
    desc: "Upload your basic KYC and income documents.",
  },
  {
    icon: <FaSearch />,
    title: "Verification",
    desc: "Our team verifies your application quickly.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Quick Approval",
    desc: "Get loan approval within 24 hours.",
  },
  {
    icon: <FaMoneyBillWave />,
    title: "Instant Disbursal",
    desc: "Loan amount credited directly to your bank.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-[#F7F9FC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            How to Apply for a Loan →
          </h2>
        </div>

        {/* Timeline line */}
        <div className="relative">
          <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gray-300"></div>

          <div className="grid md:grid-cols-5 gap-10 text-center relative">
            {steps.map((step, i) => (
              <div key={i} className="relative">

                {/* Circle */}
                <div className="w-24 h-24 mx-auto rounded-full bg-white border-4 border-primary flex items-center justify-center text-primary text-2xl shadow-md">
                  {step.icon}
                </div>

                {/* Number bubble */}
                <div className="absolute top-0 right-1/2 translate-x-10 bg-accent text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </div>

                <h3 className="mt-6 font-semibold text-lg text-gray-800">
                  {step.title}
                </h3>

                <p className="text-gray-500 mt-2 text-sm">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
