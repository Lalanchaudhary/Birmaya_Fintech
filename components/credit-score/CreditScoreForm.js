"use client";

import { useState } from "react";

const INITIAL_FORM = {
  gender: "",
  fullName: "",
  dob: "",
  pinCode: "",
  pan: "",
  email: "",
  mobile: "",
  consent: false,
  whatsappUpdates: true,
  website: "",
};

export default function CreditScoreForm() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const whatsappNumber = "919217924215";

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/credit-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        setError(data.error || "Unable to submit the form.");
        return;
      }

      setSuccess("Details submitted successfully. Our team will contact you.");
      const whatsappMessage = `Hi, I submitted the Free Credit Score form. Name: ${formData.fullName}, Mobile: ${formData.mobile}.`;
      const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`;
      window.location.href = whatsappLink;
      setFormData(INITIAL_FORM);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#f6f6f6] py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="rounded-md bg-white p-6 shadow-sm md:p-10">
          <h1 className="text-2xl font-bold text-primary md:text-3xl">Check Free Credit Score</h1>
          <p className="mt-2 text-sm text-gray-600">
            Fill in your details exactly as per your bank records.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="flex flex-wrap gap-6 text-gray-700">
              <label className="flex cursor-pointer items-center gap-2 text-base font-medium">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  required
                  className="h-4 w-4 accent-primary"
                />
                Male
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-base font-medium">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                  required
                  className="h-4 w-4 accent-primary"
                />
                Female
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <label className="block">
                <span className="mb-2 block text-lg font-semibold text-gray-700">Full Name</span>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="As per your bank record"
                  required
                  className="w-full rounded-sm border border-gray-300 px-4 py-3 text-gray-800 outline-none focus:border-primary"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-lg font-semibold text-gray-700">Date Of Birth</span>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  className="w-full rounded-sm border border-gray-300 px-4 py-3 text-gray-800 outline-none focus:border-primary"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-lg font-semibold text-gray-700">Pin Code</span>
                <input
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleChange}
                  placeholder="As per your bank record"
                  required
                  maxLength={6}
                  pattern="\d{6}"
                  inputMode="numeric"
                  className="w-full rounded-sm border border-gray-300 px-4 py-3 text-gray-800 outline-none focus:border-primary"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-lg font-semibold text-gray-700">PAN</span>
                <input
                  type="text"
                  name="pan"
                  value={formData.pan}
                  onChange={(event) => {
                    const value = event.target.value.toUpperCase();
                    setFormData((prev) => ({ ...prev, pan: value }));
                  }}
                  placeholder="Permanent Account Number"
                  required
                  maxLength={10}
                  className="w-full rounded-sm border border-gray-300 px-4 py-3 text-gray-800 outline-none focus:border-primary"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-lg font-semibold text-gray-700">Email Address</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="As per your bank"
                  required
                  className="w-full rounded-sm border border-gray-300 px-4 py-3 text-gray-800 outline-none focus:border-primary"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-lg font-semibold text-gray-700">Mobile Number</span>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="As per your bank"
                  required
                  maxLength={10}
                  pattern="\d{10}"
                  inputMode="numeric"
                  className="w-full rounded-sm border border-gray-300 px-4 py-3 text-gray-800 outline-none focus:border-primary"
                />
                <p className="mt-2 text-sm font-semibold text-primary">
                  Note: Please use the mobile number registered with your Credit Card/Loan account.
                </p>
              </label>
            </div>

            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              autoComplete="off"
              className="hidden"
              tabIndex={-1}
            />

            <label className="flex items-start gap-3 text-lg font-semibold text-gray-700">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                required
                className="mt-1 h-4 w-4 rounded accent-primary"
              />
              I hereby appoint Birmaya as my authorised representative to receive my credit information
              from Cibil / Equifax / Experian / CRIF Highmark (bureau).
            </label>

            <label className="flex items-center justify-between rounded-sm bg-gray-100 px-4 py-3">
              <span className="text-lg font-semibold text-gray-700">
                Get regular Credit Report updates via Whatsapp
              </span>
              <input
                type="checkbox"
                name="whatsappUpdates"
                checked={formData.whatsappUpdates}
                onChange={handleChange}
                className="h-5 w-5 accent-primary"
              />
            </label>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="rounded-md bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Submitting..." : "Check Free Credit Score"}
              </button>
            </div>

            {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
            {success ? <p className="text-sm font-medium text-green-600">{success}</p> : null}
          </form>
        </div>
      </div>
    </section>
  );
}
