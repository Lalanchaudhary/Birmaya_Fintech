import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactInfo() {
  return (
    <section className="py-24 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT — Google Map */}
        <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.585232977682!2d77.31323167528714!3d28.582215075692247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce4594b84a389%3A0x4440c550c363a18c!2s55%2C%20FM%20Rd%2C%20D%20Block%2C%20Sector%202%2C%20Noida%2C%20Uttar%20Pradesh%20201301!5e0!3m2!1sen!2sin!4v1771062443440!5m2!1sen!2sin"
            width="100%"
            height="100%"
            loading="lazy"
            className="border-0"
          ></iframe>
        </div>

        {/* RIGHT — Contact Details */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
            Get in Touch
          </h2>

          <p className="text-gray-600 mb-10">
            Have questions about loans or need assistance? Our team is here to help you.
          </p>

          <div className="space-y-8">

            {/* Phone */}
            <div className="flex items-start gap-5">
              <div className="bg-accent/10 p-4 rounded-xl text-accent text-2xl">
                <FaPhone />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-primary">Call Us</h4>
                <p className="text-gray-600">+91 8287868048</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-5">
              <div className="bg-accent/10 p-4 rounded-xl text-accent text-2xl">
                <FaEnvelope />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-primary">Email</h4>
                <p className="text-gray-600">birmayafintech@ gmail.com</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-5">
              <div className="bg-accent/10 p-4 rounded-xl text-accent text-2xl">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-primary">Office</h4>
                <p className="text-gray-600">
                  Birmaya Fintech Pvt Ltd<br />
                  F-01, first floor, D-36, sector- 2, Noida
                 <br />
                  G.B Nagar, U.P-201301
                </p>
              </div>
            </div>

            {/* Working Hours */}
            <div className="flex items-start gap-5">
              <div className="bg-accent/10 p-4 rounded-xl text-accent text-2xl">
                🕒
              </div>
              <div>
                <h4 className="font-semibold text-lg text-primary">Working Hours</h4>
                <p className="text-gray-600">
                  Mon – Sat : 10:00 AM – 7:00 PM <br />
                  Sunday : Closed
                </p>
              </div>
            </div>


          </div>
        </div>

      </div>
    </section>
  );
}
