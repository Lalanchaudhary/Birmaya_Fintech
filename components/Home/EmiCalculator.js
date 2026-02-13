"use client";
import { useState, useEffect } from "react";

export default function EmiCalculator() {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(5);

  const [emi, setEmi] = useState(0);
  const [interest, setInterest] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;

    const emiValue =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayment = emiValue * months;
    const totalInterest = totalPayment - amount;

    setEmi(Math.round(emiValue));
    setTotal(Math.round(totalPayment));
    setInterest(Math.round(totalInterest));
  }, [amount, rate, years]);

  return (
    <section className="py-14 bg-[#F7F9FC]" id="emi-calculator">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            EMI Calculator
          </h2>
          <p className="text-gray-500 mt-3">
            Calculate your monthly loan EMI instantly
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 bg-white p-10 rounded-3xl shadow-lg">

          {/* Sliders */}
          <div className="space-y-8">

            {/* Loan Amount */}
            <div>
              <label className="font-semibold text-black">Loan Amount</label>
              <input
                type="range"
                min="50000"
                max="5000000"
                step="50000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full accent-accent"
              />
              <p className="text-accent font-bold">₹ {amount}</p>
            </div>

            {/* Interest */}
            <div>
              <label className="font-semibold text-black">Interest Rate (%)</label>
              <input
                type="range"
                min="5"
                max="20"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full accent-accent"
              />
              <p className="text-accent font-bold">{rate}%</p>
            </div>

            {/* Tenure */}
            <div>
              <label className="font-semibold text-black">Loan Tenure (Years)</label>
              <input
                type="range"
                min="1"
                max="30"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="w-full accent-accent"
              />
              <p className="text-accent font-bold">{years} Years</p>
            </div>
          </div>

          {/* Result Cards */}
          <div className="flex flex-col justify-center gap-6">

            <div className="bg-primary text-white p-6 rounded-xl">
              <p>Monthly EMI</p>
              <h3 className="text-3xl font-bold">₹ {emi}</h3>
            </div>

            <div className="bg-gray-100 p-6 rounded-xl text-black">
              <p>Total Interest</p>
              <h3 className="text-2xl font-bold text-primary">₹ {interest}</h3>
            </div>

            <div className="bg-gray-100 p-6 rounded-xl text-black">
              <p>Total Payment</p>
              <h3 className="text-2xl font-bold text-primary">₹ {total}</h3>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
