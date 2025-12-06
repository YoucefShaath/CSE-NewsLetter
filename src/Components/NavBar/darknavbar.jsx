"use client";

import Image from "next/image";

export default function Navbar_Dark() {
  return (
    <div className="fixed top-0 w-full h-16 bg-dark-blue flex items-center justify-between px-8">
      <Image src="/darklogo.svg" alt="CSE Logo" width={35} height={35} />
      <span className="text-white text-xl font-semibold ml-12 font-eb-garamond">
        CSE Newsletter
      </span>
      <div className="space-x-4">
        <button className="text-white px-4 py-2 rounded-full px-6 rounded hover:bg-white hover:text-dark-blue transition">
          Sign Up
        </button>
        <button className="text-white border rounded-full border-blue px-8 py-2 rounded hover:bg-white hover:text-dark-blue transition">
          Log In
        </button>
      </div>
    </div>
  );
}
