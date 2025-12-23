"use client";

import Image from "next/image";
import Post from "../post/post.jsx";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";

const getImageUrl = (path) => {
  if (!path) return "/hackitpic.png";
  if (path.startsWith("http")) return path;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};

export default function FollowedDepartmentsPage(props) {
  const { theme } = useTheme();
  const { user } = useAuth();
  const isDark = theme === "dark";
  
  const [visibleCount, setVisibleCount] = useState(6);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFollowedPosts() {
      if (!user) return;
      
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const authPrefix = localStorage.getItem("authPrefix") || "Bearer";
        const headers = token ? { Authorization: `${authPrefix} ${token}` } : {};

        // 1. Fetch followed departments
        const followedRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/${user.id}/followed-departments/`,
          { headers }
        );
        if (!followedRes.ok) throw new Error("Failed to fetch followed departments");
        const followedDepartments = await followedRes.json() || [];

        // 2. Fetch posts for those departments
        const postsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/followed/`, {
          headers
        });

        if (!postsRes.ok) throw new Error("Failed to fetch posts");
        const data = await postsRes.json();
        const postsArray = Array.isArray(data) ? data : data.results || [];
        setPosts(postsArray);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchFollowedPosts();
  }, [user]);

  const handleExploreMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const visiblePosts = posts.slice(0, visibleCount);

  if (!user) {
    return (
      <div className={`w-full min-h-screen pt-20 flex justify-center items-center ${isDark ? "bg-dark-blue text-white" : "bg-white text-dark-blue"}`}>
        <p className="text-xl font-semibold">Please log in to see your followed departments' posts.</p>
      </div>
    );
  }

  const PostsGrid = (
    <div className="w-full flex flex-wrap gap-5 md:gap-10 justify-center items-center mt-10 px-4 md:px-20">
      {visiblePosts.map((post) => {
        // Author mapping logic consistent with DepartmentPage
        let authorName = "Unknown Author";
        let authorImg = "/hackitpic.png";
        let authorUsername = null;

        if (post.author && typeof post.author === "object") {
          const fullName = `${post.author.first_name || ""} ${post.author.last_name || ""}`.trim();
          authorName = fullName || post.author.username || "Unknown Author";
          authorUsername = post.author.username;
          if (post.author.image) authorImg = getImageUrl(post.author.image);
        }

        const imagePath = post.image || (post.images && post.images.length > 0 ? post.images[0].image : null);
        const postImage = imagePath ? getImageUrl(imagePath) : "/hackitpic.png";

        return (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            description={post.content}
            likes={post.number_of_likes || post.likes_count || 0}
            comments={post.number_of_comments || post.comments_count || 0}
            author={authorName}
            authorImage={authorImg}
            authorUsername={authorUsername}
            publishedDate={new Date(post.created_at).toLocaleDateString()}
            department={post.department}
            image={postImage}
            userImage="/hackitpic.png"
            isLiked={post.is_liked}
            isSaved={post.is_saved}
          />
        );
      })}
    </div>
  );

  return (
    <div className={`w-full min-h-screen pt-20 px-4 md:px-10 h-auto space-y-10 overflow-x-hidden transition-colors duration-300 ${isDark ? "bg-dark-blue" : "bg-white"}`}>
      
      {/* Page Header */}
      <div className="flex items-center flex-wrap justify-center md:justify-start">
        <div className={`text-5xl ${isDark ? "text-white" : "text-dark-blue"}`}>
          {props.departmentIcon}
        </div>
        <span className={`ml-4 text-3xl md:text-4xl font-semibold text-center ${isDark ? "text-white" : "text-dark-blue"}`}>
          {props.departmentName}
        </span>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 text-xl py-10">
          Error: {error}. Please try again later.
        </div>
      ) : posts.length === 0 ? (
        <div className={`text-center text-xl py-10 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          No posts found from departments you follow.
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-10 md:gap-20">
          {PostsGrid}
          {posts.length > visibleCount && (
            <button
              onClick={handleExploreMore}
              className={`group flex items-center text-lg border px-12 py-2 rounded-full cursor-pointer transition-all duration-300 ${
                isDark
                  ? "text-white border-white hover:bg-white hover:text-dark-blue hover:px-16"
                  : "text-dark-blue border-dark-blue hover:bg-dark-blue hover:text-white hover:px-16"
              }`}
            >
              Explore More
              <span className="ml-4 flex items-center transition-all duration-300 w-[15px] opacity-100 group-hover:w-0 group-hover:ml-0 group-hover:opacity-0 overflow-hidden">
                <Image
                  src="/leftdownarrow.svg"
                  alt="arrow"
                  width={15}
                  height={15}
                  className={`min-w-[15px] ${!isDark ? "invert" : ""}`}
                />
              </span>
            </button>
          )}
        </div>
      )}

      {/* Footer Section */}
      <div>
        <div className={`border ${isDark ? "border-gray-500" : "border-gray-300"}`}></div>
        <div className="flex gap-4 justify-center mt-4 mb-4">
            {["instagram", "facebook", "x", "linkedin", "youtube"].map((social) => (
                <a key={social} href="#" target="_blank">
                    <Image
                        src={isDark ? `/${social}white.svg` : `/${social}.svg`}
                        alt={social}
                        width={30}
                        height={30}
                        className="hover:scale-110 transition-transform"
                    />
                </a>
            ))}
        </div>
        <p className={`pb-2 flex justify-center text-[11px] font-light ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Copyright &copy; <span>{new Date().getFullYear()}</span>&nbsp;Club Scientifique de l'ESI. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}