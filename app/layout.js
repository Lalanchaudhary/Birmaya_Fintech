import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import WhatsappButton from "@/components/WhatsappButton";
import LoanChatbot from "@/components/LoanChatbot";
import RepaymentPopup from "@/components/RepaymentPopup";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Birmaya Fintech",
  description: "Birmaya Fintech Pvt. Ltd.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar/>
        <RepaymentPopup />
        <CustomCursor />
        <LoanChatbot />
        <WhatsappButton />
        {children}
        <Footer />
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </body>
    </html>
  );
}
