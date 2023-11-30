import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home/Home";
import Main from "../Layout/Main";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import DashboardLayout from "../Layout/DashboardLayout";
import BookAParcel from "../pages/Dashboard/BookAParcel/BookAParcel";

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
    element: <DashboardLayout />,
    children: [
      // user routes
      {
        path: "book-parcel",
        element: <BookAParcel />,
      },
      {
        path: "my-parcels",
        element: <div>My parcels</div>,
      },
      {
        path: "profile",
        element: <div>My Profile</div>,
      },

      // rider routes
      {
        path: "delivery-list",
        element: <div>delivery list</div>,
      },
      {
        path: "my-reviews",
        element: <div>My reviews</div>,
      },

      // admin routes
      {
        path: "all-parcels",
        element: <div>all parcels</div>,
      },
      {
        path: "all-users",
        element: <div>all users</div>,
      },
      {
        path: "all-rider",
        element: <div>all delivery men</div>,
      },
      {
        path: "statistics",
        element: <div>Statistics</div>,
      },
    ],
  },
]);

export default router;
