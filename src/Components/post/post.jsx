"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
export default function Post(props) {
  const [liked, setLiked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [focusOnOpen, setFocusOnOpen] = useState(false);
  const commentInputRef = useRef(null);

  const handleCommentClick = () => {
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  };

  useEffect(() => {
    if (isOpen && focusOnOpen && commentInputRef.current) {
      commentInputRef.current.focus();
      setFocusOnOpen(false);
    }
  }, [isOpen, focusOnOpen]);

  return (
    <>
      <div
        className="w-full max-w-[350px] rounded-xl bg-white flex flex-col relative gap-5 border border-gray-200 overflow-hidden shadow-[0px_0px_0px_2px_rgba(6,24,44,0.4),0px_4px_6px_-1px_rgba(6,24,44,0.65),inset_0px_1px_0px_rgba(255,255,255,0.08)] transition-transform duration-300 hover:scale-102 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={props.image}
          alt={props.title}
          width={350}
          height={300}
          className="w-full object-cover"
        />
        <div className="gap-2 flex flex-col px-4">
          <h1 className="text-blue-950 text-4xl mb-4 font-semibold">
            {props.title}
          </h1>
          <p className="text-gray-600 text-sm mb-4">
            {props.description?.split(" ").length > 15
              ? props.description.split(" ").slice(0, 15).join(" ") + "..."
              : props.description}
          </p>
        </div>
        <div className="flex items-center px-4 gap-6">
          <button
            className="flex items-center gap-2 mb-4 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
            }}
          >
            {liked ? (
              <Image src="/redheart.svg" alt="liked" width={20} height={20} />
            ) : (
              <Image src="/heart.svg" alt="not liked" width={20} height={20} />
            )}
            {liked ? (
              <span className="text-red-500">{props.likes}</span>
            ) : (
              <span>{props.likes}</span>
            )}
          </button>
          <button
            className="flex items-center gap-2 mb-4 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setFocusOnOpen(true);
              setIsOpen(true);
            }}
          >
            <Image src="/comment.svg" alt="comment" width={20} height={20} />
            <span>{props.comments}</span>
          </button>
          <button
            className="flex items-center gap-2 mb-4 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setSaved(!saved);
            }}
          >
            <Image
              src={saved ? "/saved.svg" : "/save.svg"}
              alt="save"
              width={22}
              height={22}
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setSaved(!saved);
              }}
            />
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden flex w-full max-w-5xl h-[85vh] shadow-2xl animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Side - Image */}
            <div className="w-1/2 relative bg-gray-100 hidden md:block">
              <Image
                src={props.image}
                alt={props.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Right Side - Content */}
            <div className="w-full md:w-1/2 flex flex-col p-8 h-full">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative">
                    {/* Placeholder Avatar */}
                    <Image
                      src={props.authorImage}
                      fill
                      className="object-cover cursor-pointer"
                      alt="Author"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-900 hover:underline cursor-pointer">
                      {props.author}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {props.publishedDate}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <p className="text-blue-600 text-xs font-bold tracking-wider mb-2 uppercase">
                  {props.department}
                </p>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {props.title}
                </h2>
                <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap">
                  {props.description}
                </p>
                <div className="w-full h-48 relative mt-4 md:hidden rounded-lg overflow-hidden">
                  <Image
                    src={props.image}
                    alt={props.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Footer - Stats */}
              <div className="flex items-center gap-6 py-4 border-t border-gray-100 mt-4">
                <button
                  className="flex cursor-pointer items-center gap-2 text-gray-600"
                  onClick={() => setLiked(!liked)}
                >
                  {liked ? (
                    <Image
                      src="/redheart.svg"
                      alt="liked"
                      width={20}
                      height={20}
                    />
                  ) : (
                    <Image
                      src="/heart.svg"
                      alt="not liked"
                      width={20}
                      height={20}
                    />
                  )}
                  <span
                    className={
                      liked ? "text-red-500 font-medium" : "font-medium"
                    }
                  >
                    {props.likes}
                  </span>
                </button>
                <div
                  className="flex items-center gap-2 text-gray-600 cursor-pointer"
                  onClick={handleCommentClick}
                >
                  <Image
                    src="/comment.svg"
                    alt="comment"
                    width={20}
                    height={20}
                  />
                  <span className="font-medium">{props.comments}</span>
                </div>
                <div>
                  <Image
                    src={saved ? "/saved.svg" : "/save.svg"}
                    alt="save"
                    width={22}
                    height={22}
                    className="cursor-pointer"
                    onClick={() => setSaved(!saved)}
                  />
                </div>
              </div>

              {/* Comment Input */}
              <div className="flex items-center gap-3 mt-2 cursor-pointer">
                <Image
                  src={props.userImage}
                  alt="author"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div className="flex-1 relative">
                  <input
                    ref={commentInputRef}
                    type="text"
                    placeholder="Add a comment..."
                    className="w-full bg-gray-50 rounded-full py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 border border-transparent focus:border-blue-500 transition-all"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 p-2 bg-blue-50 hover:bg-blue-200 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      cursor="pointer"
                    >
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
