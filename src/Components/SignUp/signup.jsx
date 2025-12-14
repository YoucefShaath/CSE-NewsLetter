"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    setError("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const signupData = {
        username: formData.username,
        email: formData.email,
        password1: formData.password,
        password2: formData.confirmPassword,
        first_name: formData.firstName,
        last_name: formData.lastName,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dj-rest-auth/registration/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupData),
        }
      );

      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {}

      if (res.ok) {
        router.push("/login");
      } else {
        let errorMsg = "Signup failed";
        if (data && typeof data === "object") {
          errorMsg = Object.entries(data)
            .map(([key, messages]) => {
              const msg = Array.isArray(messages)
                ? messages.join(" ")
                : messages;
              return `${key}: ${msg}`;
            })
            .join(", ");
        } else if (text) {
        }
        setError(errorMsg);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:flex h-screen">
      <div className="hidden md:block w-[50%] bg-white">
        <div className="flex flex-col items-start justify-center h-full px-50">
          <span className="text-4xl ">Sign Up</span>
          <div className="flex gap-4 mt-6 w-full max-w-xs">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="border border-gray-300 rounded-md px-4 py-2 mt-4 w-full max-w-xs"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border border-gray-300 rounded-md px-4 py-2 mt-4 w-full max-w-xs"
          />
          <div className="relative mt-4 w-full max-w-xs">
            <input
              type={showPassword1 ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword1(!showPassword1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-dark-blue transition-colors cursor-pointer"
            >
              {showPassword1 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="relative mt-4 w-full max-w-xs">
            <input
              type={showPassword2 ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="bg-white text-dark-blue border border-gray-300 rounded-md px-4 py-2 w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword2(!showPassword2)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-dark-blue transition-colors cursor-pointer"
            >
              {showPassword2 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2 max-w-xs">{error}</p>
          )}
          <button
            onClick={handleSignup}
            disabled={loading}
            className="group bg-dark-blue text-white rounded-md px-4 py-2 mt-6 w-full max-w-xs hover:bg-white hover:text-dark-blue 
            border-[2px] border-dark-blue transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg disabled:opacity-50"
          >
            <span className="inline-block group-hover:translate-x-3 transition-transform duration-300">
              {loading ? "Signing Up..." : "Sign Up"}
            </span>
            <Image
              src="/arrow.svg"
              alt="Arrow Right"
              width={20}
              height={20}
              className="inline-block ml-2 group-hover:opacity-0 transition-opacity duration-300"
            />
          </button>
          <div className="flex items-center mt-4 w-full max-w-xs">
            <div className="border border-gray-300 flex-1"></div>
            <span className="mx-2 text-gray-600">or</span>
            <div className="border border-gray-300 flex-1"></div>
          </div>
          <button className="bg-white text-dark-blue rounded-md px-4 py-2 mt-6 w-full max-w-xs border border-dark-blue border-[2px] hover:bg-dark-blue hover:text-white transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg">
            Sign Up with Google
            <Image
              src="/google.svg"
              alt="Google logo"
              width={20}
              height={20}
              className="inline-block ml-2"
            />
          </button>
          <span className="mt-4">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-light-blue font-semibold hover:underline transition-all"
            >
              Log In
            </Link>
          </span>
        </div>
      </div>
      <div className="hidden md:flex flex-col items-center justify-center w-[50%] bg-dark-blue">
        <Image
          src="/darklogo.svg"
          alt="CSE Logo"
          width={200}
          height={200}
          className="mx-auto mb-10"
        />
        <span className="text-white text-4xl ml-8 text-center">
          CSE NEWSLETTER
        </span>
      </div>
      <div className="block md:hidden w-full h-screen bg-dark-blue flex items-center text-white justify-center">
        <div className="flex flex-col items-start justify-center h-full">
          <span className="text-4xl ">Sign Up</span>
          <div className="flex gap-4 mt-6 w-full max-w-xs">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="bg-white text-dark-blue border border-gray-300 rounded-md px-4 py-2 w-full"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="bg-white text-dark-blue border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="bg-white text-dark-blue border border-gray-300 rounded-md px-4 py-2 mt-4 w-full max-w-xs"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="bg-white text-dark-blue border border-gray-300 rounded-md px-4 py-2 mt-4 w-full max-w-xs"
          />
          <div className="relative mt-4 w-full max-w-xs">
            <input
              type={showPassword1 ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="bg-white text-dark-blue border border-gray-300 rounded-md px-4 py-2 w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword1(!showPassword1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-dark-blue transition-colors cursor-pointer"
            >
              {showPassword1 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="relative mt-4 w-full max-w-xs">
            <input
              type={showPassword2 ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="bg-white text-dark-blue border border-gray-300 rounded-md px-4 py-2 w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword2(!showPassword2)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-dark-blue transition-colors cursor-pointer"
            >
              {showPassword2 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2 max-w-xs">{error}</p>
          )}
          <button
            onClick={handleSignup}
            disabled={loading}
            className="group bg-light-blue text-white rounded-md px-4 py-2 mt-6 w-full max-w-xs hover:bg-white hover:text-dark-blue 
            border-[2px] border-dark-blue transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg disabled:opacity-50"
          >
            <span className="inline-block group-hover:translate-x-3 transition-transform duration-300">
              {loading ? "Signing Up..." : "Sign Up"}
            </span>
            <Image
              src="/arrow.svg"
              alt="Arrow Right"
              width={20}
              height={20}
              className="inline-block ml-2 group-hover:opacity-0 transition-opacity duration-300"
            />
          </button>
          <div className="flex items-center mt-4 w-full max-w-xs">
            <div className="border border-gray-300 flex-1"></div>
            <span className="mx-2 text-gray-600">or</span>
            <div className="border border-gray-300 flex-1"></div>
          </div>
          <button className="bg-white text-dark-blue rounded-md px-4 py-2 mt-6 w-full max-w-xs border-white border-[2px] hover:bg-dark-blue hover:text-white transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg">
            Sign Up with Google
            <Image
              src="/google.svg"
              alt="Google logo"
              width={20}
              height={20}
              className="inline-block ml-2"
            />
          </button>
          <span className="mt-4">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-light-blue font-semibold hover:underline transition-all"
            >
              Log In
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
