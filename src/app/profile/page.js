import Profile from "@/Components/Profile/profile.jsx";
import Navbar from "@/Components/NavBar/Logedinnavbar.jsx";

export default function Page() {
  return (
    <div>
      <Navbar />
      <Profile name="User Name" role="president" bio="This is the bio of the user." image="/hackitpic.png" />
    </div>
  );
}