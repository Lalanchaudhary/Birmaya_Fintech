"use client";
import { useEffect, useRef, useState } from "react";
import { FaPaperPlane, FaRobot, FaTimes } from "react-icons/fa";

const loanOptions = [
  "Business Loan",
  "Home Loan",
  "Loan Against Property",
  "Auto Loan",
  "Working Capital Limit",
  "Unsecured OD Limit",
  "Instant Car Valuation",
  "Used Car Loan",
  "New Car Loan",
  "Machinery Loan",
  "Personal Loan"
];

const quickQuestions = [
  "What is the interest rate?",
  "What documents are required?",
  "How long does approval take?",
  "What is the eligibility criteria?"
];

function getBotReply(question, loanType) {
  const q = question.toLowerCase();
  const selectedLoanType = loanType || "loan";

  if (q.includes("interest") || q.includes("rate") || q.includes("roi")) {
    return `Interest rates for ${selectedLoanType} depend on profile, income, and credit score. Our team checks best available lender offers and shares the most suitable option.`;
  }

  if (q.includes("eligibility") || q.includes("eligible") || q.includes("criteria")) {
    return `Eligibility for ${selectedLoanType} usually depends on age, income, employment/business stability, existing EMI obligations, and credit history.`;
  }

  if (q.includes("document") || q.includes("docs") || q.includes("paper")) {
    return "Common documents: PAN, Aadhaar, address proof, income proof/bank statements, and business/property/vehicle documents based on the loan type.";
  }

  if (q.includes("emi") || q.includes("installment") || q.includes("monthly")) {
    return "EMI is calculated using loan amount, tenure, and final interest rate. Share your amount and tenure preference, and we can estimate your EMI quickly.";
  }

  if (q.includes("disbursal") || q.includes("approval") || q.includes("process") || q.includes("time")) {
    return "Approval and disbursal timelines vary by lender and document readiness. In many cases, pre-approval can be quick once documents are complete.";
  }

  if (q.includes("cibil") || q.includes("credit score") || q.includes("score")) {
    return "A stronger credit score improves approval chances and helps with better interest rates. Lower scores may still be considered with suitable lender options.";
  }

  if (q.includes("charge") || q.includes("fee") || q.includes("processing") || q.includes("prepayment")) {
    return "Charges can include processing fee, documentation fee, and in some products prepayment/foreclosure terms. We share lender-wise charges before final submission.";
  }

  if (q.includes("contact") || q.includes("call") || q.includes("when") || q.includes("team")) {
    return "Our loan advisor will contact you shortly using the details you submitted and guide you end-to-end.";
  }

  return "I can help with eligibility, interest rates, required documents, EMI, approval timelines, and charges. Please ask your question in detail.";
}

export default function LoanChatbot() {
  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Are you looking for a quick loan? Please select a loan type." }
  ]);
  const [selectedLoan, setSelectedLoan] = useState("");
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [question, setQuestion] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!open) {
        return;
      }

      if (chatContainerRef.current && !chatContainerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open]);

  useEffect(() => {
    const handleOpenFromPopup = () => {
      setOpen(true);
    };

    window.addEventListener("open-loan-chatbot", handleOpenFromPopup);

    return () => {
      window.removeEventListener("open-loan-chatbot", handleOpenFromPopup);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showForm, leadCaptured]);

  const handleOptionClick = (option) => {
    if (selectedLoan) {
      return;
    }

    const userMsg = { from: "user", text: option };
    const botMsg = {
      from: "bot",
      text: "Please provide your contact details before we proceed."
    };

    setSelectedLoan(option);
    setSubmitError("");
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setShowForm(true);
  };

  const addQuestionAndReply = (questionText) => {
    const cleanQuestion = questionText.trim();
    if (!cleanQuestion || !leadCaptured) {
      return;
    }

    const answer = getBotReply(cleanQuestion, selectedLoan);
    setMessages((prev) => [
      ...prev,
      { from: "user", text: cleanQuestion },
      { from: "bot", text: answer }
    ]);
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    addQuestionAndReply(question);
    setQuestion("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !selectedLoan) {
      setSubmitError("Please fill all fields before submitting.");
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError("");

      const response = await fetch("/api/chatbot-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          loanType: selectedLoan
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to submit details");
      }

      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Thank you. Your details are saved successfully." },
        { from: "bot", text: `You can now ask questions about ${selectedLoan}.` }
      ]);

      setLeadCaptured(true);
      setShowForm(false);
      setFormData({ name: "", email: "", phone: "" });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div ref={chatContainerRef}>
      {open && (
        <div className="fixed bottom-34 right-24 w-96 bg-white shadow-2xl rounded-xl overflow-hidden z-50">
          <div
            className="text-white p-4 flex justify-between items-center"
            style={{ backgroundColor: "#272361" }}
          >
            <span className="font-bold">BIRMAYA FINTECH</span>
            <FaTimes onClick={() => setOpen(false)} className="cursor-pointer" />
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-3 bg-gray-100">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`text-sm p-3 rounded-lg max-w-[85%] ${
                  msg.from === "bot"
                    ? "bg-gray-200 text-black"
                    : "text-white ml-auto"
                }`}
                style={msg.from === "user" ? { backgroundColor: "#f78812" } : {}}
              >
                {msg.text}
              </div>
            ))}

            {messages.length === 1 && !selectedLoan && (
              <div className="grid grid-cols-2 gap-2 mt-3">
                {loanOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className="text-white text-xs px-3 py-2 rounded-full transition"
                    style={{ backgroundColor: "#f78812" }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {showForm && (
              <div
                className="p-4 rounded-xl mt-3 text-white"
                style={{ backgroundColor: "#272361" }}
              >
                <p className="font-semibold mb-1">Please enter your contact information</p>
                <p className="text-xs mb-3 opacity-90">Selected: {selectedLoan}</p>

                {submitError && (
                  <p className="text-xs mb-3 rounded bg-red-100 text-red-700 px-2 py-1">
                    {submitError}
                  </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 rounded text-black bg-white"
                    required
                  />

                  <input
                    type="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2 rounded text-black bg-white"
                    required
                  />

                  <div className="flex">
                    <span className="bg-white text-black px-3 flex items-center rounded-l">+91</span>
                    <input
                      type="tel"
                      placeholder="Phone *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2 rounded-r text-black bg-white"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-2 rounded text-white disabled:opacity-60"
                    style={{ backgroundColor: "#f78812" }}
                  >
                    {submitting ? "Submitting..." : "Submit"}
                  </button>
                </form>
              </div>
            )}

            {leadCaptured && (
              <div className="space-y-3 mt-2">
                <p className="text-xs text-gray-600">Ask your question:</p>

                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => addQuestionAndReply(item)}
                      className="text-[11px] px-2 py-1 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleQuestionSubmit} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Type your question..."
                    className="flex-1 text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-lg text-white"
                    style={{ backgroundColor: "#272361" }}
                    aria-label="Send question"
                  >
                    <FaPaperPlane size={14} />
                  </button>
                </form>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      <div
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-28 right-6 p-4 rounded-full cursor-pointer shadow-xl z-50"
        style={{ backgroundColor: "#272361" }}
      >
        <FaRobot size={24} className="text-white" />
      </div>
    </div>
  );
}
