"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminBlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        const data = await response.json();
        if (data.success) {
          setBlogs(data.data);
        }
      } catch {
        console.error("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    const confirmed = window.confirm("Delete this blog? This action cannot be undone.");
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }

      if (!response.ok || !data.success) {
        window.alert(data.error || "Failed to delete blog");
        return;
      }

      setBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
    } catch {
      window.alert("Failed to delete blog");
    }
  };

  return (
    <section className="bg-gray-50 rounded-xl border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Blog Management</h1>
        <Link
          href="/admin/blogs/create"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Create Blog
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 py-8">Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-500 text-lg">No blogs found.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white p-6 rounded-xl border border-gray-100 flex justify-between items-center gap-4"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{blog.title}</h3>
                <p className="text-gray-500 text-sm">/{blog.slug}</p>
                <p className="text-gray-600 mt-2">{blog.excerpt}</p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/blogs/${blog._id}/edit`}
                  className="px-3 py-1.5 rounded-lg bg-amber-100 text-amber-800 text-sm font-medium hover:bg-amber-200 transition"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(blog._id)}
                  className="px-3 py-1.5 rounded-lg bg-red-100 text-red-700 text-sm font-medium hover:bg-red-200 transition"
                >
                  Delete
                </button>
                <Link
                  href={`/blog/${blog.slug}`}
                  target="_blank"
                  className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
