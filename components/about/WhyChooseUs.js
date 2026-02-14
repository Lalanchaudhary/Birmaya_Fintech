import { FaClock, FaShieldAlt, FaBolt, FaHandshake, FaUserTie, FaHeadset } from "react-icons/fa";

const features = [
  {
    icon: <FaClock />,
    title: "Fast Loan Approval",
    desc: "We ensure quick processing and fast approvals to save your valuable time.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Safe & Secure Process",
    desc: "Your personal and financial information is fully protected with us.",
  },
  {
    icon: <FaBolt />,
    title: "Minimal Paperwork",
    desc: "Simple documentation and hassle-free loan processing experience.",
  },
  {
    icon: <FaHandshake />,
    title: "Trusted Bank Partners",
    desc: "We collaborate with India's top banks and NBFCs to get the best offers.",
  },
  {
    icon: <FaUserTie />,
    title: "Expert Guidance",
    desc: "Our loan experts guide you at every step of the loan journey.",
  },
  {
    icon: <FaHeadset />,
    title: "Dedicated Support",
    desc: "Our support team is always ready to help you whenever you need.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Why Choose Birmaya Fintech
          </h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            We make loan processing simple, fast and transparent so you can focus on what matters most.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((item, i) => (
            <div
              key={i}
              className="bg-[#F7F9FC] p-8 rounded-2xl hover:shadow-xl transition"
            >
              <div className="text-3xl text-accent mb-4">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-primary mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
