"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok || !data.success) {
                setError(data.error || "Login failed");
                return;
            }

            router.push("/admin/blogs");
            router.refresh();
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-20">
            <div className="w-full max-w-md bg-white border border-gray-100 rounded-xl shadow-sm p-8">
                <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
                <p className="text-sm text-gray-500 mt-2">Sign in to access the admin dashboard.</p>

                {error && (
                    <div className="mt-5 rounded-lg bg-red-50 text-red-700 text-sm px-4 py-3">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white rounded-lg py-2.5 font-semibold hover:bg-blue-700 transition disabled:opacity-60"
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </form>
            </div>
        </section>
    );
}
