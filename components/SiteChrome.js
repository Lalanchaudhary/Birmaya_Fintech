"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import WhatsappButton from "@/components/WhatsappButton";
import LoanChatbot from "@/components/LoanChatbot";
import RepaymentPopup from "@/components/RepaymentPopup";

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <RepaymentPopup />}
      <CustomCursor />
      {!isAdminRoute && <LoanChatbot />}
      <WhatsappButton />
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
}
