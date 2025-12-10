"use client";

import Image from "next/image";

export default function Navbar_Dark() {
  return (
    <div className="fixed top-0 w-full h-16 bg-dark-blue flex items-center justify-between md:px-8 px-4 z-50">
      <Image src="/darklogo.svg" alt="CSE Logo" width={35} height={35} />
      <span className="text-white text-lg md:text-2xl font-semibold ml-12 font-eb-garamond">
        CSE Newsletter
      </span>
      <div className="md:space-x-4 space-x-2">
        <button className="text-white md:text-md py-2 rounded-full cursor-pointer md:px-8 px-4 rounded hover:bg-white hover:text-dark-blue transition">
          Sign Up
        </button>
        <button className="text-white border rounded-full border-white md:px-8 px-4 py-2 rounded cursor-pointer hover:bg-white hover:text-dark-blue transition">
          Log In
        </button>
      </div>
    </div>
  );
}
