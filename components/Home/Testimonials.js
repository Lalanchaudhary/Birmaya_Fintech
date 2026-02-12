"use client";
import { useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    name: "Rahul Sharma",
    text: "Got my personal loan approved within 24 hours. Very smooth and transparent process.",
  },
  {
    name: "Priya Verma",
    text: "Amazing support team. They helped me get a business loan easily.",
  },
  {
    name: "Amit Singh",
    text: "No hidden charges and very fast service. Highly recommended!",
  },
  {
    name: "Neha Gupta",
    text: "Best loan experience ever. Everything was simple and quick.",
  },
];

export default function Testimonials() {
  const scrollRef = useRef();

  useEffect(() => {
    const container = scrollRef.current;

    const scroll = () => {
      if (container) {
        container.scrollLeft += 1;
        if (
          container.scrollLeft >=
          container.scrollWidth - container.clientWidth
        ) {
          container.scrollLeft = 0;
        }
      }
    };

    const interval = setInterval(scroll, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-[#F7F9FC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-primary">
            What Our Customers Say
          </h2>
          <p className="text-gray-500 mt-2">
            Real experiences from our happy customers
          </p>
        </div>

        {/* Slider */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto no-scrollbar"
        >
          {[...reviews, ...reviews].map((review, i) => (
            <div
              key={i}
              className="min-w-[300px] md:min-w-[360px] bg-white p-8 rounded-2xl shadow-md"
            >
              {/* Stars */}
              <div className="flex gap-1 text-accent mb-4">
                {[1,2,3,4,5].map((star) => (
                  <FaStar key={star} />
                ))}
              </div>

              <p className="text-gray-600 mb-6 italic">
                “{review.text}”
              </p>

              <h4 className="font-semibold text-primary">
                {review.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
