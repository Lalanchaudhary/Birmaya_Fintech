import Image from "next/image";
import Link from "next/link";
const blogs = [
  {
    slug: "improve-credit-score",
    img: "/blogs/blog1.png",
    title: "How to Improve Your Credit Score Fast",
    desc: "Simple tips to boost your CIBIL score and get loan approval easily.",
  },
  {
    img: "/blogs/blog2.png",
    title: "Personal Loan vs Credit Card – Which is Better?",
    desc: "Understand the difference and choose the right option.",
  },
  {
    img: "/blogs/blog3.png",
    title: "Top Documents Required for Loan Approval",
    desc: "Keep these documents ready before applying for loan.",
  },
  {
    img: "/blogs/blog4.png",
    title: "How EMI is Calculated? Complete Guide",
    desc: "Learn how banks calculate EMI and interest.",
  },
  {
    img: "/blogs/blog5.png",
    title: "Best Time to Take a Home Loan",
    desc: "Know when is the right time to apply for home loan.",
  },
  {
    img: "/blogs/blog6.png",
    title: "Common Loan Rejection Reasons",
    desc: "Avoid these mistakes to get instant loan approval.",
  },
];

export default function BlogGrid() {
  return (
    <section className="py-24 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog, i) => (
            <Link href={`/blog/${blog.slug}`} key={i} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">

              <Image
                src={blog.img}
                alt={blog.title}
                width={400}
                height={250}
                className="w-full h-[220px] object-contain"
              />

              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-3">
                  {blog.title}
                </h3>

                <p className="text-gray-600 mb-4">
                  {blog.desc}
                </p>

                <p className="text-accent font-semibold">
                  Read More →
                </p>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
