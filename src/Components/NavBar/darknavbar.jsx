"use client";

import Image from "next/image";

export default function Navbar_Dark() {
  return (
    <div className="fixed top-0 w-full h-16 
      bg-dark-blue/10 backdrop-blur-md 
      flex items-center justify-between px-8">
      
      <Image src="/darklogo.svg" alt="CSE Logo" width={35} height={35} />

      <span className="text-white text-xl font-semibold ml-14 font-eb-garamond pl-14">
        CSE NEWSLETTER
      </span>

      <div className="space-x-4">
        <button className="text-white px-6 py-2 rounded-full hover:bg-white hover:text-dark-blue transition">
          Sign Up
        </button>
        <button className="text-white border rounded-full border-blue px-8 py-2 hover:bg-white hover:text-dark-blue transition">
          Log In
        </button>
      </div>
    </div>
  );
}
