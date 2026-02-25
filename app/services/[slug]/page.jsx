import Link from "next/link";
import { notFound } from "next/navigation";
import { loanDetailMap, loanDetails } from "@/data/loanDetails";

export function generateStaticParams() {
  return loanDetails.map((loan) => ({ slug: loan.slug }));
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const loan = loanDetailMap[slug];
  if (!loan) notFound();

  return (
    <main className="bg-[#F7F9FC] min-h-screen">
      <section className="bg-primary text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-white/80 text-sm mb-3">Our Services</p>
          <h1 className="text-3xl md:text-5xl font-bold">{loan.title}</h1>
          <p className="text-white/90 mt-4 text-base md:text-lg">{loan.overview}</p>
          <Link
            href="/services"
            className="inline-block mt-6 text-sm md:text-base font-semibold text-accent bg-white px-4 py-2 rounded-lg"
          >
            Back to Services
          </Link>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <DetailCard title="Key Features" items={loan.keyFeatures} />
              {loan.typeof&&<DetailCard title="Type of" items={loan.typeof} />}
          {loan.howItWorks&&<DetailCard title="How it's work" items={loan.howItWorks} />}
          <DetailCard title="Eligibility Criteria" items={loan.eligibility} />
          <DetailCard title="Documents Required" items={loan.documents} />
          <DetailCard title="Advantages" items={loan.advantages} />
          <DetailCard title="Things To Check Before Applying" items={loan.thingsToCheck} />
          {loan.example&&<DetailCard title="Example" items={loan.example} />}
        </div>
      </section>
    </main>
  );
}

function DetailCard({ title, items }) {
  return (
    <article className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
      <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">{title}</h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="text-gray-700 leading-relaxed">
            - {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
