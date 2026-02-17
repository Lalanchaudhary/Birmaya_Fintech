"use client";
import { useState } from "react";

export default function ApplicationForm({ job, onClose }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        coverLetter: "",
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // success | error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const res = await fetch("/api/apply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, jobTitle: job.title }),
            });

            const data = await res.json();

            if (data.success) {
                setStatus("success");
                setTimeout(() => {
                    onClose(); // Close modal after 2s
                }, 2000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    if (status === "success") {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center">
                    <div className="text-green-500 text-5xl mb-4">✓</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Application Sent!</h3>
                    <p className="text-gray-600">We will get back to you soon.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-8 rounded-xl shadow-xl max-w-lg w-full relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">Apply for {job.title}</h2>
                <p className="text-gray-500 mb-6 text-sm">{job.location} • {job.type}</p>

                {status === "error" && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
                        Something went wrong. Please try again.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter</label>
                        <textarea
                            name="coverLetter"
                            rows="4"
                            required
                            value={formData.coverLetter}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Tell us why you're a good fit..."
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? "Sending..." : "Submit Application"}
                    </button>
                </form>
            </div>
        </div>
    );
}
