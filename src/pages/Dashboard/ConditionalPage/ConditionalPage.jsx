import { Navigate } from "react-router-dom";
import Loading from "../../../component/Loading";
import useRole from "../../../hooks/useRole";
import AdminRoute from "../../../router/AdminRoute";
import RiderRoute from "../../../router/RiderRoute";
import UserRoute from "../../../router/UserRoute";
import BookAParcel from "../BookAParcel/BookAParcel";
import AdminStatistics from "../AdminStatistics/AdminStatistics";
import MyConsignments from "../MyConsignments/MyConsignments";

const ConditionalPage = () => {
  const { role, isRoleLoading } = useRole();
  if (isRoleLoading) {
    return <Loading />;
  } else if (role === "User") {
    return (
      <UserRoute>
        <BookAParcel />
      </UserRoute>
    );
  } else if (role === "Rider") {
    return (
      <RiderRoute>
        <MyConsignments />
      </RiderRoute>
    );
  } else if (role === "Admin") {
    return (
      <AdminRoute>
        <AdminStatistics />
      </AdminRoute>
    );
  } else {
    return <Navigate to="/"></Navigate>;
  }
};

export default ConditionalPage;
