"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

export default function Post(props) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(props.isLiked || false);
  const [isOpen, setIsOpen] = useState(false);
  const [saved, setSaved] = useState(props.isSaved || false);
  const [focusOnOpen, setFocusOnOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(props.likes || 0);
  const [commentCount, setCommentCount] = useState(props.comments || 0);

  useEffect(() => {
    setLikeCount(props.likes || 0);
  }, [props.likes]);

  useEffect(() => {
    setCommentCount(props.comments || 0);
  }, [props.comments]);

  useEffect(() => {
    setLiked(props.isLiked || false);
  }, [props.isLiked]);

  useEffect(() => {
    setSaved(props.isSaved || false);
  }, [props.isSaved]);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);

  const commentInputRef = useRef(null);

  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${baseUrl}${cleanPath}`;
  };

  const getAuthorInfo = () => {
    if (typeof props.author === "object" && props.author !== null) {
      return {
        name:
          `${props.author.first_name} ${props.author.last_name}`.trim() ||
          props.author.username,
        image: getImageUrl(props.author.image),
        username: props.author.username,
      };
    }
    if (typeof props.author === "string") {
      return {
        name: props.author,
        image: props.authorImage || "/hackitpic.png",
        username: props.authorUsername || "unknown",
      };
    }
    return {
      name: "Unknown Author",
      image: "/hackitpic.png",
      username: "unknown",
    };
  };

  const authorInfo = getAuthorInfo();
  const userImage = getImageUrl(user?.image) || "/hackitpic.png";
  const postImage = getImageUrl(props.image);

  const handleLike = async (e) => {
    e.stopPropagation();
    if (!user) {
      alert("Please login to like posts");
      return;
    }

    if (!props.id) {
      return;
    }

    const previousLiked = liked;
    const previousCount = likeCount;
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);

    try {
      const token = localStorage.getItem("token");
      const authPrefix = localStorage.getItem("authPrefix") || "Bearer";

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${props.id}/like/`,
        {
          method: "POST",
          headers: {
            Authorization: `${authPrefix} ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        setLiked(previousLiked);
        setLikeCount(previousCount);
      }
    } catch (error) {
      setLiked(previousLiked);
      setLikeCount(previousCount);
    }
  };

  const handleSave = async (e) => {
    e.stopPropagation();
    if (!user) {
      alert("Please login to save posts");
      return;
    }

    if (!props.id) {
      return;
    }

    const previousSaved = saved;
    setSaved(!saved);

    try {
      const token = localStorage.getItem("token");
      const authPrefix = localStorage.getItem("authPrefix") || "Bearer";

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${props.id}/save/`,
        {
          method: "POST",
          headers: {
            Authorization: `${authPrefix} ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        setSaved(previousSaved);
      }
    } catch (error) {
      setSaved(previousSaved);
    }
  };

  const handleCommentClick = () => {
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchComments();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && focusOnOpen && commentInputRef.current) {
      commentInputRef.current.focus();
      setFocusOnOpen(false);
    }
  }, [isOpen, focusOnOpen]);

  const fetchComments = async () => {
    if (!props.id) return;
    setLoadingComments(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${props.id}/comments/`
      );
      if (res.ok) {
        const data = await res.json();
        setComments(data);
        setCommentCount(data.length);
      }
    } catch (error) {
    } finally {
      setLoadingComments(false);
    }
  };

  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    if (!props.id) {
      alert("Error: Cannot post comment because Post ID is missing.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const authPrefix = localStorage.getItem("authPrefix") || "Bearer";

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${props.id}/comments/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${authPrefix} ${token}`,
          },
          body: JSON.stringify({ content: newComment }),
        }
      );

      if (res.ok) {
        const savedComment = await res.json();
        setComments([savedComment, ...comments]);
        setCommentCount((prev) => prev + 1);
        setNewComment("");
      } else {
        const errorText = await res.text();
        alert(`Error: ${res.status} - ${errorText}`);
      }
    } catch (error) {}
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handlePostComment();
    }
  };

  return (
    <>
      <div
        className="w-full max-w-[350px] rounded-xl bg-white flex flex-col relative gap-5 border border-gray-200 overflow-hidden shadow-[0px_0px_0px_2px_rgba(6,24,44,0.4),0px_4px_6px_-1px_rgba(6,24,44,0.65),inset_0px_1px_0px_rgba(255,255,255,0.08)] transition-transform duration-300 hover:scale-102 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        {postImage && (
          <img
            src={postImage}
            alt={props.title}
            width={350}
            height={300}
            className="w-full object-cover h-[200px]"
          />
        )}
        <div className="gap-2 flex flex-col px-4 pt-4">
          <h1 className="text-blue-950 text-2xl mb-2 font-semibold">
            {props.title}
          </h1>
          <p className="text-gray-600 text-sm mb-4">
            {props.description?.split(" ").length > 15
              ? props.description.split(" ").slice(0, 15).join(" ") + "..."
              : props.description}
          </p>
        </div>

        <div className="px-4 flex items-center gap-2 mb-2">
          <Link
            href={
              authorInfo.username && authorInfo.username !== "unknown"
                ? `/profile/${authorInfo.username}`
                : "#"
            }
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={authorInfo.image || "/default-profile.svg"}
              className="w-6 h-6 rounded-full object-cover"
              alt="author"
            />
            <span className="text-xs text-gray-500 hover:underline">
              {authorInfo.name}
            </span>
          </Link>
        </div>

        <div className="flex items-center px-4 gap-6 pb-4">
          <button
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleLike}
          >
            {liked ? (
              <Image src="/redheart.svg" alt="liked" width={20} height={20} />
            ) : (
              <Image src="/heart.svg" alt="not liked" width={20} height={20} />
            )}
            <span className={liked ? "text-red-500" : ""}>{likeCount}</span>
          </button>
          <button
            className="flex items-center gap-2 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setFocusOnOpen(true);
              setIsOpen(true);
            }}
          >
            <Image src="/comment.svg" alt="comment" width={20} height={20} />
            <span>{commentCount}</span>
          </button>
          <button
            className="flex items-center gap-2 cursor-pointer ml-auto"
            onClick={handleSave}
          >
            <Image
              src={saved ? "/saved.svg" : "/save.svg"}
              alt="save"
              width={22}
              height={22}
              className="cursor-pointer"
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
            <div className="w-1/2 relative bg-gray-100 hidden md:flex items-center justify-center">
              {postImage ? (
                <img
                  src={postImage}
                  alt={props.title}
                  className="object-contain max-h-full w-full"
                />
              ) : (
                <div className="text-gray-400">No Image</div>
              )}
            </div>

            <div className="w-full md:w-1/2 flex flex-col p-8 h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <Link
                    href={
                      authorInfo.username && authorInfo.username !== "unknown"
                        ? `/profile/${authorInfo.username}`
                        : "#"
                    }
                    className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative block"
                  >
                    <img
                      src={authorInfo.image || "/default-profile.svg"}
                      className="object-cover w-full h-full cursor-pointer"
                      alt="Author"
                    />
                  </Link>
                  <div>
                    <Link
                      href={
                        authorInfo.username && authorInfo.username !== "unknown"
                          ? `/profile/${authorInfo.username}`
                          : "#"
                      }
                    >
                      <h3 className="font-bold text-sm text-gray-900 hover:underline cursor-pointer">
                        {authorInfo.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-gray-500">
                      {new Date(
                        props.created_at || Date.now()
                      ).toLocaleDateString()}
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

                {postImage && (
                  <div className="w-full h-48 relative mt-4 md:hidden rounded-lg overflow-hidden">
                    <img
                      src={postImage}
                      alt={props.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}

                <div className="mt-8 border-t border-gray-100 pt-6">
                  <h4 className="font-bold text-gray-900 mb-4">
                    Comments ({comments.length})
                  </h4>

                  {loadingComments ? (
                    <p className="text-sm text-gray-500">Loading comments...</p>
                  ) : comments.length === 0 ? (
                    <p className="text-sm text-gray-400 italic">
                      No comments yet. Be the first!
                    </p>
                  ) : (
                    comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden relative flex-shrink-0">
                          <img
                            src={
                              getImageUrl(comment.author?.image) ||
                              "/hackitpic.png"
                            }
                            className="object-cover w-full h-full"
                            alt="User"
                          />
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-3 flex-1">
                          <div className="flex justify-between items-baseline mb-1">
                            <span className="font-bold text-sm text-gray-900">
                              {comment.author?.first_name}{" "}
                              {comment.author?.last_name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(
                                comment.created_at
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="flex items-center gap-6 py-4 border-t border-gray-100 mt-4">
                <button
                  className="flex cursor-pointer items-center gap-2 text-gray-600"
                  onClick={handleLike}
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
                    {likeCount}
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
                  <span className="font-medium">{comments.length}</span>
                </div>
                <div>
                  <Image
                    src={saved ? "/saved.svg" : "/save.svg"}
                    alt="save"
                    width={22}
                    height={22}
                    className="cursor-pointer"
                    onClick={handleSave}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 mt-2 cursor-pointer">
                <img
                  src={userImage || "/default-profile.svg"}
                  alt="current user"
                  width={32}
                  height={32}
                  className="rounded-full object-cover w-8 h-8"
                />
                <div className="flex-1 relative">
                  <input
                    ref={commentInputRef}
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a comment..."
                    className="w-full bg-gray-50 rounded-full py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 border border-transparent focus:border-blue-500 transition-all"
                  />
                  <button
                    onClick={handlePostComment}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 p-2 bg-blue-50 hover:bg-blue-200 rounded-full"
                  >
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
