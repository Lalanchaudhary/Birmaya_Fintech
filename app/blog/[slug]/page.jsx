import Image from "next/image";
import { notFound } from "next/navigation";
import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";

export const dynamic = "force-dynamic";

export default async function BlogDetail({ params }) {
  await dbConnect();

  const { slug } = await params;
  const blog = await Blog.findOne({ slug }).lean();

  if (!blog) {
    notFound();
  }

  return (
    <section className="py-24 bg-[#F7F9FC]">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-10">
          {blog.title}
        </h1>

        <Image
          src={blog.image}
          alt={blog.title}
          width={900}
          height={500}
          className="rounded-xl mb-10 w-full object-cover"
        />

        <div className="bg-white p-8 md:p-12 rounded-xl shadow-md">
          <p className="text-gray-700 leading-8 whitespace-pre-line text-lg">
            {blog.content}
          </p>
        </div>
      </div>
    </section>
  );
}
