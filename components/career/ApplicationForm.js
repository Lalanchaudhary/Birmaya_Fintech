"use client";
import { useState } from "react";

const MAX_RESUME_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export default function ApplicationForm({ job, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0] || null;

    if (!file) return setResumeFile(null);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setErrorMessage("Only PDF, DOC, and DOCX files are allowed.");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_RESUME_SIZE) {
      setErrorMessage("Resume must be 5MB or less.");
      e.target.value = "";
      return;
    }

    setErrorMessage("");
    setResumeFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resumeFile) {
      setStatus("error");
      setErrorMessage("Please upload your resume.");
      return;
    }

    setLoading(true);
    setStatus(null);
    setErrorMessage("");

    try {
      const payload = new FormData();
      payload.append("name", formData.name.trim());
      payload.append("email", formData.email.trim().toLowerCase());
      payload.append("phone", formData.phone.trim());
      payload.append("coverLetter", formData.coverLetter.trim());
      payload.append("jobTitle", job.title);
      payload.append("resume", resumeFile);

      // Honeypot
      payload.append("website", "");

      const res = await fetch("/api/apply", {
        method: "POST",
        body: payload,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Submission failed");
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", coverLetter: "" });
      setResumeFile(null);

      setTimeout(() => onClose(), 2000);

    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full border border-gray-300 bg-white text-gray-900 placeholder-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#272361] focus:border-[#f78812]";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-lg w-full relative max-h-[90vh] overflow-y-auto">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-[#272361] mb-2">
          Apply for {job.title}
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          {job.location} • {job.type}
        </p>

        {status === "error" && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
            {errorMessage}
          </div>
        )}

        {status === "success" && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm text-center">
            ✓ Application Sent Successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Honeypot hidden field */}
          <input type="text" name="website" style={{ display: "none" }} />

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
            className={inputStyle}
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              className={inputStyle}
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <div>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              required
              onChange={handleResumeChange}
              className={inputStyle}
            />
            {resumeFile && (
              <p className="text-xs text-gray-600 mt-1">
                Selected: {resumeFile.name}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              PDF, DOC, DOCX (max 5MB)
            </p>
          </div>

          <textarea
            name="coverLetter"
            rows="4"
            required
            value={formData.coverLetter}
            onChange={handleChange}
            placeholder="Tell us why you're a good fit..."
            className={inputStyle}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#272361] text-white py-3 rounded-lg font-semibold hover:bg-[#1d1a4d] transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
}
