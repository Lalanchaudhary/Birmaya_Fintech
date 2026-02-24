"use client";

import { useEffect, useState } from "react";

function formatDate(value) {
  try {
    return new Date(value).toLocaleString();
  } catch {
    return "-";
  }
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch("/api/chatbot-leads");
        const data = await response.json();
        if (data.success) {
          setLeads(data.data);
        }
      } catch {
        console.error("Failed to fetch leads");
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  return (
    <section className="bg-gray-50 rounded-xl border border-gray-200 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">LoanChat Leads</h1>

      {loading ? (
        <p className="text-center text-gray-500 py-8">Loading leads...</p>
      ) : leads.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-8 text-center text-gray-500">
          No leads found.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl border border-gray-100">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="text-left px-4 py-3 ">Name</th>
                <th className="text-left px-4 py-3">Email</th>
                <th className="text-left px-4 py-3">Phone</th>
                <th className="text-left px-4 py-3">Loan Type</th>
                <th className="text-left px-4 py-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} className="border-t border-gray-100 text-gray-700 hover:bg-gray-50">
                  <td className="px-4 py-3">{lead.name}</td>
                  <td className="px-4 py-3">{lead.email}</td>
                  <td className="px-4 py-3">{lead.phone}</td>
                  <td className="px-4 py-3">{lead.loanType}</td>
                  <td className="px-4 py-3">{formatDate(lead.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
