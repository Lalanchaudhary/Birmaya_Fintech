"use client";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSent(false);

    try {
      const response = await fetch("/api/queries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || "Failed to submit query");
        return;
      }

      setSent(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        city: "",
        message: "",
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-[#F4F6FA]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white p-10 md:p-14 rounded-xl shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-10 flex items-center gap-3">
            Connect with our support team
            <span className="text-accent text-4xl">&rarr;</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="border-2 border-primary/40 p-4 rounded-md outline-none focus:border-primary text-black"
              />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Mobile"
                required
                className="border-2 border-primary/40 p-4 rounded-md outline-none focus:border-primary text-black"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email ID"
                required
                className="border-2 border-primary/40 p-4 rounded-md outline-none focus:border-primary text-black"
              />

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                required
                className="border-2 border-primary/40 p-4 rounded-md outline-none focus:border-primary text-black"
              />
            </div>

            <textarea
              rows="5"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              required
              className="w-full border-2 border-primary/40 p-4 rounded-md outline-none focus:border-primary text-black"
            />

            <div className="text-center pt-4">
              <button
                disabled={loading}
                className="bg-primary text-white py-3 px-10 rounded-md font-semibold hover:bg-primary/90 transition disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>

            {sent && (
              <p className="text-green-600 text-center pt-4">
                Thank you! Our team will contact you soon.
              </p>
            )}

            {error && (
              <p className="text-red-600 text-center pt-4">{error}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
