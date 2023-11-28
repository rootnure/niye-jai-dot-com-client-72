import Footer from "../pages/Shared/Footer/Footer";
import NavBarPC from "../pages/Shared/NavBar/NavBarPC";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <>
      <NavBarPC />
      <Outlet />
      <Footer />
    </>
  );
};

export default Main;
