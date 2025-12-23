"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Profile from "@/Components/Profile/profile.jsx";
import Navbar from "@/Components/NavBar/Logedinnavbar.jsx";
import { useAuth } from "@/context/AuthContext";

export default function UserProfilePage() {
  const { username } = useParams();
  const { user: loggedInUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${username}/`
        );

        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        } else {
          console.warn(
            `Could not fetch user profile for ${username}. Status: ${res.status}`
          );
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    }

    if (username) {
      fetchUser();
    }
  }, [username, loggedInUser]);

  useEffect(() => {
    async function fetchUserPosts() {
      const token = localStorage.getItem("token");
      const authPrefix = localStorage.getItem("authPrefix") || "Bearer";
      const headers = {};

      if (token) {
        headers.Authorization = `${authPrefix} ${token}`;
      }

      try {
        const likedRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${username}/liked/`,
          {
            headers: headers,
          }
        );
        if (likedRes.ok) {
          const data = await likedRes.json();
          let posts = Array.isArray(data) ? data : data.results || [];

          if (loggedInUser && loggedInUser.username === username) {
            posts = posts.map((post) => ({ ...post, is_liked: true }));
          }

          setLikedPosts(posts);
        } else {
          console.error(`Failed to fetch liked posts: ${likedRes.status}`);
        }
      } catch (error) {
        console.error("Error fetching liked posts:", error);
      }

      try {
        const savedRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${username}/saved/`,
          {
            headers: headers,
          }
        );

        if (savedRes.ok) {
          const data = await savedRes.json();
          let posts = Array.isArray(data) ? data : data.results || [];

          if (loggedInUser && loggedInUser.username === username) {
            posts = posts.map((post) => ({ ...post, is_saved: true }));
          }

          setSavedPosts(posts);
        } else {
          console.error(`Failed to fetch saved posts: ${savedRes.status}`);
          setSavedPosts([]);
        }
      } catch (error) {
        console.error("Error fetching saved posts:", error);
        setSavedPosts([]);
      }
    }

    if (username) {
      fetchUserPosts();
    }
  }, [username, loggedInUser]);

  const getImageUrl = (path) => {
    if (!path) return "/hackitpic.png";
    if (path.startsWith("http")) return path;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${baseUrl}${cleanPath}`;
  };

  const displayName = userData
    ? `${userData.first_name} ${userData.last_name}`.trim() || userData.username
    : username;

  const displayRole = userData?.role || "Member";

  const displayImage = getImageUrl(userData.image);

  if (loading) {
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
        bio={`Profile of ${displayName}`}
        image={displayImage}
        likedPosts={likedPosts}
        savedPosts={savedPosts}
        isOwnProfile={
          loggedInUser &&
          loggedInUser.username?.toLowerCase() === username?.toLowerCase()
        }
        username={username}
      />
    </div>
  );
}
