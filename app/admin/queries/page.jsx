"use client";

import { useEffect, useState } from "react";

function formatDate(value) {
  try {
    return new Date(value).toLocaleString();
  } catch {
    return "-";
  }
}

export default function AdminQueriesPage() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await fetch("/api/queries");
        const data = await response.json();
        if (data.success) {
          setQueries(data.data);
        }
      } catch {
        console.error("Failed to fetch queries");
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, []);

  return (
    <section className="bg-gray-50 rounded-xl border border-gray-200 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Query Section</h1>

      {loading ? (
        <p className="text-center text-gray-500 py-8">Loading queries...</p>
      ) : queries.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-8 text-center text-gray-500">
          No queries found.
        </div>
      ) : (
        <div className="grid gap-4">
          {queries.map((query) => (
            <div key={query._id} className="bg-white border border-gray-100 rounded-xl p-5">
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                <span><strong>Name:</strong> {query.name}</span>
                <span><strong>Email:</strong> {query.email}</span>
                <span><strong>Phone:</strong> {query.phone}</span>
                <span><strong>City:</strong> {query.city}</span>
                <span><strong>Received:</strong> {formatDate(query.createdAt)}</span>
              </div>
              <p className="mt-4 text-gray-800 whitespace-pre-line">{query.message}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
