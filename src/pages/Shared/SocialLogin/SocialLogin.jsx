import PropTypes from "prop-types";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = ({ setAuthLoading }) => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const handleGoogleLogin = () => {
    setAuthLoading(true);
    googleLogin()
      .then(({ user }) => {
        toast.success(`Welcome back, ${user.displayName}`);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setAuthLoading(false);
      });
  };
  return (
    <div>
      <div className="divider">Login With</div>
      <button
        onClick={handleGoogleLogin}
        className="flex justify-center items-center w-full bg-opacity-80 hover:bg-opacity-100 text-white bg-my-primary mt-6 py-4 rounded-lg text-xl font-semibold">
        <FcGoogle className="me-2 text-3xl" /> Google
      </button>
    </div>
  );
};

SocialLogin.propTypes = {
  setAuthLoading: PropTypes.func.isRequired,
};

export default SocialLogin;
