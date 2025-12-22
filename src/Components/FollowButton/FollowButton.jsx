import { useState } from "react";
import { toggleDepartmentFollow } from "../../utils/api";

export default function FollowButton({
  departmentName,
  initialIsFollowing,
  token,
  isDark,
}) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [loading, setLoading] = useState(false);

  const handleFollowClick = async () => {
    setLoading(true);
    try {
      // Call the API
      const data = await toggleDepartmentFollow(departmentName, token);

      // Update state based on backend response
      // Assuming the backend returns { following: boolean } or similar
      // If the backend returns the new state, use it.
      // If the user's snippet implies data.following, I'll use that.
      if (data && typeof data.following !== "undefined") {
        setIsFollowing(data.following);
      } else {
        // Fallback if response structure is different, just toggle
        setIsFollowing(!isFollowing);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Could not update follow status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleFollowClick}
      disabled={loading}
      className={`flex min-w-[96px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 text-xs font-semibold uppercase tracking-wider shrink-0 transition-colors ${
        isFollowing
          ? "bg-light-blue text-white border border-blue hover:bg-blue"
          : `border border-light-blue ${
              isDark
                ? "text-white hover:bg-gray-900"
                : "text-dark-blue hover:bg-gray-100"
            } hover:text-amber-50`
      } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <span className="truncate">
        {loading ? "..." : isFollowing ? "Following" : "Follow"}
      </span>
    </button>
  );
}
