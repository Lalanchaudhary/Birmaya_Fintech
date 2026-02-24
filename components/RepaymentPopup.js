"use client";
import { useState, useEffect } from "react";
import { FaWhatsapp, FaTimes } from "react-icons/fa";
import { FaAngleDown , FaAngleUp } from "react-icons/fa";
export default function RepaymentPopup() {
  const [show, setShow] = useState(false);
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShow(false);
    window.dispatchEvent(new CustomEvent("open-loan-chatbot"));
  };

  if (!show) return null;

  const whatsappLink = "https://wa.me/918287868048?text=Hi, I want my detailed Loan Repayment Schedule. Please guide me for ?99 service.";

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-fadeIn relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
        >
          <FaTimes size={18} />
        </button>

        <div className="bg-gradient-to-r from-primary to-indigo-600 text-white p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">
            Get Your Re-Payment Schedule
          </h2>
          <p className="text-white/80 text-sm">
            Complete EMI breakdown & total interest insights
          </p>
        </div>

        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-accent text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md">
              Only ₹99 - One Time
            </div>
          </div>

          <p className="text-gray-600 text-center text-sm mb-6">
            Understand how much interest you are paying and plan smart repayments.
          </p>

          <button
            onClick={() => setExpand(!expand)}
            className="w-full text-left bg-gray-50 hover:bg-gray-100 p-4 rounded-xl font-semibold text-primary transition"
          >
            What is Repayment Schedule? {expand ? <FaAngleUp className='inline-block' /> : <FaAngleDown className='inline-block'/>}
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
