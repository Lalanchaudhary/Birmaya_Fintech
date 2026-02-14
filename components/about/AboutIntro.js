import Image from "next/image";

export default function AboutIntro() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        <Image
          src="/about/about.jpg"
          alt="about"
          width={500}
          height={400}
          className="rounded-2xl"
        />

        <div>
          <h2 className="text-3xl font-bold text-primary mb-6">
            Who We Are
          </h2>

          <p className="text-gray-600 mb-4">
            Birmaya Fintech is a trusted loan consultancy helping customers
            find the best financial solutions from India’s top banks and NBFCs.
          </p>

          <p className="text-gray-600">
            We simplify the loan process with expert guidance, fast approvals
            and complete transparency.
          </p>
        </div>

      </div>
    </section>
  );
}
