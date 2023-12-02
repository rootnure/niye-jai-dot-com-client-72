import { Link, NavLink } from "react-router-dom";
import Container from "../../../component/Container";
import Logo from "../Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import { FaBell } from "react-icons/fa6";
import useLogout from "../../../hooks/useLogout";

const NavBarPC = () => {
  const { user } = useAuth();
  const handleLogOut = useLogout();

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
            <span className="indicator-item badge bg-my-primary scale-[35%]">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-my-primary opacity-75"></span>
            </span>
            <FaBell className="text-xl" />
          </div>
        </NavLink>
      </li>
      {user ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="hover:bg-gray-200 px-3 py-0.5 rounded-lg">
            <img
              src={user.photoURL}
              alt={`Profile photo of ${user.displayName}`}
              className="h-8 w-8 rounded-full"
            />
          </div>
          <ul className="dropdown-content z-[1] menu p-2 border bg-base-100 rounded-box w-52 text-center">
            <li className="text-center py-2 text-my-primary">
              {user.displayName}
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <button onClick={handleLogOut}>LogOut</button>
            </li>
          </ul>
        </div>
      ) : (
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      )}
    </>
  );

  return (
    <header className="navbar bg-white shadow-md justify-center fixed top-0 z-[1000] left-0 right-0">
      <Container>
        <div className="lg:flex-1 w-full lg:w-fit flex justify-center lg:justify-start">
          <div className="w-fit">
            <Logo />
          </div>
        </div>
        <div className="hidden lg:block">
          <ul className="menu menu-horizontal items-center px-1 gap-2 pc-navbar font-semibold">
            {navItems}
          </ul>
        </div>
      </Container>
    </header>
  );
};

export default NavBarPC;
