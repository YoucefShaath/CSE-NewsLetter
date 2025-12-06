"use client";

import Image from "next/image";

export default function Navbar_Light() {
  return (
    <div className="fixed top-0 w-full h-16 bg-white flex items-center justify-between px-8">
      <Image src="/lightlogo.svg" alt="CSE Logo" width={35} height={35} />
      <span className="text-light-blue text-xl font-semibold ml-12 font-eb-garamond">
        CSE Newsletter
      </span>
      <div className="space-x-4">
        <button className="text-light-blue px-4 py-2 rounded-full px-6 rounded hover:bg-light-blue hover:text-white transition">
          Sign Up
        </button>
        <button className="text-light-blue border rounded-full border-light-blue px-8 py-2 rounded hover:bg-light-blue hover:text-white transition">
          Log In
        </button>
      </div>
    </div>
  );
}
