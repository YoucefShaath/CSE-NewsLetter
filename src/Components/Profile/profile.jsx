"use client";
import Image from "next/image";
import { useTheme } from "../../context/ThemeContext";

export default function Profile(props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const user = {
    name: props.name,
    role: props.role,
    bio: props.bio,
    image: props.image,
    coverImage: "/Departmentsbackground.svg",
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-dark-blue" : "bg-gray-50"
      }`}
    >
      {/* Main Content Container */}
      <div className="pt-24 pb-10 px-4 md:px-10 max-w-7xl mx-auto">
        {/* Profile Header Card */}
        <div
          className={`rounded-3xl shadow-sm border overflow-hidden mb-10 transition-colors duration-300 ${
            isDark ? "bg-blue border-blue-900" : "bg-white border-gray-100"
          }`}
        >
          {/* Cover Image */}
          <div className="h-48 md:h-64 w-full relative bg-blue-900">
            <Image
              src={user.coverImage}
              alt="Cover"
              fill
              className="object-cover opacity-80"
            />
          </div>

          {/* Profile Info */}
          <div className="px-8 pb-8 relative">
            {/* Avatar */}
            <div
              className={`absolute -top-16 left-8 md:left-12 border-4 rounded-full overflow-hidden w-32 h-32 shadow-md transition-colors duration-300 ${
                isDark ? "border-blue bg-blue-900" : "border-white bg-gray-200"
              }`}
            >
              <Image
                src={user.image}
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Text Info */}
            <div className="pt-20">
              <h1
                className={`text-3xl font-bold transition-colors duration-300 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {user.name}
              </h1>
              <p
                className={`font-medium mb-4 transition-colors duration-300 ${
                  isDark ? "text-blue-400" : "text-blue-600"
                }`}
              >
                {user.role}
              </p>
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
      </div>
    </div>
  );
}
