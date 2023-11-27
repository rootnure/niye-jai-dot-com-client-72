import NavBarPC from "../Shared/NavBar/NavBarPC";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <>
      <NavBarPC />
      <Outlet />
      <footer>footer</footer>
    </>
  );
};

export default Main;
