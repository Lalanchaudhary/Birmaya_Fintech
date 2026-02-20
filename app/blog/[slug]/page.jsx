import Image from "next/image";
import { blogs } from "@/data/blogs";
import { notFound } from "next/navigation";

export default function BlogDetail({ params }) {
  const blog = blogs.find((b) => b.slug === params.slug);

  if (!blog) return notFound();

  return (
    <section className="py-24 bg-[#F7F9FC]">
      <div className="max-w-4xl mx-auto px-6">

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-10">
          {blog.title}
        </h1>

        {/* Image */}
        <Image
          src={blog.image}
          alt={blog.title}
          width={900}
          height={500}
          className="rounded-xl mb-10 w-full object-cover"
        />

        {/* Content */}
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-md">
          <p className="text-gray-700 leading-8 whitespace-pre-line text-lg">
            {blog.content}
          </p>
        </div>

      </div>
    </section>
  );
}
