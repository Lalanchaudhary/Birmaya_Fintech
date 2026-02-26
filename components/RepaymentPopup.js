"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function RepaymentPopup() {
  const [expand, setExpand] = useState(false);
  const whatsappLink =
    "https://wa.me/919217924215?text=Hi, I want my detailed Loan Repayment Schedule. Please guide me for ₹99 service.";

  return (
    <section className="w-full px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="bg-gradient-to-r from-primary to-indigo-600 p-8 text-center text-white">
          <h2 className="mb-2 text-2xl font-bold">Get Your Re-Payment Schedule</h2>
          <p className="text-sm text-white/80">
            Complete EMI breakdown & total interest insights
          </p>
        </div>

        <div className="p-8">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-accent px-6 py-3 text-lg font-semibold text-white shadow-md">
              Only Rs.99 - One Time
            </div>
          </div>

          <p className="mb-6 text-center text-sm text-gray-600">
            Understand how much interest you are paying and plan smart repayments.
          </p>

          <button
            onClick={() => setExpand(!expand)}
            className="w-full rounded-xl bg-gray-50 p-4 text-left font-semibold text-primary transition hover:bg-gray-100"
          >
            What is Repayment Schedule?{" "}
            {expand ? (
              <FaAngleUp className="inline-block" />
            ) : (
              <FaAngleDown className="inline-block" />
            )}
          </button>

          {expand && (
            <>
              <div className="mt-4 rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-600">
                A repayment schedule shows month-by-month EMI breakup including
                principal, interest and remaining balance.
              </div>
              <p className="px-4 font-semibold text-gray-700">Why it is important:</p>

              <ul className="ms-3 mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
                <li>Plan your monthly budget</li>
                <li>Know total interest cost</li>
                <li>Track remaining balance</li>
                <li>Decide best prepayment timing</li>
                <a
                  href="/repayment.pdf"
                  download="Loan_Repayment_Schedule_Guide.pdf"
                  className="block text-sm font-medium text-red-500 hover:underline"
                >
                  Learn More (Download PDF)
                </a>
              </ul>
            </>
          )}

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-green-500 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-green-600"
          >
            <FaWhatsapp size={20} />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
