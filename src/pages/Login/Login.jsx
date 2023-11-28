import { useForm } from "react-hook-form";
import Container from "../../component/Container";
import PrimaryBtn from "../../component/PrimaryBtn";
import { useState } from "react";
import FormFieldRequiredErrorMsg from "../../component/FormFieldRequiredErrorMsg";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { TbFidgetSpinner } from "react-icons/tb";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const Login = () => {
  const { passwordLogin } = useAuth();
  const navigate = useNavigate();
  const [authLoading, setAuthLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    setAuthLoading(true);
    passwordLogin(data.email, data.password)
      .then(() => {
        setAuthLoading(false);
        toast.success("Login Successfully");
        navigate("/");
      })
      .catch((err) => {
        if (err.message.includes("invalid")) {
          toast.error("Wrong email or password");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
        setAuthLoading(false);
      });
  };

  return (
    <Container>
      <Helmet>
        <title>NiyeJai | Login</title>
      </Helmet>
      {authLoading && (
        <p className="fixed z-[1001] w-fit mx-auto rounded-b-lg top-0 px-4 py-1.5 bg-amber-200 left-0 right-0 font-medium">
          loading...
        </p>
      )}
      <main className="min-h-screen flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full my-12">
          <div className="h-auto flex items-center">
            <img
              src="https://i.ibb.co/cDp0FCg/2942004.jpg"
              alt=""
              className="w-3/4 mx-auto"
            />
          </div>
          <div className="m-12 p-12 bg-my-secondary bg-opacity-20 backdrop-blur rounded-xl">
            <h2 className="text-4xl text-center font-bold text-my-primary">
              Please Login
            </h2>
            <form
              onSubmit={handleSubmit(handleLogin)}
              className="card-body w-full">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email*</span>
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: true,
                    pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  })}
                  placeholder="Email"
                  className="input input-bordered"
                  autoComplete="off"
                />
                {errors.email?.type === "required" && (
                  <FormFieldRequiredErrorMsg />
                )}
                {errors.email?.type === "pattern" && (
                  <span className="text-sm text-red-500 font-medium">
                    Please Enter a valid email
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password*</span>
                </label>
                <input
                  type={isVisible ? "text" : "password"}
                  {...register("password", { required: true })}
                  placeholder="Password"
                  className="input input-bordered"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control flex-row">
                <input
                  type="checkbox"
                  id="isVisible"
                  onChange={() => setIsVisible(!isVisible)}
                />
                <label className="label" htmlFor="isVisible">
                  Show Password
                </label>
              </div>
              <div className="form-control">
                <PrimaryBtn>
                  {authLoading ? (
                    <TbFidgetSpinner className="text-2xl animate-spin" />
                  ) : (
                    "Login"
                  )}
                </PrimaryBtn>
              </div>
            </form>
            <p className="text-center">
              New Here?{" "}
              <Link to="/signup" className="font-bold text-my-primary">
                Create an account
              </Link>
            </p>
            <SocialLogin setAuthLoading={setAuthLoading} />
          </div>
        </div>
      </main>
    </Container>
  );
};

export default Login;
