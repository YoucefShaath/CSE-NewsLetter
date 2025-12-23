"use client";
import Image from "next/image";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import Post from "../post/post.jsx";

const getImageUrl = (path) => {
  if (!path) return "/hackitpic.png";
  if (path.startsWith("http")) return path;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};

export default function Profile(props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState("likes");
  const [selectedRole, setSelectedRole] = useState(props.role);
  const [roleLoading, setRoleLoading] = useState(false);
  const { user: currentUser } = useAuth();

  const user = {
    name: props.name,
    role: props.role,
    bio: props.bio,
    image: props.image,
    coverImage: "/Departmentsbackground.svg",
  };

  const roleOptions = [
    "President",
    "Member",
    "Vice President",
    "Manager",
    "Assistant",
  ];
  const canChangeRole = currentUser?.role === "President";

  const handleRoleChange = async (e) => {
    const newRole = e.target.value;
    setRoleLoading(true);
    try {
      const token = localStorage.getItem("token");
      const authPrefix = localStorage.getItem("authPrefix") || "Bearer";
      const payload = { role: newRole };
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL ||
          "https://cse-newsletter-backend.onrender.com"
        }/users/${props.username}/update-role/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${authPrefix} ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        setSelectedRole(newRole);
      } else {
        // Optionally show error
      }
    } catch (err) {
      // Optionally show error
    }
    setRoleLoading(false);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-dark-blue" : "bg-gray-50"
      }`}
    >
      <div className="pt-24 pb-10 px-4 md:px-10 max-w-7xl mx-auto">
        <div
          className={`rounded-3xl shadow-sm border overflow-hidden mb-10 transition-colors duration-300 ${
            isDark ? "bg-blue border-blue-900" : "bg-white border-gray-100"
          }`}
        >
          <div className="h-48 md:h-64 w-full relative bg-blue-900">
            <Image
              src={user.coverImage}
              alt="Cover"
              fill
              className="object-cover opacity-80"
            />
          </div>

          <div className="px-8 pb-8 relative">
            <div
              className={`absolute -top-16 left-8 md:left-12 border-4 rounded-full overflow-hidden w-32 h-32 shadow-md transition-colors duration-300 ${
                isDark ? "border-blue bg-blue-900" : "border-white bg-gray-200"
              }`}
            >
              <Image
                src={user.image || "/default-profile.svg"}
                alt={user.name}
                width={128}
                height={128}
                className="object-cover w-full h-full"
                unoptimized
              />
            </div>

            <div className="pt-20">
              <h1
                className={`text-3xl font-bold transition-colors duration-300 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {user.name}
              </h1>
              {canChangeRole ? (
                <div className="mb-4 flex flex-col items-start">
                  <label
                    htmlFor="role-select"
                    className={`font-semibold mb-2 text-lg ${
                      isDark ? "text-blue-300" : "text-blue-700"
                    }`}
                  >
                    Change Role:
                  </label>
                  <div className="relative w-56">
                    <select
                      id="role-select"
                      value={selectedRole}
                      onChange={handleRoleChange}
                      disabled={roleLoading}
                      className={`appearance-none w-full px-4 py-2 pr-10 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 border-2 ${
                        isDark
                          ? "bg-blue-900 text-blue-200 border-blue-700"
                          : "bg-white text-blue-700 border-blue-300"
                      }`}
                    >
                      {roleOptions.map((role) => (
                        <option key={role} value={role} className="text-base">
                          {role}
                        </option>
                      ))}
                    </select>
                    <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <svg
                        className={`w-5 h-5 ${
                          isDark ? "text-blue-200" : "text-blue-700"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </div>
                  {roleLoading && (
                    <span className="ml-2 text-xs text-blue-400 animate-pulse">
                      Updating...
                    </span>
                  )}
                </div>
              ) : (
                <p
                  className={`font-medium mb-4 transition-colors duration-300 ${
                    isDark ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  {user.role}
                </p>
              )}
              <p
                className={`max-w-2xl leading-relaxed transition-colors duration-300 ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {user.bio}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div className="flex gap-8 border-b border-gray-200 dark:border-gray-700 mb-8">
            <button
              onClick={() => setActiveTab("likes")}
              className={`pb-4 text-lg font-medium transition-colors relative ${
                activeTab === "likes"
                  ? isDark
                    ? "text-blue-400"
                    : "text-blue-600"
                  : isDark
                  ? "text-gray-400 hover:text-gray-200"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Liked Posts
              {activeTab === "likes" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-current" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`pb-4 text-lg font-medium transition-colors relative ${
                activeTab === "saved"
                  ? isDark
                    ? "text-blue-400"
                    : "text-blue-600"
                  : isDark
                  ? "text-gray-400 hover:text-gray-200"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Saved Posts
              {activeTab === "saved" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-current" />
              )}
            </button>
          </div>

          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            {(activeTab === "likes" ? props.likedPosts : props.savedPosts)
              ?.length > 0 ? (
              (activeTab === "likes" ? props.likedPosts : props.savedPosts).map(
                (post) => {
                  let authorName = "Unknown Author";
                  let authorImg = "/hackitpic.png";
                  let authorUsername = null;

                  if (post.author && typeof post.author === "object") {
                    const firstName = post.author.first_name || "";
                    const lastName = post.author.last_name || "";
                    const fullName = `${firstName} ${lastName}`.trim();
                    authorName =
                      fullName || post.author.username || "Unknown Author";
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

                  const postImage = imagePath
                    ? getImageUrl(imagePath)
                    : "/hackitpic.png";

                  return (
                    <Post
                      key={post.id}
                      id={post.id}
                      title={post.title}
                      description={post.description}
                      likes={post.likes_count || post.number_of_likes || 0}
                      comments={
                        post.comments_count || post.number_of_comments || 0
                      }
                      image={postImage}
                      author={authorName}
                      authorImage={authorImg}
                      authorUsername={authorUsername}
                      isLiked={post.is_liked}
                      isSaved={post.is_saved}
                    />
                  );
                }
              )
            ) : (
              <div
                className={`text-center w-full py-10 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                No {activeTab} posts found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
