"use client";
import Image from "next/image";
import { useTheme } from "../../context/ThemeContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NotificationPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState("All");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const authPrefix = localStorage.getItem("authPrefix") || "Bearer";

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/notifications/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${authPrefix} ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch notifications");
        }

        const data = await res.json();
        setNotifications(data);
      } catch (err) {
        console.error("Notification fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "Unread") return !n.is_read;
    if (activeTab === "Mentions") return false;
    return true;
  });

  const handleNotificationClick = async (notification) => {
    // Mark as read if not already read
    if (!notification.is_read) {
      try {
        const token = localStorage.getItem("token");
        const authPrefix = localStorage.getItem("authPrefix") || "Bearer";
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/notifications/${notification.id}/`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${authPrefix} ${token}`,
            },
            body: JSON.stringify({ is_read: true }),
          }
        );

        // Update local state
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === notification.id ? { ...n, is_read: true } : n
          )
        );
      } catch (error) {
        console.error("Error marking notification as read:", error);
      }
    }

    // Navigate to the correct department page
    const deptName = notification.department;
    const slugMap = {
      Development: "dev",
      "UI/UX": "ui-ux",
      Design: "design",
      HR: "hr",
      Communication: "comm",
      "Relev/Relex": "relev-relex",
      Multimedia: "multimedia",
    };

    if (deptName === "General") {
      router.push("/general");
    } else if (slugMap[deptName]) {
      router.push(`/department/${slugMap[deptName]}`);
    } else {
      router.push("/");
    }
  };

  return (
    <div
      className={`flex flex-col relative min-h-screen pt-24 pb-12 transition-colors duration-300 ${
        isDark ? "bg-dark-blue" : "bg-white"
      }`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Image
          src="/waves.svg"
          alt="background element"
          width={1565}
          height={50}
          className="absolute bottom-0 right-0 opacity-50"
        />
        {!isDark && (
          <Image
            src="/waves2.svg"
            alt="background element"
            width={1565}
            height={777}
            className="absolute top-20 left-0 opacity-50"
          />
        )}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl">
        {/* Header */}
        <div className="flex items-center mb-12">
          <div
            className={`w-1.5 h-12 rounded-full mr-6 ${
              isDark
                ? "bg-light-blue shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                : "bg-dark-blue"
            }`}
          ></div>
          <h1
            className={`text-4xl md:text-5xl font-bold tracking-tight ${
              isDark ? "text-white" : "text-dark-blue"
            }`}
          >
            Notifications
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div
            className={`flex p-1 rounded-xl ${
              isDark
                ? "bg-white/10 backdrop-blur-md border border-white/10"
                : "bg-gray-100 border border-gray-200"
            }`}
          >
            {["All", "Unread", "Mentions"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? isDark
                      ? "bg-light-blue text-white shadow-lg"
                      : "bg-white text-dark-blue shadow-md"
                    : isDark
                    ? "text-gray-300 hover:text-white hover:bg-white/5"
                    : "text-gray-500 hover:text-dark-blue hover:bg-gray-200/50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div
          className={`rounded-2xl overflow-hidden backdrop-blur-sm border ${
            isDark
              ? "bg-white/5 border-white/10"
              : "bg-white/80 border-gray-200 shadow-xl"
          }`}
        >
          {loading ? (
            <div className="p-10 text-center text-gray-400">
              Loading notifications...
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="p-10 text-center text-gray-400">
              No notifications
            </div>
          ) : (
            <div className="divide-y divide-gray-200/10 dark:divide-white/10">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`p-6 sm:p-8 flex items-start gap-6 transition-colors duration-200 cursor-pointer ${
                    isDark ? "hover:bg-white/5" : "hover:bg-gray-50"
                  } ${
                    !notification.is_read && isDark ? "bg-blue-500/10" : ""
                  } ${!notification.is_read && !isDark ? "bg-blue-50" : ""}`}
                >
                  {/* Avatar/Icon */}
                  <div
                    className={`shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg ${
                      isDark
                        ? "bg-gradient-to-br from-blue-500 to-blue-700 text-white"
                        : "bg-gradient-to-br from-white to-gray-100 text-dark-blue border border-gray-200"
                    }`}
                  >
                    {notification.department.charAt(0)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3
                        className={`text-xl font-bold truncate ${
                          isDark ? "text-white" : "text-dark-blue"
                        }`}
                      >
                        {notification.department}
                      </h3>
                      <span
                        className={`text-sm ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {new Date(notification.time).toLocaleString()}
                      </span>
                    </div>
                    <p
                      className={`text-lg leading-relaxed ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {notification.message}
                    </p>
                  </div>

                  {/* Unread Indicator */}
                  {!notification.is_read && (
                    <div className="shrink-0 mt-2">
                      <div className="w-3 h-3 rounded-full bg-light-blue shadow-[0_0_8px_rgba(56,189,248,0.8)]"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
