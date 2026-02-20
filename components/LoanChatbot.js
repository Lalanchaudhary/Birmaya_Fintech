"use client";
import { useState } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";

const responses = {
  hello: "Hi 👋 How can I help you today?",
  loan: "You can apply from Apply Loan page.",
  documents: "Required: Aadhaar, PAN, Bank Statement.",
  interest: "Interest starts from 10.5%",
  approval: "Approval in 24-48 hours.",
  cibil: "Yes, loan possible with low CIBIL.",
  business: "We provide collateral-free business loans.",
  home: "We provide home loans with easy EMI.",
  car: "We provide car loans at low interest.",
};

export default function LoanChatbot() {
  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 I am Loan Assistant. Ask me anything!" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input) return;

    const userMsg = { from: "user", text: input };
    let reply = "Sorry, please contact our team for this query.";

    Object.keys(responses).forEach(key => {
      if (input.toLowerCase().includes(key)) {
        reply = responses[key];
      }
    });

    const botMsg = { from: "bot", text: reply };
    setMessages([...messages, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-34 right-24 w-80 bg-white shadow-2xl rounded-xl overflow-hidden z-50">
          <div className="bg-primary text-white p-4 flex justify-between">
            <span>Loan Assistant</span>
            <FaTimes onClick={()=>setOpen(false)} className="cursor-pointer"/>
          </div>

          <div className="h-80 overflow-y-auto p-4 space-y-3">
            {messages.map((msg,i)=>(
              <div key={i} className={`text-sm p-3 rounded-lg max-w-[80%] ${
                msg.from==="bot"
                ? "bg-gray-100 text-black"
                : "bg-accent text-black ml-auto"
              }`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex border-t">
            <input
              value={input}
              onChange={(e)=>setInput(e.target.value)}
              className="flex-1 p-3 outline-none text-black"
              placeholder="Ask about loans..."
            />
            <button onClick={sendMessage} className="bg-accent text-white px-4">
              Send
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <div
        onClick={()=>setOpen(open=>!open)}
        className="fixed bottom-28 right-6 bg-white text-white p-4 rounded-full cursor-pointer shadow-xl z-50"
      >
        <FaRobot size={24} className="text-primary"/>
      </div>
    </>
  );
}
