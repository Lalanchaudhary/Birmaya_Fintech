"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminJobsPage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await fetch("/api/jobs");
            const data = await res.json();
            if (data.success) {
                setJobs(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch jobs");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-24 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-800">Job Management</h1>
                    <Link
                        href="/admin/jobs/create"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        + Create New Job
                    </Link>
                </div>

                {loading ? (
                    <p className="text-center text-gray-500">Loading jobs...</p>
                ) : jobs.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                        <p className="text-gray-500 text-lg">No jobs found.</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {jobs.map((job) => (
                            <div key={job._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                                    <p className="text-gray-500">{job.location} • {job.type}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Active</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
