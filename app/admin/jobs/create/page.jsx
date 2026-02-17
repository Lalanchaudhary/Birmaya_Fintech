"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateJobPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        type: "Full Time",
        description: "",
        requirements: "", // Will be split by newline
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        // Prepare data
        const payload = {
            ...formData,
            requirements: formData.requirements.split("\n").filter((line) => line.trim() !== ""),
        };

        try {
            const res = await fetch("/api/jobs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (data.success) {
                setMessage("Job created successfully!");
                setFormData({ title: "", location: "", type: "Full Time", description: "", requirements: "" });
                setTimeout(() => router.push("/admin/jobs"), 1500);
            } else {
                setMessage(data.error || "Failed to create job.");
            }
        } catch (error) {
            setMessage("An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-24 bg-gray-50 min-h-screen">
            <div className="max-w-3xl mx-auto px-6">
                <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg border border-gray-100">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Create New Job</h2>

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
                                    placeholder="e.g. Senior Developer"
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
                                    placeholder="e.g. Remote / New York"
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
                                placeholder="Job responsibilities and details..."
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
                                placeholder="- React knowledge&#10;- 3+ years experience"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? "Creating..." : "Create Job"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
