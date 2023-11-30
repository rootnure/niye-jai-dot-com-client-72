import { toast } from "react-toastify";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("LogOut successfully");
        navigate("/");
      })
      .catch((err) => console.error(err));
  };
  return handleLogOut;
};

export default useLogout;
