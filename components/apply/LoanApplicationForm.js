"use client";
import { useState } from "react";

export default function LoanApplicationForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="py-24 bg-[#F4F6FA]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white p-10 md:p-14 rounded-xl shadow-lg">

          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-10 flex items-center gap-3 ">
            Apply for Loan
            <span className="text-accent text-4xl">➤</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name + Mobile */}
            <div className="grid md:grid-cols-2 gap-6">
              <input type="text" placeholder="Full Name" required className="input" />
              <input type="tel" placeholder="Mobile" required className="input" />
            </div>

            {/* Email + City */}
            <div className="grid md:grid-cols-2 gap-6">
              <input type="email" placeholder="Email ID" required className="input" />
              <input type="text" placeholder="City" required className="input" />
            </div>

            {/* Loan Type */}
            <select required className="input w-full text-gray-500">
              <option>Select Loan Type</option>
              <option>Personal Loan</option>
              <option>Business Loan</option>
              <option>Home Loan</option>
              <option>Car Loan</option>
              <option>Loan Against Property</option>
              <option>Loan Against Shares</option>
            </select>

            {/* Amount + Income */}
            <div className="grid md:grid-cols-2 gap-6">
              <input type="number" placeholder="Loan Amount Required" required className="input" />
              <input type="number" placeholder="Monthly Income" required className="input" />
            </div>

            <textarea rows="4" placeholder="Message (Optional)" className="input w-full"/>

            <div className="text-center pt-4">
              <button className="bg-primary text-white py-3 px-10 rounded-md font-semibold hover:bg-primary/90 transition">
                Submit Application
              </button>
            </div>

            {sent && (
              <p className="text-green-600 text-center pt-4">
                Application submitted successfully!
              </p>
            )}

          </form>
        </div>
      </div>
    </section>
  );
}
