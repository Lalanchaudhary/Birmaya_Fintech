import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappButton() {
  const phoneNumber = "919718535790"; // yaha apna number daalna (91 without +)
  const message = "Hello, I want to know about loan services";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="bg-[#25D366] p-4 rounded-full shadow-lg hover:scale-110 transition duration-300 animate-bounce">
        <FaWhatsapp className="text-white text-3xl" />
      </div>
    </a>
  );
}
