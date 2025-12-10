import Image from "next/image";
import Navbar_Dark from "../NavBar/darknavbar";
import Post from "./post.jsx";
export default function DepartementsPage() {
  return (
    <>
      <Navbar_Dark />
    <section
      className="w-full h-[1600px] bg-no-repeat relative"
      style={{
        backgroundImage: "url('/Departmentsbackground.svg')",
        backgroundSize: "cover",
      }}
    >
      <div className="flex items-center gap-4 absolute top-40 left-10"> <img className="w-[70px] h-[59.59]" src="/VisualStudioCode.svg" alt="vs code image" /> 
        <h1 className="text-5xl text-white underline" style={{
          fontFamily: "EB Garamond, serif",
          fontOpticalSizing: "auto",
          fontWeight: "normal",
          fontStyle: "normal",
        }}>DEVELOPMENT</h1>
      </div>
      <div className=" grid grid-cols-3 grid-rows-2 gap-25 absolute top-80 left-5">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
       <button className="flex items-center gap-3 px-10 py-4  rounded-full border-2  border-sky-900 text-white font-semibold text-lg bg-transparent cursor-pointer absolute bottom-40 left-1/2 transform -translate-x-1/2 transition-all duration-300 ease-in-out hover:bg-sky-900 hover:text-white hover:scale-105" style={{
          fontFamily: "EB Garamond, serif",
          fontOpticalSizing: "auto",
          fontWeight: "normal",
          fontStyle: "normal",
        }}>
      Explore More
      <span className="text-xl">↙</span>
    </button>
    </section>
    </>
  );
}