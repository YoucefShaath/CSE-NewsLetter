import Image from "next/image";

export default function HomePage() {
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
  );
}
