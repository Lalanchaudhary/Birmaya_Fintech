const faqs = [
  {
    q: "How fast can I get loan approval?",
    a: "Most loans are approved within 24–48 hours after document verification.",
  },
  {
    q: "Do you charge any hidden fees?",
    a: "No. We follow a completely transparent process with no hidden charges.",
  },
  {
    q: "Which documents are required?",
    a: "Basic KYC, income proof and bank statements are usually required.",
  },
  {
    q: "Can I apply with low CIBIL score?",
    a: "Yes, we work with multiple banks & NBFCs to find the best options.",
  },
];

export default function ContactFAQ() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-primary text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-[#F7F9FC] p-6 rounded-xl">
              <h4 className="font-semibold text-primary mb-2">
                {faq.q}
              </h4>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
