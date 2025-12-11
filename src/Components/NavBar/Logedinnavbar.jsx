"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "../../context/ThemeContext";
import {
  FaHome,
  FaCode,
  FaPencilRuler,
  FaPalette,
  FaUsers,
  FaBullhorn,
  FaHandshake,
  FaUser,
  FaIdCard,
  FaListAlt,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Logedinnavbar() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const isDark = theme === "dark";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const departments = [
    { name: "General", href: "/general", icon: <FaHome /> },
    { name: "Dev", href: "/department/dev", icon: <FaCode /> },
    { name: "UI/UX", href: "/department/ui-ux", icon: <FaPencilRuler /> },
    { name: "Design", href: "/department/design", icon: <FaPalette /> },
    { name: "HR", href: "/department/hr", icon: <FaUsers /> },
    { name: "Comm", href: "/department/comm", icon: <FaBullhorn /> },
    {
      name: "Relev/Relex",
      href: "/department/relev-relex",
      icon: <FaHandshake />,
    },
  ];

  return (
    <div
      className={`fixed top-0 w-full h-16 flex items-center justify-between px-8 z-50 shadow-md transition-colors duration-300 ${
        isDark ? "bg-dark-blue" : "bg-white"
      }`}
    >
      <div className="flex items-center">
        <Image
          src={isDark ? "/darklogo.svg" : "/logodark.svg"}
          alt="CSE Logo"
          width={35}
          height={35}
        />
      </div>
      <span
        className={`absolute left-1/2 transform -translate-x-1/2 text-xl font-semibold font-eb-garamond ${
          isDark ? "text-white" : "text-dark-blue"
        }`}
      >
        CSE Newsletter
      </span>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={`transition-colors ${
              isDark
                ? "text-white hover:text-gray-300"
                : "text-dark-blue hover:text-light-blue"
            }`}
          >
            <span className="text-xl cursor-pointer">🔍</span>
          </button>
          <Link
            href="/notifications"
            className={`transition-colors ${
              isDark
                ? "text-white hover:text-gray-300"
                : "text-dark-blue hover:text-light-blue"
            }`}
          >
            <span className="text-xl cursor-pointer">🔔</span>
          </Link>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="relative w-9 h-9 rounded-full overflow-hidden border border-gray-300 cursor-pointer focus:outline-none"
            >
              <Image
                src="/hackitpic.png"
                alt="Profile"
                fill
                className="object-cover"
              />
            </button>

            {isDropdownOpen && (
              <div
                className={`absolute right-0 mt-2 w-56 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-100 ${
                  isDark ? "bg-dark-blue border border-gray-700" : "bg-white"
                }`}
              >
                <Link
                  href="/profile"
                  className={`px-4 py-2 text-sm flex items-center gap-2 ${
                    isDark
                      ? "text-white hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <FaUser /> Profile
                </Link>
                <Link
                  href="/personal-information"
                  className={`px-4 py-2 text-sm flex items-center gap-2 ${
                    isDark
                      ? "text-white hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <FaIdCard /> Personal Information
                </Link>
                <Link
                  href="/manage-subscriptions"
                  className={`px-4 py-2 text-sm flex items-center gap-2 ${
                    isDark
                      ? "text-white hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <FaListAlt /> Manage Subscriptions
                </Link>
                <div
                  className={`border-t my-1 ${
                    isDark ? "border-gray-700" : "border-gray-200"
                  }`}
                ></div>
                <button
                  className={`w-full text-left px-4 py-2 text-sm flex items-center cursor-pointer gap-2 ${
                    isDark
                      ? "text-red-400 hover:bg-gray-700"
                      : "text-red-600 hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setIsDropdownOpen(false);
                    router.push("/login");
                  }}
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>

          <button onClick={toggleTheme} className="cursor-pointer ml-2">
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

      {/* Department Navbar Overlay */}
      {isSearchOpen && (
        <div
          className={`absolute top-16 left-0 w-full shadow-2xl transition-all duration-300 z-40 border-t backdrop-blur-xl ${
            isDark
              ? "bg-dark-blue/95 border-white/10"
              : "bg-white/95 border-gray-100"
          }`}
        >
          <div className="container mx-auto py-10 px-4">
            <p
              className={`text-center text-xs font-bold uppercase tracking-[0.2em] mb-8 ${
                isDark ? "text-gray-400" : "text-gray-400"
              }`}
            >
              Browse Departments
            </p>
            <div className="flex justify-center gap-4 flex-nowrap overflow-x-auto max-w-full mx-auto pb-2">
              {departments.map((dept) => (
                <Link
                  key={dept.name}
                  href={dept.href}
                  className={`group relative px-6 py-3 whitespace-nowrap rounded-2xl text-lg font-medium transition-all duration-200 flex items-center gap-2 shrink-0 ${
                    isDark
                      ? "bg-white/5 text-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] border border-white/5"
                      : "bg-gray-50 text-dark-blue hover:bg-white hover:shadow-lg border border-gray-100"
                  }`}
                  onClick={() => setIsSearchOpen(false)}
                >
                  <span className="text-xl">{dept.icon}</span>
                  <span>{dept.name}</span>
                  <span
                    className={`opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ${
                      isDark ? "text-light-blue" : "text-blue-500"
                    }`}
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
