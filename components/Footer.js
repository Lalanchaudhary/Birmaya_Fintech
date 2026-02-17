import Link from "next/link";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { 
  FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#061733] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Company */}
          <div>
            <h2 className="text-2xl font-bold mb-3">BIRMAYA FINTECH</h2>
            <p className="text-white/70 mb-4">
              Commitments Honored, Loans Delivered
            </p>
            <p className="text-white/60 text-sm">
              Fast, transparent and reliable loan solutions for individuals and businesses.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-white/70">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/career">Career</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Loan Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Loan Services</h3>
            <ul className="space-y-2 text-white/70">
              <li>Personal Loan</li>
              <li>Business Loan</li>
              <li>Home Loan</li>
              <li>Car Loan</li>
              <li>Loan Against Property</li>
              <li>Loan Against Shares</li>
            </ul>
          </div>

          {/* Contact Info */}
{/* Contact Info */}
<div>
  <h3 className="font-semibold text-lg mb-4">Contact</h3>

  <div className="space-y-3 text-white/70">
    <p className="flex items-center gap-2">
      <FaPhone /> +91 8287868048
    </p>
    <p className="flex items-center gap-2">
      <FaEnvelope /> birmayafintech@gmail.com
    </p>
    <p className="flex items-start gap-2">
      <FaMapMarkerAlt className="mt-1"/>
      Office address - F-01, first floor, D-36, sector-2, Noida, G.B Nagar, U.P-201301
    </p>
  </div>

  {/* Social Media */}
{/* Social Media */}
<div className="flex gap-4 mt-6">
  
  {/* Twitter */}
  <a
    href="https://x.com/BIRMAYAFINTECH"
    target="_blank"
    className="bg-white p-3 rounded-full hover:scale-110 transition"
  >
    <FaXTwitter className="text-black text-lg" />
  </a>

  {/* Instagram */}
  <a
    href="https://www.instagram.com/birmaya_fintech_pvt_ltd?igsh=MXFxajk4dzdmdzdmNw=="
    target="_blank"
    className="bg-white p-3 rounded-full hover:scale-110 transition"
  >
    <FaInstagram className="text-[#E4405F] text-lg" />
  </a>

  {/* LinkedIn */}
  <a
    href="https://www.linkedin.com/in/birmaya-fintech-b906883a3"
    target="_blank"
    className="bg-white p-3 rounded-full hover:scale-110 transition"
  >
    <FaLinkedinIn className="text-[#0077B5] text-lg" />
  </a>

  {/* Facebook */}
  <a
    href="https://www.facebook.com/share/1L21Jg4YHJ/"
    target="_blank"
    className="bg-white p-3 rounded-full hover:scale-110 transition"
  >
    <FaFacebookF className="text-[#1877F2] text-lg" />
  </a>

</div>

</div>


        </div>

        {/* Bottom */}
        <div className="border-t border-white/20 mt-10 pt-6 text-center text-white/60">
          © {new Date().getFullYear()} Birmaya Fintech Pvt. Ltd. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
