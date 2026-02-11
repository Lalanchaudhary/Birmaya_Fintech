"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiBars3 } from "react-icons/hi2";
export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 sm:gap-3">
                    <Image
                        src="/logo.png"
                        alt="Birmaya Fintech"
                        width={55}
                        height={55}
                        className="w-9 h-9 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain"
                    />

                    <div className="leading-tight">
                        {/* Company name */}
                        <h1 className="text-sm sm:text-base lg:text-xl font-bold text-primary whitespace-nowrap">
                            BIRMAYA FINTECH
                        </h1>

                        {/* Tagline hide on very small screen */}
                        <p className="sm:block text-[8px] sm:text-sm text-accent font-semibold">
                            Commitments Honored, Loans Delivered
                        </p>
                    </div>
                </Link>


                {/* Desktop Menu */}
                <ul className="hidden lg:flex items-center gap-8 font-medium text-gray-700">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/services">Services</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/blog">Blog</Link></li>
                    <li><Link href="/career">Career</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>

                {/* CTA Button */}
                <div className="hidden lg:block">
                    <button className="bg-accent text-white px-5 py-2 rounded-lg font-semibold hover:scale-105 transition">
                        Apply Loan
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden text-3xl text-gray-700"
                    onClick={() => setOpen(!open)}
                >
                    <HiBars3 />
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden bg-white shadow-md">
                    <ul className="flex flex-col items-center gap-6 py-6 font-medium">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/services">Services</Link></li>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/blog">Blog</Link></li>
                        <li><Link href="/career">Career</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                        <button className="bg-accent text-white px-6 py-2 rounded-lg">
                            Apply Loan
                        </button>
                    </ul>
                </div>
            )}
        </nav>
    );
}
