import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import Container from "../component/Container";
import Logo from "../pages/Shared/Logo/Logo";
import {
  FaBook,
  FaBox,
  FaChartColumn,
  FaHouse,
  FaUser,
  FaUsers,
  FaUsersGear,
} from "react-icons/fa6";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  const { pathname } = useLocation();
  return (
    <>
      <Container>
        <main className="flex gap-6">
          <aside className="w-80 px-4 py-12 bg-my-primary bg-opacity-30 min-h-screen">
            <div className="flex justify-center">
              <Logo />
            </div>
            <div>
              <ul className="font-medium text-xl mt-6 space-y-2">
                <li>
                  <Link
                    to="/dashboard"
                    className={`flex items-center gap-2 px-4 py-2 ${
                      pathname === "/dashboard" ? "active" : ""
                    }`}>
                    <FaHouse /> User Home
                  </Link>
                </li>
                {/* user menu items */}
                <>
                  <li>
                    <NavLink
                      to="/dashboard/book-parcel"
                      className="flex items-center gap-2 px-4 py-2">
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
                {/* rider menu items */}
                <>
                  <li>
                    <NavLink
                      to="/dashboard/delivery-list"
                      className="flex items-center gap-2 px-4 py-2">
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
                {/* admin menu items */}
                <>
                  <li>
                    <NavLink
                      to="/dashboard/all-parcels"
                      className="flex items-center gap-2 px-4 py-2">
                      <FaBook /> All Parcels
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
                <div className="divider"></div>
                {/* common menu items */}
                <>
                  <li>
                    <NavLink
                      to="/dashboard/all-parcels"
                      className="flex items-center gap-2 px-4 py-2">
                      <FaBook /> All Parcels
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
              </ul>
            </div>
          </aside>
          <section className="p-12">
            <Outlet />
          </section>
        </main>
      </Container>
    </>
  );
};

export default DashboardLayout;
