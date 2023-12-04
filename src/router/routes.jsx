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
import AdminStatistics from "../pages/Dashboard/AdminStatistics/AdminStatistics";
import AllParcels from "../pages/Dashboard/AllParcels/AllParcels";
import MyConsignments from "../pages/Dashboard/MyConsignments/MyConsignments";
import MyReviews from "../pages/Dashboard/MyReviews/MyReviews";
import Payment from "../pages/Dashboard/Payment/Payment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <div>Error</div>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "notifications",
        element: <h2 className="my-12 py-12 text-center">Coming Soon...</h2>,
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
      {
        path: "payment/:amount",
        element: (
          <UserRoute>
            <Payment />
          </UserRoute>
        ),
      },

      // rider routes
      {
        path: "delivery-list",
        element: (
          <RiderRoute>
            <MyConsignments />
          </RiderRoute>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <RiderRoute>
            <MyReviews />
          </RiderRoute>
        ),
      },

      // admin routes
      {
        path: "statistics",
        element: (
          <AdminRoute>
            <AdminStatistics />
          </AdminRoute>
        ),
      },
      {
        path: "all-parcels",
        element: (
          <AdminRoute>
            <AllParcels />
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
    ],
  },
]);

export default router;
