"use client";
import { useState } from "react";

const INITIAL_FORM = {
  name: "",
  mobile: "",
  email: "",
  city: "",
  loanType: "",
  loanAmount: "",
  monthlyIncome: "",
  message: "",
  website: "",
};

export default function LoanApplicationForm() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSent(false);

    try {
      const res = await fetch("/api/loan-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          loanAmount: Number(formData.loanAmount),
          monthlyIncome: Number(formData.monthlyIncome),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Failed to submit application.");
        return;
      }

      setSent(true);
      setFormData(INITIAL_FORM);
    } catch {
      setError("Failed to submit application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-[#F4F6FA]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white p-10 md:p-14 rounded-xl shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-10 flex items-center gap-3 ">
            Apply for Loan
            <span className="text-accent text-4xl">{"->"}</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
            />

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="input text-gray-500"
              />
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile"
                required
                value={formData.mobile}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="email"
                name="email"
                placeholder="Email ID"
                required
                value={formData.email}
                onChange={handleChange}
                className="input text-gray-500"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                required
                value={formData.city}
                onChange={handleChange}
                className="input text-gray-500"
              />
            </div>

            <select
              required
              name="loanType"
              value={formData.loanType}
              onChange={handleChange}
              className="input w-full text-gray-500"
            >
              <option value="">Select Loan Type</option>
              <option>Personal Loan</option>
              <option>Business Loan</option>
              <option>Home Loan</option>
              <option>Auto Loan</option>
              <option>Loan Against Property</option>
              <option>Loan Against Shares</option>
              <option>Education Loan</option>
            </select>

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="number"
                name="loanAmount"
                placeholder="Loan Amount Required"
                required
                min="1"
                value={formData.loanAmount}
                onChange={handleChange}
                className="input text-gray-500"
              />
              <input
                type="number"
                name="monthlyIncome"
                placeholder="Monthly Income"
                required
                min="1"
                value={formData.monthlyIncome}
                onChange={handleChange}
                className="input text-gray-500"
              />
            </div>

            <textarea
              rows="4"
              name="message"
              placeholder="Message (Optional)"
              value={formData.message}
              onChange={handleChange}
              className="input w-full text-gray-500"
            />

            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-white py-3 px-10 rounded-md font-semibold hover:bg-primary/90 transition disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </div>

            {sent && (
              <p className="text-green-600 text-center pt-4">Application submitted successfully!</p>
            )}
            {error && <p className="text-red-600 text-center pt-4">{error}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
