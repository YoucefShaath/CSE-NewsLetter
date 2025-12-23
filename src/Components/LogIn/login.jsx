"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";

export default function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      setError("");
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        console.log(
          "Sending Google Token to:",
          `${apiUrl}/dj-rest-auth/google/`
        );

        const res = await fetch(`${apiUrl}/dj-rest-auth/google/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ access_token: tokenResponse.access_token }),
        });

        const text = await res.text();
        console.log("Backend Response:", text);

        let data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          console.error("Failed to parse JSON response:", text);
          setError(
            "Server Error: Received HTML instead of JSON. Check console for details."
          );
          setLoading(false);
          return;
        }

        if (res.ok) {
          const token = data.access || data.key;
          const refreshToken = data.refresh;

          if (!token) {
            setError("Login succeeded but no access token received.");
            setLoading(false);
            return;
          }

          const userRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/dj-rest-auth/user/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (userRes.ok) {
            const userData = await userRes.json();

            if (refreshToken) {
              localStorage.setItem("refreshToken", refreshToken);
            }
            localStorage.setItem("authPrefix", "Bearer");

            login(userData, token);
            router.push("/general");
          } else {
            setError("Failed to fetch user profile.");
          }
        } else {
          console.error("Google Login Error Response:", data);
          setError("Google Login Failed");
        }
      } catch (err) {
        console.error("Google Login Exception:", err);
        setError("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    onError: () => setError("Google Login Failed"),
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        const token = data.access;
        const refreshToken = data.refresh;

        if (!token) {
          setError("Login succeeded but no access token received.");
          setLoading(false);
          return;
        }

        const userRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dj-rest-auth/user/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (userRes.ok) {
          const userData = await userRes.json();

          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("authPrefix", "Bearer");

          login(userData, token);
          router.push("/general");
        } else {
          setError("Failed to fetch user profile.");
        }
      } else {
        const errorMsg =
          data.detail ||
          data.email?.[0] ||
          data.password?.[0] ||
          "Login failed. Please check your credentials.";
        setError(errorMsg);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="hidden  md:block w-[50%] bg-white">
        <div className="flex flex-col items-start justify-center h-full px-50">
          <span className="text-4xl font-bold">Log In</span>
          <form onSubmit={handleLogin} className="w-full max-w-xs mt-6">
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-light-blue focus:border-transparent transition-all"
            />
            <div className="relative mt-4 w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-light-blue focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-dark-blue transition-colors"
              >
                {showPassword ? (
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
            <button
              type="submit"
              disabled={loading}
              className={`group bg-dark-blue text-white rounded-md px-4 py-2 mt-6 w-full border-[2px] border-dark-blue transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg ${
                loading
                  ? "opacity-70 cursor-wait"
                  : "hover:bg-white hover:text-dark-blue"
              }`}
            >
              <span className="inline-block group-hover:translate-x-3 transition-transform duration-300">
                {loading ? "Logging in..." : "Log In"}
              </span>
              {!loading && (
                <Image
                  src="/arrow.svg"
                  alt="Arrow Right"
                  width={20}
                  height={20}
                  className="inline-block ml-2 group-hover:opacity-0 transition-opacity duration-300"
                />
              )}
            </button>
          </form>
          <div className="flex items-center mt-4 w-full max-w-xs">
            <div className="border border-gray-300 flex-1"></div>
            <span className="mx-2 text-gray-600">or</span>
            <div className="border border-gray-300 flex-1"></div>
          </div>
          <button
            onClick={() => handleGoogleLogin()}
            type="button"
            className="bg-white text-dark-blue rounded-md px-4 py-2 mt-6 w-full max-w-xs border border-dark-blue border-[2px] hover:bg-dark-blue hover:text-white transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg"
          >
            Sign In with Google
            <Image
              src="/google.svg"
              alt="Google logo"
              width={20}
              height={20}
              className="inline-block ml-2"
            />
          </button>
          <span className="mt-4">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-light-blue font-semibold hover:underline transition-all"
            >
              Sign Up
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
          className="mx-auto mb-10 animate-pulse"
        />
        <span className="text-white text-4xl ml-8 text-center font-eb-garamond">
          CSE NEWSLETTER
        </span>
      </div>
      <div className="block md:hidden w-full h-screen bg-dark-blue flex items-center text-white justify-center">
        <div className="flex flex-col items-start justify-center h-full px-8 py-20">
          <span className="text-4xl font-bold">Log In</span>
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 bg-white text-dark-blue rounded-md px-4 py-2 mt-6 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-light-blue focus:border-transparent transition-all"
          />
          <div className="relative mt-4 w-full max-w-xs">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="border border-gray-300 bg-white text-dark-blue rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-light-blue focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-dark-blue transition-colors"
            >
              {showPassword ? (
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
          <button
            onClick={() => router.push("/general")}
            className="group bg-light-blue text-white rounded-md px-4 py-2 mt-6 w-full max-w-xs hover:bg-white hover:text-dark-blue border-[2px] border-dark-blue transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg"
          >
            <span className="inline-block group-hover:translate-x-3 transition-transform duration-300">
              Log In
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
          <button className="bg-white text-dark-blue rounded-md px-4 py-2 mt-6 w-full max-w-xs  border-white border-2 hover:bg-dark-blue hover:text-white transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg">
            Sign In with Google
            <Image
              src="/google.svg"
              alt="Google logo"
              width={20}
              height={20}
              className="inline-block ml-2"
            />
          </button>
          <span className="mt-4">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-light-blue font-semibold hover:underline transition-all"
            >
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
