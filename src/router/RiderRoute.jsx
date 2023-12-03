import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "../component/Loading";

const RiderRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isRoleLoading } = useRole();
  const { pathname } = useLocation();
  if (loading || isRoleLoading) return <Loading />;
  if (!user || !role || role !== "Rider")
    return <Navigate to="/login" state={pathname} replace />;
  return children;
};

RiderRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RiderRoute;
