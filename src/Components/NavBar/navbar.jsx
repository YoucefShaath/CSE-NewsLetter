"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <div
      className={`fixed top-0 w-full h-16 flex items-center justify-between px-4 md:px-8 z-50 shadow-md transition-colors duration-300 ${
        isDark ? "bg-dark-blue" : "bg-white"
      }`}
    >
      <Image
        src={isDark ? "/darklogo.svg" : "/logodark.svg"}
        alt="CSE Logo"
        width={35}
        height={35}
      />
      <span
        className={`absolute left-1/2 transform -translate-x-1/2 text-xl font-semibold font-eb-garamond hidden md:block ${
          isDark ? "text-white" : "text-dark-blue"
        }`}
      >
        CSE Newsletter
      </span>
      <div className="space-x-4 flex items-center">
        <Link href="/login">
          <button
            className={`border rounded-full px-6 py-2 text-sm md:text-base md:px-8 transition cursor-pointer ${
              isDark
                ? "text-white border-white hover:bg-white hover:text-dark-blue"
                : "text-dark-blue border-dark-blue hover:bg-dark-blue hover:text-white"
            }`}
          >
            Log In
          </button>
        </Link>
        <button onClick={toggleTheme} className="cursor-pointer ml-2 md:ml-4">
          <Image
            src={isDark ? "/sunwhite.svg" : "/moondark.svg"}
            alt="Theme Toggle"
            width={24}
            height={24}
            className={isDark ? "" : "-rotate-45"}
          />
        </button>
      </div>
    </div>
  );
}
