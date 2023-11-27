import { Link, NavLink, useNavigate } from "react-router-dom";
import Container from "../../component/Container";
import Logo from "../Logo/Logo";
import { FaBell } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const NavBarPC = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("LogOut successfully");
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

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
      {user ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="hover:bg-gray-200 px-3 py-0.5 rounded-lg">
            <img
              src={user.photoURL}
              alt={`Profile photo of ${user.displayName}`}
              className="h-10 rounded-full"
            />
          </div>
          <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li className="text-center py-2">{user.displayName}</li>
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
    <header>
      <div className="navbar bg-my-primary bg-opacity-[0.15] backdrop-blur-sm justify-center fixed top-0 z-[1000]">
        <Container>
          <div className="flex-1">
            <Logo />
          </div>
          <div className="hidden lg:block">
            <ul className="menu menu-horizontal items-center px-1 gap-2 pc-navbar font-semibold">
              {navItems}
            </ul>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default NavBarPC;
