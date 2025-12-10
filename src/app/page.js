import DepartementsPage  from  "../Components/departements/departements.jsx";
import Navbar_Dark from "@/Components/NavBar/darknavbar.jsx";



export default function Home() {
  return (
    <div>
      <DepartementsPage departmentName="Development" departmentImage="/VisualStudioCode.svg" />
    </div>
  );
}
