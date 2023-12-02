import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "../component/Loading";

const UserRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading } = useRole();
  const { pathname } = useLocation();
  if (loading || isLoading) return <Loading />;
  if (!user || !role || role !== "User")
    return <Navigate to="/login" state={pathname} replace />;
  return children;
};

UserRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserRoute;
