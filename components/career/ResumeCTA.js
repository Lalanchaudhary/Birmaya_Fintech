"use client";

import { useState } from "react";

const MAX_RESUME_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export default function ResumeCTA() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;

    if (!file) {
      setResumeFile(null);
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Only PDF, DOC, and DOCX files are allowed.");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_RESUME_SIZE) {
      setError("Resume must be 5MB or less.");
      e.target.value = "";
      return;
    }

    setError("");
    setResumeFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    setError("");

    if (!resumeFile) {
      setLoading(false);
      setError("Please upload your resume.");
      return;
    }

    try {
      const payload = new FormData();
      payload.append("name", name.trim());
      payload.append("email", email.trim().toLowerCase());
      payload.append("resume", resumeFile);

      const response = await fetch("/api/resume", {
        method: "POST",
        body: payload,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to send resume.");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setResumeFile(null);
    } catch (err) {
      setStatus("error");
      setError(err.message || "Failed to send resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-primary text-white text-center">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Don&apos;t see a role that fits?
        </h2>
        <p className="text-white/80 mb-8">
          Send your resume and we&apos;ll contact you when a suitable role opens.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-lg p-3 text-black bg-white"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg p-3 text-black bg-white"
          />
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            required
            onChange={handleFileChange}
            className="w-full rounded-lg p-3 bg-white text-black file:mr-3 file:rounded-md file:border-0 file:bg-accent file:px-3 file:py-2 file:text-white"
          />

          <p className="text-xs text-white/80">PDF, DOC, DOCX (max 5MB)</p>

          {status === "success" && (
            <p className="text-green-300 text-sm">Resume sent successfully.</p>
          )}

          {error && <p className="text-red-300 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-accent px-8 py-3 rounded-lg font-semibold disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Resume"}
          </button>
        </form>
      </div>
    </section>
  );
}
