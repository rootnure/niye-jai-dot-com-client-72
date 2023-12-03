import { Link, NavLink, useLocation } from "react-router-dom";
import {
  FaArrowRightFromBracket,
  FaBook,
  FaBox,
  FaBoxesStacked,
  FaChartColumn,
  FaHouse,
  FaUser,
  FaUsers,
  FaUsersGear,
} from "react-icons/fa6";
import useRole from "../../../hooks/useRole";
import Logo from "../../Shared/Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import useLogout from "../../../hooks/useLogout";
import Loading from "../../../component/Loading";
const Sidebar = () => {
  const { user } = useAuth();
  const { role } = useRole();
  const { pathname } = useLocation();

  const handleLogOut = useLogout();

  return (
    <section className="relative bg-my-primary bg-opacity-30 min-h-screen">
      <aside className="w-max min-w-[256px] px-6 py-12">
        <div className="flex justify-center">
          <Logo />
        </div>
        {!role ? (
          <div className="w-fit mx-auto py-6">
            <Loading />
          </div>
        ) : (
          <div>
            <ul className="font-medium text-xl mt-6 space-y-2">
              {/* user menu items */}
              {role === "User" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/book-parcel"
                      className={`flex items-center gap-2 px-4 py-2 ${
                        pathname === "/dashboard" ? "active" : ""
                      }`}>
                      <FaBook /> Book A Parcel
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/my-parcels"
                      className="flex items-center gap-2 px-4 py-2">
                      <FaBox /> My Parcels
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/profile"
                      className="flex items-center gap-2 px-4 py-2">
                      <FaUser /> My Profile
                    </NavLink>
                  </li>
                </>
              )}
              {/* rider menu items */}
              {role === "Rider" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/delivery-list"
                      className={`flex items-center gap-2 px-4 py-2 ${
                        pathname === "/dashboard" ? "active" : ""
                      }`}>
                      <FaBook /> My Delivery List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/my-reviews"
                      className="flex items-center gap-2 px-4 py-2">
                      <FaBox /> My Reviews
                    </NavLink>
                  </li>
                </>
              )}
              {/* admin menu items */}
              {role === "Admin" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/all-parcels"
                      className={`flex items-center gap-2 px-4 py-2 ${
                        pathname === "/dashboard" ? "active" : ""
                      }`}>
                      <FaBoxesStacked /> All Parcels
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/all-users"
                      className="flex items-center gap-2 px-4 py-2">
                      <FaUsers /> All Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/all-riders"
                      className="flex items-center gap-2 px-4 py-2">
                      <FaUsersGear /> All Delivery Men
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/statistics"
                      className="flex items-center gap-2 px-4 py-2">
                      <FaChartColumn /> Statistics
                    </NavLink>
                  </li>
                </>
              )}
              <div className="divider"></div>
              {/* common menu items */}
              <>
                <li>
                  <Link to="/" className="flex items-center gap-2 px-4 py-2">
                    <FaHouse /> Home
                  </Link>
                </li>
              </>
            </ul>
          </div>
        )}
      </aside>
      {role && (
        <div className="absolute bottom-0 px-4 py-3 w-full flex justify-between items-center border-t bg-my-primary bg-opacity-50 border-white text-white h-16 overflow-hidden">
          <div className="flex items-center gap-2 w-3/4">
            <img
              src={user?.photoURL}
              alt="User Profile Photo"
              className="h-8 w-8 rounded-full border border-white"
            />
            <p className="font-medium overflow-hidden text-ellipsis">
              {user?.displayName}
            </p>
          </div>
          <div className="relative">
            <button
              onClick={handleLogOut}
              className="btn btn-sm border-none bg-my-primary hover:bg-my-primary bg-opacity-80 hover:bg-opacity-100 text-white group absolute right-0 -top-4">
              <span className="hidden group-hover:flex">LogOut</span>
              <FaArrowRightFromBracket className="text-lg group-hover:hidden" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Sidebar;
