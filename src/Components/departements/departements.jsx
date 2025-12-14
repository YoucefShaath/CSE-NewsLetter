"use client";
import Image from "next/image";
import Post from "../post/post.jsx";
import { useTheme } from "../../context/ThemeContext";
import { useState, useEffect } from "react";

const getImageUrl = (path) => {
  if (!path) return "/hackitpic.png";
  if (path.startsWith("http")) return path;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};

export default function DepartmentPage(props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [visibleCount, setVisibleCount] = useState(6);
  const [posts, setPosts] = useState([]);
  const [likedPostIds, setLikedPostIds] = useState(new Set());
  const [savedPostIds, setSavedPostIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/posts/`);
        if (props.departmentName && props.departmentName !== "General") {
          url.searchParams.append("department", props.departmentName);
        }

        const token = localStorage.getItem("token");
        const authPrefix = localStorage.getItem("authPrefix") || "Bearer";
        const headers = token
          ? { Authorization: `${authPrefix} ${token}` }
          : {};

        const res = await fetch(url.toString(), {
          cache: "no-store",
          headers: headers,
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch posts: ${res.status}`);
        }

        const data = await res.json();
        const postsArray = Array.isArray(data) ? data : data.results || [];
        setPosts(postsArray);

        if (token) {
          try {
            const likedRes = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/posts/liked/`,
              { headers }
            );
            if (likedRes.ok) {
              const likedData = await likedRes.json();
              const likedList = Array.isArray(likedData)
                ? likedData
                : likedData.results || [];
              setLikedPostIds(new Set(likedList.map((p) => p.id)));
            }

            const savedRes = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/posts/saved/`,
              { headers }
            );
            if (savedRes.ok) {
              const savedData = await savedRes.json();
              const savedList = Array.isArray(savedData)
                ? savedData
                : savedData.results || [];
              setSavedPostIds(new Set(savedList.map((p) => p.id)));
            }
          } catch (innerErr) {}
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [props.departmentName]);

  const visiblePosts = posts.slice(0, visibleCount);

  const handleExploreMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const Posts = (
    <div className="w-full flex flex-wrap gap-5 md:gap-10 justify-center items-center mt-10 px-4 md:px-20">
      {visiblePosts.map((post) => {
        let authorName = "Unknown Author";
        let authorImg = "/hackitpic.png";
        let authorUsername = null;

        if (post.author && typeof post.author === "object") {
          const firstName = post.author.first_name || "";
          const lastName = post.author.last_name || "";
          const fullName = `${firstName} ${lastName}`.trim();
          authorName = fullName || post.author.username || "Unknown Author";
          authorUsername = post.author.username;

          if (post.author.image) {
            authorImg = getImageUrl(post.author.image);
          }
        } else if (post.author) {
          authorName = `User ${post.author}`;
        }

        let imagePath = null;
        if (post.image) {
          imagePath = post.image;
        } else if (post.images && post.images.length > 0) {
          imagePath = post.images[0].image;
        }

        const postImage = imagePath ? getImageUrl(imagePath) : "/hackitpic.png";

        const isLiked = likedPostIds.has(post.id);
        const isSaved = savedPostIds.has(post.id);

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
    <div
      className={`w-full min-h-screen pt-20 px-4 md:px-10 h-auto space-y-10 overflow-x-hidden transition-colors duration-300 ${
        isDark ? "bg-dark-blue" : "bg-white"
      }`}
    >
      <div className="flex items-center flex-wrap justify-center md:justify-start">
        {props.departmentIcon ? (
          <div
            className={`text-5xl ${isDark ? "text-white" : "text-dark-blue"}`}
          >
            {props.departmentIcon}
          </div>
        ) : (
          <Image src={props.departmentImage} alt="Dev" height={60} width={60} />
        )}
        <span
          className={`ml-4 text-3xl md:text-4xl font-semibold text-center ${
            isDark ? "text-white" : "text-dark-blue"
          }`}
        >
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
        <div
          className={`text-center text-xl py-10 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          No posts found for {props.departmentName}.
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-10 md:gap-20">
          {Posts}
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

      <div>
        <div
          className={`border ${isDark ? "border-gray-500" : "border-gray-300"}`}
        ></div>
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
          <a href="https://www.linkedin.com/company/cse-club/" target="_blank">
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
          className={`pb-2 flex justify-center text-[11px] font-light ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Copyright &copy; <span>{new Date().getFullYear()}</span>&nbsp;Club
          Scientifique de l'ESI. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
