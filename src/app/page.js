import Navbar_Dark from "../Components/NavBar/darknavbar.jsx";
import Navbar_Light from "../Components/NavBar/lightnavbar.jsx";
import LogIn from "@/Components/LogIn/login.jsx";
import SignUp from "@/Components/SignUp/signup.jsx";
import HomePage from "@/Components/Home/home.jsx";

export default function Home() {
  return (
    <div>
      {/* <Navbar_Dark />
      <HomePage /> */}
      {/* <LogIn/> */}
      <SignUp />
    </div>
  );
}
