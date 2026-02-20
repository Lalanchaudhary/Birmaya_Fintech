"use client";
import { useState, useEffect } from "react";
import { FaWhatsapp, FaTimes } from "react-icons/fa";

export default function RepaymentPopup() {
  const [show, setShow] = useState(false);
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handlePayment = async () => {
    const res = await fetch("/api/create-order", {
      method: "POST",
    });

    const order = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      name: "Birmaya Fintech",
      description: "Repayment Schedule Service",
      handler: function (response) {
        alert("Payment successful! Processing...");
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (!show) return null;

  const whatsappLink = `https://wa.me/918287868048?text=Hi, I want my detailed Loan Repayment Schedule. Please guide me for ₹99 service.`;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">

      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-fadeIn relative">

        {/* Close */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
        >
          <FaTimes size={18} />
        </button>

        {/* Premium Header */}
        <div className="bg-gradient-to-r from-primary to-indigo-600 text-white p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">
            Get Your Re-Payment Schedule
          </h2>
          <p className="text-white/80 text-sm">
            Complete EMI breakdown & total interest insights
          </p>
        </div>

        {/* Body */}
        <div className="p-8">

          {/* Price Badge */}
          <div className="flex justify-center mb-6">
            <div className="bg-accent text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md">
              Only ₹99 – One Time
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-center text-sm mb-6">
            Understand how much interest you are paying and plan smart repayments.
          </p>

          {/* Expandable Info */}
          <button
            onClick={() => setExpand(!expand)}
            className="w-full text-left bg-gray-50 hover:bg-gray-100 p-4 rounded-xl font-semibold text-primary transition"
          >
            What is Repayment Schedule? {expand ? "▲" : "▼"}
          </button>

          {expand && (
            <>
              <div className="mt-4 text-gray-600 text-sm leading-6 bg-gray-50 p-4 rounded-xl">
                A repayment schedule shows month-by-month EMI breakup including
                principal, interest and remaining balance.
              </div>
              <p className="font-semibold px-4 text-gray-700">
                Why it is important:
              </p>

              <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm ms-3 mt-2">
                <li>Plan your monthly budget</li>
                <li>Know total interest cost</li>
                <li>Track remaining balance</li>
                <li>Decide best prepayment timing</li>
                <a
                href="/repayment.pdf"
                download="Loan_Repayment_Schedule_Guide.pdf"
                className="text-red-500 hover:underline block text-sm font-medium"
              >
                Learn More (Download PDF)
              </a>
              </ul>
              
            </>
          )}

          {/* CTA */}
          <a
            href={whatsappLink}
            target="_blank"
            className="mt-8 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold text-lg transition shadow-lg"
          >
            <FaWhatsapp size={20} />
            Chat on WhatsApp
          </a>

        </div>

      </div>
    </div>
  );
}