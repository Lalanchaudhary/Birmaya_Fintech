import Image from "next/image";
import Link from "next/link";

export default function BlogGrid({ blogs = [] }) {
  return (
    <section className="py-24 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-6">
        {blogs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center text-gray-500">
            No blog posts published yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogs.map((blog) => (
              <Link
                href={`/blog/${blog.slug}`}
                key={blog.id || blog.slug}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={400}
                  height={250}
                  className="w-full h-[220px] object-cover"
                />

                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-3">{blog.title}</h3>
                  <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                  <p className="text-accent font-semibold">Read More -&gt;</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
