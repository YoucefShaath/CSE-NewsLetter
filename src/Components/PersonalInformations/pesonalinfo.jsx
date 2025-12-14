"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

// Helper to construct full image URL
const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  // Remove double slashes if API_URL ends with / and path starts with /
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};

export default function PersonalInformation() {
  const { theme } = useTheme();
  const { user, login } = useAuth();
  const isDark = theme === "dark";
  const [loading, setLoading] = useState(false);

  const departments = [
    "General",
    "HR",
    "Development",
    "UI/UX",
    "Design",
    "Relev/Relex",
    "Communication",
    "Multimedia",
  ];

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "••••••••••••", // Placeholder
    firstName: "",
    lastName: "",
    department: "",
    role: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        password: "••••••••••••",
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        department: user.department || "",
        role: user.role || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const authPrefix = localStorage.getItem("authPrefix") || "Bearer";

      // Prepare payload - map camelCase to snake_case
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        username: formData.username,
        department: formData.department,
        role: formData.role,
      };

      // Only send password if it's changed from placeholder
      // Note: Updating password usually requires a different endpoint or current password
      // For now, we'll skip password update here to avoid errors

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dj-rest-auth/user/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${authPrefix} ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        const updatedUser = await res.json();
        // Update local user context
        login(updatedUser, token);
        alert("Changes saved successfully!");
      } else {
        const errorData = await res.json();
        console.error("Failed to update profile:", errorData);
        alert(`Failed to save changes: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        password: "••••••••••••",
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        department: user.department || "",
        role: user.role || "",
      });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const authPrefix = localStorage.getItem("authPrefix") || "Bearer";

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dj-rest-auth/user/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `${authPrefix} ${token}`,
          },
          body: formData,
        }
      );

      if (res.ok) {
        const updatedUser = await res.json();
        login(updatedUser, token);
        alert("Profile photo updated successfully!");
      } else {
        const errorData = await res.json();
        console.error("Failed to upload image:", errorData);
        alert("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred while uploading the image.");
    } finally {
      setLoading(false);
    }
  };

  const userImage = getImageUrl(user?.image);

  return (
    <div
      className={`relative flex h-auto min-h-screen w-full flex-col transition-colors duration-300 ${
        isDark
          ? "bg-cover bg-[url('/bg-persInfsm.png')] md:bg-[url('/bg-persInf.png')] bg-dark-blue"
          : "bg-white"
      }`}
    >
      <div className="flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5 sm:px-4 md:px-10 lg:px-20 xl:px-40">
          <div className="flex flex-col max-w-[960px] flex-1">
            {/* Header */}

            {/* Main Content */}
            <main className="flex-1 px-4 sm:px-6 lg:px-10 py-8">
              <div className="flex mt-24 flex-wrap justify-between gap-3 pb-8">
                <p
                  className={`text-5xl font-bold leading-tight tracking-tight min-w-72 ${
                    isDark ? "text-white" : "text-dark-blue"
                  }`}
                >
                  Personal Information
                </p>
              </div>

              {/* Profile Section */}
              <div
                className={`flex border-b p-4 ${
                  isDark ? "border-gray-800" : "border-gray-200"
                }`}
              >
                <div className="flex w-full flex-col gap-6 sm:flex-row sm:justify-between sm:items-center">
                  <div className="flex gap-6 items-center">
                    <div className="relative group">
                      <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-full overflow-hidden bg-gray-200">
                        {userImage ? (
                          // TEMPORARY DEBUGGING: Use standard img tag
                          <img
                            src={userImage}
                            alt="Profile"
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-4xl">
                            {formData.firstName?.[0] || "U"}
                          </div>
                        )}
                      </div>
                      <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                        <span className="text-white text-3xl">📷</span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center">
                      <p
                        className={`text-2xl sm:text-3xl font-bold leading-tight ${
                          isDark ? "text-white" : "text-dark-blue"
                        }`}
                      >
                        {formData.firstName} {formData.lastName}
                      </p>
                      <p
                        className={`text-base font-normal leading-normal ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {formData.role}
                      </p>
                    </div>
                  </div>
                  <label
                    className={`flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 text-sm font-bold leading-normal w-full sm:w-auto ${
                      isDark
                        ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    }`}
                  >
                    <span className="truncate">
                      {loading ? "Uploading..." : "Upload Photo"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={loading}
                    />
                  </label>
                </div>
              </div>

              {/* Form Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 mt-8">
                {/* Account Settings */}
                <section>
                  <h2
                    className={`text-2xl font-bold leading-tight px-4 pb-3 pt-5 ${
                      isDark ? "text-white" : "text-dark-blue"
                    }`}
                  >
                    Account Settings
                  </h2>
                  <div className="space-y-4">
                    <div className="flex flex-col min-w-40 flex-1 px-4 py-3">
                      <label
                        className={`text-base font-medium leading-normal pb-2 ${
                          isDark ? "text-gray-200" : "text-dark-blue"
                        }`}
                        htmlFor="username"
                      >
                        Username
                      </label>
                      <input
                        className={`flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded focus:outline-0 focus:ring-0 border h-12 p-[15px] text-base font-normal leading-normal ${
                          isDark
                            ? "bg-gray-800 text-gray-400 border-gray-700"
                            : "bg-gray-100 text-gray-500 border-gray-300"
                        }`}
                        id="username"
                        name="username"
                        readOnly
                        type="text"
                        value={formData.username}
                      />
                    </div>
                    <div className="flex flex-col min-w-40 flex-1 px-4 py-3">
                      <label
                        className={`text-base font-medium leading-normal pb-2 ${
                          isDark ? "text-gray-200" : "text-dark-blue"
                        }`}
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        className={`flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded focus:outline-0 focus:ring-2 focus:ring-blue-500/50 border focus:border-blue-600 h-12 p-[15px] text-base font-normal leading-normal ${
                          isDark
                            ? "text-gray-100 border-gray-700 bg-gray-950"
                            : "text-gray-900 border-gray-300 bg-white"
                        }`}
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col min-w-40 flex-1 px-4 py-3">
                      <label
                        className={`text-base font-medium leading-normal pb-2 ${
                          isDark ? "text-gray-200" : "text-dark-blue"
                        }`}
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          className={`flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded focus:outline-0 focus:ring-2 focus:ring-blue-500/50 border focus:border-blue-600 h-12 p-[15px] pr-24 text-base font-normal leading-normal ${
                            isDark
                              ? "text-gray-100 border-gray-700 bg-gray-950"
                              : "text-gray-900 border-gray-300 bg-white"
                          }`}
                          id="password"
                          name="password"
                          type="password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                        <button
                          className={`absolute inset-y-0 right-0 flex items-center px-4 ${
                            isDark
                              ? "text-gray-400 hover:text-blue-400"
                              : "text-gray-500 hover:text-blue-600"
                          }`}
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Profile Details */}
                <section>
                  <h2
                    className={`text-2xl font-bold leading-tight px-4 pb-3 pt-5 ${
                      isDark ? "text-white" : "text-dark-blue"
                    }`}
                  >
                    Profile Details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                    <div className="flex flex-col min-w-40 flex-1 px-4 py-3">
                      <label
                        className={`text-base font-medium leading-normal pb-2 ${
                          isDark ? "text-gray-200" : "text-dark-blue"
                        }`}
                        htmlFor="firstName"
                      >
                        First Name
                      </label>
                      <input
                        className={`flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded focus:outline-0 focus:ring-2 focus:ring-blue-500/50 border focus:border-blue-600 h-12 p-[15px] text-base font-normal leading-normal ${
                          isDark
                            ? "text-gray-100 border-gray-700 bg-gray-950"
                            : "text-gray-900 border-gray-300 bg-white"
                        }`}
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col min-w-40 flex-1 px-4 py-3">
                      <label
                        className={`text-base font-medium leading-normal pb-2 ${
                          isDark ? "text-gray-200" : "text-dark-blue"
                        }`}
                        htmlFor="lastName"
                      >
                        Last Name
                      </label>
                      <input
                        className={`flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded focus:outline-0 focus:ring-2 focus:ring-blue-500/50 border focus:border-blue-600 h-12 p-[15px] text-base font-normal leading-normal ${
                          isDark
                            ? "text-gray-100 border-gray-700 bg-gray-950"
                            : "text-gray-900 border-gray-300 bg-white"
                        }`}
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col min-w-40 flex-1 px-4 py-7">
                    <label
                      className={`text-base font-medium leading-normal pb-2 ${
                        isDark ? "text-gray-200" : "text-dark-blue"
                      }`}
                      htmlFor="department"
                    >
                      Department
                    </label>
                    <select
                      className={`flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded focus:outline-0 focus:ring-2 focus:ring-blue-500/50 border focus:border-blue-600 h-12 p-[15px] text-base font-normal leading-normal appearance-none ${
                        isDark
                          ? "text-gray-100 border-gray-700 bg-gray-950"
                          : "text-gray-900 border-gray-300 bg-white"
                      }`}
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Select Department
                      </option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col min-w-40 flex-1 px-4 py-3">
                    <label
                      className={`text-base font-medium leading-normal pb-2 ${
                        isDark ? "text-gray-200" : "text-dark-blue"
                      }`}
                      htmlFor="role"
                    >
                      Role/Position
                    </label>
                    <input
                      className={`flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded focus:outline-0 border h-12 p-[15px] text-base font-normal leading-normal cursor-not-allowed opacity-70 ${
                        isDark
                          ? "text-gray-400 border-gray-700 bg-gray-900"
                          : "text-gray-500 border-gray-300 bg-gray-100"
                      }`}
                      id="role"
                      name="role"
                      type="text"
                      value={formData.role}
                      readOnly
                    />
                  </div>
                </section>
              </div>

              {/* Action Buttons */}
              <div
                className={`mt-8 pt-6 border-t flex justify-end gap-4 px-4 ${
                  isDark ? "border-gray-800" : "border-gray-200"
                }`}
              >
                <button
                  onClick={handleCancel}
                  className={`flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 text-base font-bold leading-normal ${
                    isDark
                      ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  }`}
                >
                  <span className="truncate">Cancel</span>
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className={`flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white text-base font-bold leading-normal ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <span className="truncate">
                    {loading ? "Saving..." : "Save Changes"}
                  </span>
                </button>
              </div>
            </main>

            {/* Footer */}
            <footer
              className={`flex flex-col gap-4 text-center mt-10 text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <div
                className={`border ${
                  isDark ? "border-gray-700" : "border-gray-300"
                }`}
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
                <a
                  href="https://www.linkedin.com/company/cse-club/"
                  target="_blank"
                >
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
              <p className="text-gray-400 pb-2 flex justify-center text-[11px] font-light">
                Copyright &copy; <span>{new Date().getFullYear()}</span>
                &nbsp;Club Scientifique de l'ESI. All Rights Reserved.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
