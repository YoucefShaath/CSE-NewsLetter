"use client";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { FaTimes, FaImage } from "react-icons/fa";

export default function CreatePostModal({ isOpen, onClose }) {
  const { theme } = useTheme();
  const { user } = useAuth();
  const isDark = theme === "dark";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [department, setDepartment] = useState(user?.department || "General");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const userRole = user?.role?.toLowerCase()?.trim();

  const isHighLevel = ["president", "vice president"].includes(userRole);
  const canChooseDepartment = isHighLevel;

  const departments = [
    "General",
    "Development",
    "UI/UX",
    "Design",
    "HR",
    "Communication",
    "Relev/Relex",
    "Multimedia",
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    let selectedDepartment = department;
    if (!canChooseDepartment) {
      selectedDepartment = user?.department || "General";
    }
    formData.append("department", selectedDepartment);

    if (user?.id || user?.pk) {
      formData.append("author", user.id || user.pk);
    }

    if (image) {
      formData.append("image", image);
    }

    try {
      const token = localStorage.getItem("token");
      const authPrefix = localStorage.getItem("authPrefix") || "Bearer";

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/`, {
        method: "POST",
        headers: {
          Authorization: `${authPrefix} ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        onClose();
        window.location.reload();
      } else {
        const errorData = await res.json();
        alert(`Failed to create post: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      alert("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className={`w-full max-w-2xl rounded-2xl shadow-2xl p-8 relative ${
          isDark ? "bg-dark-blue text-white" : "bg-white text-dark-blue"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
        >
          <FaTimes size={24} />
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center">Create New Post</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                isDark
                  ? "bg-gray-800 border-gray-700 focus:ring-blue-500 text-white"
                  : "bg-gray-50 border-gray-300 focus:ring-blue-500 text-gray-900"
              }`}
              placeholder="Enter post title..."
            />
          </div>

          {/* Department Selection (Conditional) */}
          <div>
            <label className="block text-sm font-medium mb-2">Department</label>
            {canChooseDepartment ? (
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                  isDark
                    ? "bg-gray-800 border-gray-700 focus:ring-blue-500 text-white"
                    : "bg-gray-50 border-gray-300 focus:ring-blue-500 text-gray-900"
                }`}
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            ) : (
              <div
                className={`w-full px-4 py-3 rounded-lg border opacity-70 cursor-not-allowed ${
                  isDark
                    ? "bg-gray-800 border-gray-700 text-gray-400"
                    : "bg-gray-100 border-gray-300 text-gray-500"
                }`}
              >
                {user?.department || "Your Department"}
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={5}
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-all resize-none ${
                isDark
                  ? "bg-gray-800 border-gray-700 focus:ring-blue-500 text-white"
                  : "bg-gray-50 border-gray-300 focus:ring-blue-500 text-gray-900"
              }`}
              placeholder="Write your post content here..."
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Image</label>
            <div className="flex items-center gap-4">
              <label
                className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                  isDark
                    ? "bg-gray-800 hover:bg-gray-700 text-blue-400"
                    : "bg-blue-50 hover:bg-blue-100 text-blue-600"
                }`}
              >
                <FaImage />
                <span>Choose Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {preview && (
                <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-300">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold text-lg shadow-lg transition-transform transform hover:scale-[1.02] ${
              loading ? "opacity-70 cursor-wait" : ""
            } ${
              isDark
                ? "bg-blue-600 hover:bg-blue-500 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Publishing..." : "Publish Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
