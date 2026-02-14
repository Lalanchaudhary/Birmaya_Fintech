"use client";
import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="py-24 bg-[#F4F6FA]">
      <div className="max-w-5xl mx-auto px-6">

        <div className="bg-white p-10 md:p-14 rounded-xl shadow-lg">

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-10 flex items-center gap-3">
            Connect with our support team
            <span className="text-accent text-4xl">➤</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Row 1 */}
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Full Name"
                required
                className="border-2 border-primary/40 p-4 rounded-md outline-none focus:border-primary text-black"
              />

              <input
                type="tel"
                placeholder="Mobile"
                required
                className="border-2 border-primary/40 p-4 rounded-md outline-none focus:border-primary text-black"
              />
            </div>

            {/* Row 2 */}
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="email"
                placeholder="Email ID"
                required
                className="border-2 border-primary/40 p-4 rounded-md outline-none focus:border-primary text-black"
              />

              <input
                type="text"
                placeholder="City"
                required
                className="border-2 border-primary/40 p-4 rounded-md outline-none focus:border-primary text-black"
              />
            </div>
            {/* Message */}
            <textarea
              rows="5"
              placeholder="Message:"
              required
              className="w-full border-2 border-primary/40 p-4 rounded-md outline-none focus:border-primary text-black"
            />

            {/* Button */}
            <div className="text-center pt-4">
              <button className="bg-primary text-white  py-3 px-10 rounded-md font-semibold hover:bg-primary/90 transition">
                Submit
              </button>
            </div>

            {sent && (
              <p className="text-green-600 text-center pt-4">
                Thank you! Our team will contact you soon.
              </p>
            )}

          </form>
        </div>
      </div>
    </section>
  );
}
