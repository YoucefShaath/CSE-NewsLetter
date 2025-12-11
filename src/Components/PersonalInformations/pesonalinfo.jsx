"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

export default function PersonalInformation() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    username: "jordan.smith",
    email: "jordan.smith@cse.corp",
    password: "••••••••••••",
    firstName: "Jordan",
    lastName: "Smith",
    department: "Software Engineering",
    role: "Senior Software Engineer",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    console.log("Saving changes:", formData);
    alert("Changes saved successfully!");
  };

  const handleCancel = () => {
    setFormData({
      username: "jordan.smith",
      email: "jordan.smith@cse.corp",
      password: "••••••••••••",
      firstName: "Jordan",
      lastName: "Smith",
      department: "Software Engineering",
      role: "Senior Software Engineer",
    });
  };

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
                      <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-24 w-24 sm:h-32 sm:w-32 bg-blue"></div>
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
                        Jordan Smith
                      </p>
                      <p
                        className={`text-base font-normal leading-normal ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Senior Software Engineer
                      </p>
                    </div>
                  </div>
                  <button
                    className={`flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 text-sm font-bold leading-normal w-full sm:w-auto ${
                      isDark
                        ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    }`}
                  >
                    <span className="truncate">Upload Photo</span>
                  </button>
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
                    <input
                      className={`flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded focus:outline-0 focus:ring-2 focus:ring-blue-500/50 border focus:border-blue-600 h-12 p-[15px] text-base font-normal leading-normal ${
                        isDark
                          ? "text-gray-100 border-gray-700 bg-gray-950"
                          : "text-gray-900 border-gray-300 bg-white"
                      }`}
                      id="department"
                      name="department"
                      type="text"
                      value={formData.department}
                      onChange={handleChange}
                    />
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
                      className={`flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded focus:outline-0 focus:ring-2 focus:ring-blue-500/50 border focus:border-blue-600 h-12 p-[15px] text-base font-normal leading-normal ${
                        isDark
                          ? "text-gray-100 border-gray-700 bg-gray-950"
                          : "text-gray-900 border-gray-300 bg-white"
                      }`}
                      id="role"
                      name="role"
                      type="text"
                      value={formData.role}
                      onChange={handleChange}
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
                  className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white text-base font-bold leading-normal"
                >
                  <span className="truncate">Save Changes</span>
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
