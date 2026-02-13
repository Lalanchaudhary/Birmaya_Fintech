import { FaClock, FaShieldAlt, FaBolt, FaHandshake } from "react-icons/fa";

const features = [
  { icon: <FaClock />, title: "Fast Approval", desc: "Get loan approval within 24 hours." },
  { icon: <FaShieldAlt />, title: "Safe & Secure", desc: "Your data is fully protected with us." },
  { icon: <FaBolt />, title: "Minimal Paperwork", desc: "Hassle-free documentation process." },
  { icon: <FaHandshake />, title: "Trusted Partners", desc: "Work with top banks & NBFCs." },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-3xl font-bold text-primary mb-14">
          Why Choose Birmaya Fintech
        </h2>

        <div className="grid md:grid-cols-4 gap-10">
          {features.map((item, i) => (
            <div key={i}>
              <div className="text-3xl text-accent mb-4 flex justify-center">
                {item.icon}
              </div>
              <h3 className="font-bold mb-2 text-black">{item.title}</h3>
              <p className="text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
