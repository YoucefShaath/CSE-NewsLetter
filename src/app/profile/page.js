"use client";
import { useEffect, useState } from "react";
import Profile from "@/Components/Profile/profile.jsx";
import Navbar from "@/Components/NavBar/Logedinnavbar.jsx";
import { useAuth } from "@/context/AuthContext";

export default function Page() {
  const { user: authUser, loading: authLoading } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    if (authLoading) return;
    if (!authUser) {
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        const username = authUser.username;
        const token = localStorage.getItem("token");
        const authPrefix = localStorage.getItem("authPrefix") || "Bearer";
        const headers = {};
        if (token) {
          headers.Authorization = `${authPrefix} ${token}`;
        }

        const userRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${username}/`
        );
        if (userRes.ok) {
          const data = await userRes.json();
          setUserData(data);
        } else {
          setUserData(authUser);
        }

        const likedRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${username}/liked/`,
          { headers }
        );
        if (likedRes.ok) {
          const data = await likedRes.json();
          let posts = Array.isArray(data) ? data : data.results || [];
          // Since this is the user's own profile, they liked these posts.
          posts = posts.map((p) => ({ ...p, is_liked: true }));
          setLikedPosts(posts);
        }

        if (token) {
          const savedRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/${username}/saved/`,
            {
              headers: headers,
            }
          );
          if (savedRes.ok) {
            const data = await savedRes.json();
            let posts = Array.isArray(data) ? data : data.results || [];
            // Since this is the user's own profile, they saved these posts.
            posts = posts.map((p) => ({ ...p, is_saved: true }));
            setSavedPosts(posts);
          }
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [authUser, authLoading]);

  const getImageUrl = (path) => {
    if (!path) return "/hackitpic.png";
    if (path.startsWith("http")) return path;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${baseUrl}${cleanPath}`;
  };

  const displayName = userData
    ? `${userData.first_name} ${userData.last_name}`.trim() || userData.username
    : "User Name";
  const displayRole = userData?.role || "Member";
  const displayBio = userData?.bio || "This is your profile.";
  const displayImage = userData?.image
    ? getImageUrl(userData.image)
    : "/hackitpic.png";

  if (loading || authLoading) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Profile
        name={displayName}
        role={displayRole}
        bio={displayBio}
        image={displayImage}
        likedPosts={likedPosts}
        savedPosts={savedPosts}
        isOwnProfile={true}
      />
    </div>
  );
}
