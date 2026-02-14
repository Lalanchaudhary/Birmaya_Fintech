import Image from "next/image";

const awards = [
  "/awards/image1.jpg",
  "/awards/image2.jpg",
  "/awards/image3.jpg",
  "/awards/image4.jpg",
  "/awards/image5.jpg",
  "/awards/image6.jpg",
  "/awards/image7.jpg",
];
export default function Awards() {
  return (
    <section className="py-20 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary">
            Awards & Certifications
          </h2>
          <p className="text-gray-500 mt-2">
            Recognized for excellence and trusted by thousands
          </p>
        </div>

        {/* Scroll container */}
        <div className="flex gap-8 overflow-x-auto no-scrollbar pb-4 cursor-grab active:cursor-grabbing">
          {awards.map((img, i) => (
            <div
              key={i}
              className="min-w-[140px] sm:min-w-[160px] md:min-w-[180px] 
              bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition"
            >
              <Image
                src={img}
                alt="award"
                width={150}
                height={150}
                className="object-contain rounded-sm"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}