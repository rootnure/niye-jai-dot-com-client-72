import { useEffect } from "react";
import Footer from "../pages/Shared/Footer/Footer";
import NavBarPC from "../pages/Shared/NavBar/NavBarPC";
import { Outlet } from "react-router-dom";
import Aos from "aos";

const Main = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <>
      <NavBarPC />
      <Outlet />
      <Footer />
    </>
  );
};

export default Main;
