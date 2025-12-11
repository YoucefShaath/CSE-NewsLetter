"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../../context/ThemeContext";

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      <div
        className={`flex flex-col text-center items-center justify-between min-h-screen py-8 transition-colors duration-300 overflow-hidden ${
          isDark ? "bg-dark-blue" : "bg-white"
        }`}
      >
        <div className="flex-1 flex flex-col items-center justify-center mt-20 relative w-full">
          <Image
            src="/circle.svg"
            alt="Decoration"
            width={500}
            height={500}
            className="absolute top-16 opacity-100 max-w-full"
          />
          <Image
            src="/glow.svg"
            alt="Glow Decoration"
            width={600}
            height={600}
            className="absolute -left-40 -top-28 opacity-50 max-w-full"
          />
          <Image
            src="/glow.svg"
            alt="Glow Decoration"
            width={600}
            height={600}
            className="absolute right-0 bottom-0 opacity-50 max-w-full"
          />
          <h1
            className={`text-4xl font-bold font-eb-garamond mb-4 mt-20 ${
              isDark ? "text-white" : "text-dark-blue"
            }`}
          >
            Welcome To The CSE Newsletter
          </h1>
          <p
            className={`text-sm mb-8 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            A place where you can find events , posts, announcements ...
          </p>
          <Link href="/signup">
            <button className="flex items-center justify-center px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors cursor-pointer">
              <Image
                src="/Vector.svg"
                alt="Button Image"
                width={18}
                height={18}
              />
              <span className="ml-2 text-xl">Join Us</span>
            </button>
          </Link>
        </div>
        <div className="flex flex-col items-center gap-y-2">
          <Image
            src={isDark ? "/darklogo.svg" : "/lightlogo.svg"}
            alt="CSE Logo"
            width={80}
            height={80}
          />
          <span className={`ml-4 ${isDark ? "text-white" : "text-dark-blue"}`}>
            Follow Us
          </span>
          <div className="flex gap-4 justify-center mt-4 mb-4">
            <a href="https://www.instagram.com/cse.club/" target="_blank">
              <Image
                src={isDark ? "/instagramwhite.svg" : "/instagram.svg"}
                alt="Instagram"
                width={30}
                height={30}
                className="hover:scale-110"
              />
            </a>
            <a
              href="https://www.facebook.com/club.scientifique.esi"
              target="_blank"
            >
              <Image
                src={isDark ? "/facebookwhite.svg" : "/facebook.svg"}
                alt="Facebook"
                width={30}
                height={30}
                className="hover:scale-110"
              />
            </a>
            <a href="https://x.com/CSESI_Club" target="_blank">
              <Image
                src={isDark ? "/xwhite.svg" : "/x.svg"}
                alt="Twitter"
                width={30}
                height={30}
                className="hover:scale-110"
              />
            </a>
            <a
              href="https://www.linkedin.com/company/cse-club/"
              target="_blank"
            >
              <Image
                src={isDark ? "/linkedinwhite.svg" : "/linkedin.svg"}
                alt="LinkedIn"
                width={30}
                height={30}
                className="hover:scale-110"
              />
            </a>
            <a
              href="https://www.youtube.com/channel/UCHgeF6ELJW0Pt1vYoAomCig"
              target="_blank"
            >
              <Image
                src={isDark ? "/youtubewhite.svg" : "/youtube.svg"}
                alt="YouTube"
                width={30}
                height={30}
                className="hover:scale-110"
              />
            </a>
          </div>
          <p
            className={`flex justify-center text-[11px] font-light ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Copyright &copy; <span>{new Date().getFullYear()}</span>&nbsp;Club
            Scientifique de l'ESI. All Rights Reserved.
          </p>
        </div>
      </div>
    </>
  );
}
