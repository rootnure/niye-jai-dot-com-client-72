import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home/Home";
import Main from "../Layout/Main";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import DashboardLayout from "../Layout/DashboardLayout";
import BookAParcel from "../pages/Dashboard/BookAParcel/BookAParcel";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AllRiders from "../pages/Dashboard/AllRiders/AllRiders";
import UserRoute from "./UserRoute";
import RiderRoute from "./RiderRoute";
import AdminRoute from "./AdminRoute";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import UpdateBooking from "../pages/Dashboard/UpdateBooking/UpdateBooking";
import ConditionalPage from "../pages/Dashboard/ConditionalPage/ConditionalPage";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "notifications",
        element: <div>Notifications</div>,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // user routes
      // use conditional rendering for default route based on user role
      {
        index: true,
        element: <ConditionalPage />,
      },
      {
        path: "book-parcel",
        element: (
          <UserRoute>
            <BookAParcel />
          </UserRoute>
        ),
      },
      {
        path: "my-parcels",
        element: (
          <UserRoute>
            <MyParcels />
          </UserRoute>
        ),
      },
      {
        path: "update-booking/:id",
        element: (
          <UserRoute>
            <UpdateBooking />
          </UserRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <UserRoute>
            <MyProfile />
          </UserRoute>
        ),
      },

      // rider routes
      {
        path: "delivery-list",
        element: (
          <RiderRoute>
            <div>delivery list</div>
          </RiderRoute>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <RiderRoute>
            <div>My reviews</div>
          </RiderRoute>
        ),
      },

      // admin routes
      {
        path: "all-parcels",
        element: (
          <AdminRoute>
            <div>all parcels</div>
          </AdminRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "all-riders",
        element: (
          <AdminRoute>
            <AllRiders />
          </AdminRoute>
        ),
      },
      {
        path: "statistics",
        element: (
          <AdminRoute>
            <div>Statistics</div>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
