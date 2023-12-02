import {
  FaArrowRightFromBracket,
  FaArrowRightToBracket,
  FaBell,
  FaDisplay,
  FaHouse,
} from "react-icons/fa6";
import Container from "../../../component/Container";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

const NavBarSM = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logout Successfully");
        navigate("/");
      })
      .catch(() => {
        toast.error("Something went wrong. Please try again.");
      });
  };
  return (
    <section className="fixed bottom-0 py-2 bg-my-primary text-green-950 w-full z-[1001] [box-shadow:0px_-2px_10px_lightgray] lg:hidden">
      <Container className="flex items-center justify-around">
        <NavLink to="/" className="flex flex-col items-center p-2 rounded-lg">
          <FaHouse className="text-xl" />
          <span>Home</span>
        </NavLink>
        <Link
          to="/dashboard"
          className="flex flex-col items-center p-2 rounded-lg">
          <FaDisplay className="text-xl" />
          <span>Dashboard</span>
        </Link>
        <NavLink
          to="/notifications"
          className="flex flex-col items-center p-2 rounded-lg">
          <FaBell className="text-xl" />
          <span>Notifications</span>
        </NavLink>
        {user ? (
          <button
            onClick={handleLogOut}
            className="flex flex-col items-center p-2 rounded-lg">
            <FaArrowRightFromBracket className="text-xl" />
            <span>LogOut</span>
          </button>
        ) : (
          <Link
            to="/login"
            className="flex flex-col items-center p-2 rounded-lg">
            <FaArrowRightToBracket className="text-xl" />
            <span>Login</span>
          </Link>
        )}
      </Container>
    </section>
  );
};

export default NavBarSM;
