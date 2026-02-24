"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminJobsPage() {
  const router = useRouter();
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
    } catch {
      console.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    const confirmed = window.confirm("Delete this job? This action cannot be undone.");
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }

      if (!response.ok || !data.success) {
        window.alert(data.error || "Failed to delete job");
        return;
      }

      setJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch {
      window.alert("Failed to delete job");
    }
  };

  return (
    <section className="bg-gray-50 rounded-xl border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Job Management</h1>
        <Link
          href="/admin/jobs/create"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Create New Job
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 py-8">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-500 text-lg">No jobs found.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white p-6 rounded-xl border border-gray-100 flex justify-between items-center gap-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                <p className="text-gray-500">{job.location} - {job.type}</p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/jobs/${job._id}/edit`}
                  className="px-3 py-1.5 rounded-lg bg-amber-100 text-amber-800 text-sm font-medium hover:bg-amber-200 transition"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(job._id)}
                  className="px-3 py-1.5 rounded-lg bg-red-100 text-red-700 text-sm font-medium hover:bg-red-200 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
