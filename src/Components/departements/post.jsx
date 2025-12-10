
"use client"; 
import { useState } from "react";
export default function Post() {
    const [liked, setLiked] = useState(false);
  return (
    <div className="w-[336px] h-[368px] rounded-xl bg-white flex flex-col relative gap-5 "
    style={{
      boxShadow: "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"
    }}>
      <img src="/hackitpic.png" alt="post pic" />
      <div className="gap-2 flex flex-col px-4">
        <h1 className="text-blue-950 text-4xl">Post Title</h1>
        <p className="text-gray-600 text-sm">Post description post description post description post description</p>
      </div>
       <button className="absolute bottom-0 left-4"
      onClick={() => setLiked(!liked)}
      style={{
        fontSize: "40px",
        background: "none",
        border: "none",
        cursor: "pointer",
        color: liked ? "red" : "gray",
        
      }}
    >
      ♥︎
    </button>
    </div>
  );
}