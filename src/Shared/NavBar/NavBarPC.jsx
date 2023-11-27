import { NavLink } from "react-router-dom";
import Container from "../../component/Container";
import Logo from "../Logo/Logo";
import { FaBell } from "react-icons/fa6";

const NavBarPC = () => {
  const navItems = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="/notifications">
          <div className="indicator">
            <span className="indicator-item badge bg-my-primary scale-50"></span>
            <FaBell className="text-2xl" />
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
    </>
  );

  return (
    <header>
      <div className="navbar bg-my-primary bg-opacity-[0.15] backdrop-blur-sm justify-center fixed top-0 z-[1000]">
        <Container>
          <div className="flex-1">
            <Logo />
          </div>
          <div className="hidden lg:block">
            <ul className="menu menu-horizontal items-center px-1 gap-2 text-lg pc-navbar font-semibold">
              {navItems}
            </ul>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default NavBarPC;
