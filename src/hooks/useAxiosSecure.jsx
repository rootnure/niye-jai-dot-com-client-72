import axios from "axios";
import useAuth from "./useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "https://72-niye-jai-dot-com-server.vercel.app",
});
const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (err) => Promise.reject(err)
  );

  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (response) => response,
      (err) => {
        const status = err.response.status;
        if (status === 401 || status === 403) {
          logOut();
          toast.error("Something went wrong. Please login again.");
          navigate("/login", { state: { from: location } });
        }
        return Promise.reject(err);
      }
    );
  }, [logOut, location, navigate]);
  return axiosSecure;
};

export default useAxiosSecure;
