import BlogHero from "@/components/blog/BlogHero";
import BlogGrid from "@/components/blog/BlogGrid";
import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  await dbConnect();
  const blogDocs = await Blog.find({}).sort({ createdAt: -1 }).lean();

  const blogs = blogDocs.map((blog) => ({
    id: String(blog._id),
    slug: blog.slug,
    image: blog.image,
    title: blog.title,
    excerpt: blog.excerpt,
  }));

  return (
    <>
      <BlogHero />
      <BlogGrid blogs={blogs} />
    </>
  );
}
