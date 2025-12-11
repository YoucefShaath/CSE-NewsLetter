"use client";
import Image from "next/image";
import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";

export default function NotificationPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState("All");

  const notifications = [
    {
      id: 1,
      department: "Design Department",
      message:
        "New design guidelines have been uploaded for the upcoming hackathon.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      department: "HR Department",
      message: "Please review the updated policy regarding remote work.",
      time: "5 hours ago",
      read: true,
    },
    {
      id: 3,
      department: "Tech Team",
      message: "Server maintenance is scheduled for this Friday at 10 PM.",
      time: "1 day ago",
      read: true,
    },
    {
      id: 4,
      department: "Events",
      message: "Don't forget to register for the annual team building event!",
      time: "2 days ago",
      read: false,
    },
  ];

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
          <div className="divide-y divide-gray-200/10 dark:divide-white/10">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-6 sm:p-8 flex items-start gap-6 transition-colors duration-200 ${
                  isDark ? "hover:bg-white/5" : "hover:bg-gray-50"
                } ${!notification.read && isDark ? "bg-blue-500/10" : ""} ${
                  !notification.read && !isDark ? "bg-blue-50" : ""
                }`}
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
                      {notification.time}
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
                {!notification.read && (
                  <div className="shrink-0 mt-2">
                    <div className="w-3 h-3 rounded-full bg-light-blue shadow-[0_0_8px_rgba(56,189,248,0.8)]"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
