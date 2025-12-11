"use client";

import DarkNav from "../NavBar/darknavbar.jsx";
import LightNav from "../NavBar/lightnavbar.jsx";
import { useState } from "react";

export default function Home() {
  const [dark, setDark] = useState(false);

  return (
  
    <div className="flex flex-col text-center bg-dark-blue items-center justify-between min-h-screen py-8">
      <div className="flex-1 flex flex-col items-center justify-center mt-20">
        <h1 className="text-4xl font-bold text-white font-eb-garamond mb-4">
          Welcome To The CSE Newsletter
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          A place where you can find events , posts, announcements ...
        </p>
        <button className="flex items-center justify-center px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors cursor-pointer">
          <Image src="/Vector.svg" alt="Button Image" width={20} height={20} />
          <span className="ml-2">Join Us</span>
        </button>
      </div>
      <div className="flex flex-col items-center gap-y-4 mt-">
        <Image src="/bluelogo.svg" alt="CSE Logo" width={100} height={100} />
        <span className="text-white ml-4">Follow Us</span>
        <div className="flex space-x-4">
          <Image src="/facebook.svg" alt="Facebook" width={30} height={30} className="cursor-pointer" />
          <Image src="/instagram.svg" alt="Instagram" width={30} height={30} className="cursor-pointer" />
          <Image src="/linkedin.svg" alt="LinkedIn" width={30} height={30} className="cursor-pointer" />
          <Image src="/x.svg" alt="Twitter" width={30} height={30} className="cursor-pointer" />
          <Image src="/youtube.svg" alt="YouTube" width={30} height={30} className="cursor-pointer" />
        </div>
        <p className="text-gray-400 text-sm font-light mt-4">
          Copyright © 2025 CSE Newsletter. All rights reserved.
        </p>
      </div>
    </div>
    <div
  className=" w-screen h-screen bg-dark-blue bg-cover bg-center block md:bg-[url('/background.png')] bg-[url('/bgphone.png')]"
>
  <DarkNav />

  <img
    src="/Ellipse1.svg"
    alt="Elipse"
    className="relative -top-44 -left-56 md:-top-2/3 md:-left-72 md:h-[887px] md:w-[887px] h-[400px] w-[400px]"
  />

  <div
    style={{ fontFamily: 'Times New Roman' }}
    className="relative -top-[250px] md:-top-[80%] flex flex-col items-center justify-center text-white gap-3"
  >
    <h1 className="md:text-7xl text-[24px]">Welcome To The CSE</h1>
    <h1 className="md:text-7xl text-[24px]">Newsletter</h1>

    <p className="md:text-lg text-[7px] text-light-grey">
      A place where you can find Posts, Events, Announcements ...
    </p>

    <button className="bg-blue-500 border-blue-700 text-[7px] h-[16px] w-[43px]  md:text-xl md:h-[60px] md:w-[160px] md:px-5 md:py-2 rounded-[30px]">
      ⚡ Join Us
    </button>
  </div>

  <div className="relative bottom-24 flex  flex-col items-center gap-4 md:hidden ">
    <img className="h-38 w-28 pr-8" src="/lightlogo.svg" alt="" />
    <div className=" flex flex-row gap-2 justify-center ">
      <a href="https://web.facebook.com/club.scientifique.esi/?_rdc=1&_rdr#"><img className="h-5 transition-all duration-300 hover:-translate-y-2 "  src="/facebook.svg" alt="" /></a>
      <a href="https://x.com/CSESI_Club"><img className="h-5 transition-all duration-300 hover:-translate-y-2 " src="/x.svg" alt="" /></a>
      <a href="https://www.instagram.com/cse.club/"><img className="h-5 transition-all duration-300 hover:-translate-y-2 "  src="/instagram.svg" alt="" /></a>
      <a href="https://www.youtube.com/channel/UCHgeF6ELJW0Pt1vYoAomCig"><img className="h-5 transition-all duration-300 hover:-translate-y-2 "  src="/youtube.svg" alt="" /></a>
     </div>
  </div>

  <p  className=" relative text-center  text-[12px] text-white md:hidden">Copyright © 2025 Club Scientifique de l'ESI. All Rights Reserved</p>
</div>

  );
}
