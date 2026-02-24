"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateBlogPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    imageUrl: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("excerpt", formData.excerpt);
      payload.append("content", formData.content);
      payload.append("imageUrl", formData.imageUrl);

      if (imageFile) {
        payload.append("image", imageFile);
      }

      const res = await fetch("/api/blogs", {
        method: "POST",
        body: payload,
      });

      const data = await res.json();

      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }

      if (!data.success) {
        setMessage(data.error || "Failed to create blog.");
        return;
      }

      setMessage("Blog created successfully!");
      setFormData({ title: "", excerpt: "", content: "", imageUrl: "" });
      setImageFile(null);

      setTimeout(() => {
        router.push("/admin/blogs");
      }, 1200);
    } catch {
      setMessage("Something went wrong while creating the blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Create New Blog</h2>

          {message && (
            <div className={`p-4 mb-6 rounded text-center ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter blog title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Short summary shown in blog list"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows="10"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Write full blog content"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full border border-gray-300 p-2.5 rounded-lg bg-white"
                />
                <p className="text-xs text-gray-500 mt-1">JPG, PNG, WEBP up to 5MB</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Or Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="https://example.com/blog-image.jpg"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Publishing..." : "Publish Blog"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
