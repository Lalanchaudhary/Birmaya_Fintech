"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiBars3, HiXMark } from "react-icons/hi2";

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
                            BI₹MAYA FINTECH
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
                    onClick={() => setOpen(true)}
                >
                    <HiBars3 />
                </button>

            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden bg-white shadow-md">

                    {/* Overlay */}
                    <div
                        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${open ? "opacity-100 visible" : "opacity-0 invisible"
                            }`}
                        onClick={() => setOpen(false)}
                    />

                    {/* Slide Drawer */}
                    <div
                        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-50 shadow-2xl 
  transform transition-transform duration-500 ease-in-out
  ${open ? "translate-x-0" : "translate-x-full"}`}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b">
                            <h2 className="text-lg font-bold text-primary">Menu</h2>
                            <button onClick={() => setOpen(false)} className="text-3xl">
                                <HiXMark />
                            </button>
                        </div>

                        {/* Links */}
                        <ul className="flex flex-col gap-6 p-6 text-lg font-medium text-gray-700">
                            <li onClick={() => setOpen(false)}><Link href="/">Home</Link></li>
                            <li onClick={() => setOpen(false)}><Link href="/services">Services</Link></li>
                            <li onClick={() => setOpen(false)}><Link href="/about">About</Link></li>
                            <li onClick={() => setOpen(false)}><Link href="/blog">Blog</Link></li>
                            <li onClick={() => setOpen(false)}><Link href="/career">Career</Link></li>
                            <li onClick={() => setOpen(false)}><Link href="/contact">Contact</Link></li>
                        </ul>

                        {/* CTA */}
                        <div className="p-6 mt-auto">
                            <button className="w-full bg-accent text-white py-3 rounded-lg font-semibold">
                                Apply Loan
                            </button>
                        </div>
                    </div>

                </div>
            )}
        </nav>
    );
}
