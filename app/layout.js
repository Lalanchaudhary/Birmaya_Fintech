import "./globals.css";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import SiteChrome from "@/components/SiteChrome";

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
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SiteChrome>{children}</SiteChrome>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
