import { FaHome, FaCar, FaBriefcase, FaUser, FaBuilding, FaChartLine } from "react-icons/fa";

const services = [
    { icon: <FaUser />, title: "Personal Loan", desc: "Quick personal loans with minimal documentation." },
    { icon: <FaBriefcase />, title: "Business Loan", desc: "Grow your business with flexible funding." },
    { icon: <FaHome />, title: "Home Loan", desc: "Turn your dream home into reality with easy EMIs." },
    { icon: <FaCar />, title: "Car Loan", desc: "Drive your dream car with low interest rates." },
    { icon: <FaBuilding />, title: "Loan Against Property", desc: "Unlock your property’s financial value." },
    { icon: <FaChartLine />, title: "Working Capital", desc: "Keep your business running smoothly." },
];

export default function ServicesGrid() {
    return (
        <section className="py-24 bg-[#F7F9FC]">
            <div className="max-w-7xl mx-auto px-6">

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {services.map((service, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">

                            <div className="text-3xl text-accent mb-4">
                                {service.icon}
                            </div>

                            <h3 className="text-xl font-bold text-primary mb-3">
                                {service.title}
                            </h3>

                            <p className="text-gray-600 mb-6">
                                {service.desc}
                            </p>

                            <p className="text-accent font-semibold">
                                Contact Us for Details →
                            </p>


                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
