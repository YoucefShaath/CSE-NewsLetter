"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <div
      className={`fixed top-0 w-full h-16 flex items-center justify-between px-8 z-50 shadow-md transition-colors duration-300 ${
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
        className={`text-xl font-semibold ml-12 font-eb-garamond ${
          isDark ? "text-white" : "text-dark-blue"
        }`}
      >
        CSE Newsletter
      </span>
      <div className="space-x-4 flex items-center">
        <Link href="/login">
          <button
            className={`border rounded-full px-8 py-2 transition cursor-pointer ${
              isDark
                ? "text-white border-white hover:bg-white hover:text-dark-blue"
                : "text-dark-blue border-dark-blue hover:bg-dark-blue hover:text-white"
            }`}
          >
            Log In
          </button>
        </Link>
        <button onClick={toggleTheme} className="cursor-pointer ml-4">
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
