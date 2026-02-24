"use client";
import { useMemo, useState } from "react";

export default function EmiCalculator() {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(5);

  const { emi, interest, total } = useMemo(() => {
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;

    const emiValue =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayment = emiValue * months;
    const totalInterest = totalPayment - amount;

    return {
      emi: Math.round(emiValue),
      total: Math.round(totalPayment),
      interest: Math.round(totalInterest),
    };
  }, [amount, rate, years]);

  const handleAmountChange = (value) => {
    const parsedValue = Number(value);
    if (Number.isNaN(parsedValue)) return;
    const clampedValue = Math.min(Math.max(parsedValue, 50000), 100000000);
    setAmount(clampedValue);
  };

  const handleRateChange = (value) => {
    const parsedValue = Number(value);
    if (Number.isNaN(parsedValue)) return;
    const clampedValue = Math.min(Math.max(parsedValue, 5), 20);
    setRate(clampedValue);
  };

  const handleYearsChange = (value) => {
    const parsedValue = Number(value);
    if (Number.isNaN(parsedValue)) return;
    const clampedValue = Math.min(Math.max(parsedValue, 1), 30);
    setYears(clampedValue);
  };

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
                max="100000000"
                step="50000"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                className="w-full accent-accent"
              />
              <input
                type="number"
                min="50000"
                max="100000000"
                step="50000"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                className="w-full mt-3 border border-gray-300 rounded-lg px-3 py-2 text-black"
                placeholder="Enter loan amount"
              />
              <p className="text-accent font-bold">Rs {amount}</p>
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
                onChange={(e) => handleRateChange(e.target.value)}
                className="w-full accent-accent"
              />
              <input
                type="number"
                min="5"
                max="20"
                step="0.1"
                value={rate}
                onChange={(e) => handleRateChange(e.target.value)}
                className="w-full mt-3 border border-gray-300 rounded-lg px-3 py-2 text-black"
                placeholder="Enter interest rate"
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
                onChange={(e) => handleYearsChange(e.target.value)}
                className="w-full accent-accent"
              />
              <input
                type="number"
                min="1"
                max="30"
                value={years}
                onChange={(e) => handleYearsChange(e.target.value)}
                className="w-full mt-3 border border-gray-300 rounded-lg px-3 py-2 text-black"
                placeholder="Enter loan tenure in years"
              />
              <p className="text-accent font-bold">{years} Years</p>
            </div>
          </div>

          {/* Result Cards */}
          <div className="flex flex-col justify-center gap-6">
            <div className="bg-primary text-white p-6 rounded-xl">
              <p>Monthly EMI</p>
              <h3 className="text-3xl font-bold">Rs {emi}</h3>
            </div>

            <div className="bg-gray-100 p-6 rounded-xl text-black">
              <p>Total Interest</p>
              <h3 className="text-2xl font-bold text-primary">Rs {interest}</h3>
            </div>

            <div className="bg-gray-100 p-6 rounded-xl text-black">
              <p>Total Payment</p>
              <h3 className="text-2xl font-bold text-primary">Rs {total}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
