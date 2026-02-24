"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const blogId = params?.id;

  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    imageUrl: "",
  });

  useEffect(() => {
    const loadBlog = async () => {
      if (!blogId) {
        return;
      }

      try {
        const response = await fetch(`/api/blogs/${blogId}`);
        const data = await response.json();

        if (!response.ok || !data.success) {
          setMessage(data.error || "Failed to load blog");
          return;
        }

        setFormData({
          title: data.data.title || "",
          excerpt: data.data.excerpt || "",
          content: data.data.content || "",
          imageUrl: data.data.image || "",
        });
        setCurrentImage(data.data.image || "");
      } catch {
        setMessage("Failed to load blog");
      } finally {
        setLoadingData(false);
      }
    };

    loadBlog();
  }, [blogId]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
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

      const response = await fetch(`/api/blogs/${blogId}`, {
        method: "PUT",
        body: payload,
      });

      const data = await response.json();

      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }

      if (!response.ok || !data.success) {
        setMessage(data.error || "Failed to update blog");
        return;
      }

      setMessage("Blog updated successfully!");
      setTimeout(() => router.push("/admin/blogs"), 1000);
    } catch {
      setMessage("Failed to update blog");
    } finally {
      setSaving(false);
    }
  };

  if (loadingData) {
    return <div className="bg-white rounded-xl border border-gray-100 p-8 text-gray-500">Loading...</div>;
  }

  return (
    <section className="bg-gray-50 rounded-xl border border-gray-200 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-xl border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Edit Blog</h2>

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
              />
            </div>

            {currentImage && (
              <div>
                <p className="block text-sm font-medium text-gray-700 mb-2">Current Image</p>
                <Image
                  src={currentImage}
                  alt="Current blog"
                  width={300}
                  height={180}
                  className="rounded-lg border border-gray-200 object-cover"
                />
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload New Image</label>
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
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Update Blog"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
