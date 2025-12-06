import Image from "next/image";

export default function LogIn() {
  return <div className="flex h-screen">
        <div className="w-[50%] bg-white">
            <div className="flex flex-col items-start justify-center h-full px-50">
            <span className="text-4xl ">Log In</span>
            <input type="email" placeholder="Email" className="border border-gray-300 rounded-md px-4 py-2 mt-6 w-80"/>
            <input type="password" placeholder="Password" className="border border-gray-300 rounded-md px-4 py-2 mt-4 w-80"/>
            <button className="bg-dark-blue text-white rounded-md px-4 py-2 mt-6 w-80 hover:bg-blue-700 transition cursor-pointer">Log In
                <Image src="/arrow.svg" alt="Arrow Right" width={20} height={20} className="inline-block ml-2"/>
            </button>
            <span className="mt-4">Don't have an account? <a href="#" className="text-light-blue font-semibold">Sign Up</a></span>
            </div>
        </div>
        <div className="flex flex-col items-center justify-center w-[50%] bg-dark-blue">
            <Image src="/darklogo.svg" alt="CSE Logo" width={200} height={200} className="mx-auto mb-10"/>
            <span className="text-white text-4xl ml-8 text-center">CSE NEWSLETTER</span>
        </div>
  </div>;
}