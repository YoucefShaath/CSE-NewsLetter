"use client";
import { useParams } from "next/navigation";
import DepartmentPage from "@/Components/departements/departements.jsx";
import Navbar from "@/Components/NavBar/Logedinnavbar.jsx";
import { useTheme } from "../../../context/ThemeContext";
import {
  FaCode,
  FaPencilRuler,
  FaPalette,
  FaUsers,
  FaBullhorn,
  FaHandshake,
} from "react-icons/fa";

export default function Page() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const params = useParams();
  const slug = params.slug;

  const departmentNames = {
    dev: "Development",
    "ui-ux": "UI/UX",
    design: "Design",
    hr: "HR",
    comm: "Communication",
    "relev-relex": "Relev/Relex",
  };

  const departmentIcons = {
    dev: <FaCode />,
    "ui-ux": <FaPencilRuler />,
    design: <FaPalette />,
    hr: <FaUsers />,
    comm: <FaBullhorn />,
    "relev-relex": <FaHandshake />,
  };

  const departmentName = departmentNames[slug] || "Department";
  const departmentIcon = departmentIcons[slug];

  return (
    <>
      <Navbar />
      <DepartmentPage
        departmentImage={isDark ? "/whitehouse.svg" : "/home.svg"}
        departmentIcon={departmentIcon}
        departmentName={departmentName}
      />
    </>
  );
}
