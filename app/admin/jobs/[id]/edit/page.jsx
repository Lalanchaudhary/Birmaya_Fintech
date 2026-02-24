"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditJobPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params?.id;

  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    type: "Full Time",
    description: "",
    requirements: "",
  });

  useEffect(() => {
    const loadJob = async () => {
      if (!jobId) {
        return;
      }

      try {
        const response = await fetch(`/api/jobs/${jobId}`);
        const data = await response.json();

        if (!response.ok || !data.success) {
          setMessage(data.error || "Failed to load job");
          return;
        }

        setFormData({
          title: data.data.title || "",
          location: data.data.location || "",
          type: data.data.type || "Full Time",
          description: data.data.description || "",
          requirements: Array.isArray(data.data.requirements) ? data.data.requirements.join("\n") : "",
        });
      } catch {
        setMessage("Failed to load job");
      } finally {
        setLoadingData(false);
      }
    };

    loadJob();
  }, [jobId]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          requirements: formData.requirements.split("\n").filter((line) => line.trim() !== ""),
        }),
      });

      const data = await response.json();

      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }

      if (!response.ok || !data.success) {
        setMessage(data.error || "Failed to update job");
        return;
      }

      setMessage("Job updated successfully!");
      setTimeout(() => router.push("/admin/jobs"), 1000);
    } catch {
      setMessage("Failed to update job");
    } finally {
      setSaving(false);
    }
  };

  if (loadingData) {
    return <div className="bg-white rounded-xl border border-gray-100 p-8 text-gray-500">Loading...</div>;
  }

  return (
    <section className="bg-gray-50 rounded-xl border border-gray-200 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-xl border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Edit Job</h2>

          {message && (
            <div className={`p-4 mb-6 rounded text-center ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Requirements (One per line)</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows="4"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Update Job"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
