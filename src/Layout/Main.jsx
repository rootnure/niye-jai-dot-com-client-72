import { useEffect } from "react";
import Footer from "../pages/Shared/Footer/Footer";
import NavBarPC from "../pages/Shared/NavBar/NavBarPC";
import { Outlet } from "react-router-dom";
import Aos from "aos";
import NavBarSM from "../pages/Shared/NavBar/NavBarSM";
import ScrollToTop from "../component/ScrollToTop";

const Main = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <>
      <NavBarPC />
      <NavBarSM />
      <Outlet />
      <Footer />
      <ScrollToTop />
      <div className="mt-16 lg:hidden"></div>
    </>
  );
};

export default Main;
