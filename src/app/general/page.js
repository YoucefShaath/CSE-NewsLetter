"use client";
import DepartmentPage from "@/Components/departements/departements.jsx";
import Navbar from "@/Components/NavBar/Logedinnavbar.jsx";
import { useTheme } from "../../context/ThemeContext";
import { FaHome } from "react-icons/fa";

export default function Page() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      <Navbar />
      <DepartmentPage
        departmentImage={isDark ? "/whitehouse.svg" : "/home.svg"}
        departmentIcon={<FaHome />}
        departmentName="General"
      />
    </>
  );
}
