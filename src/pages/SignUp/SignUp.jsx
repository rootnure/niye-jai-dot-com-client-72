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

const SignUp = () => {
  const { createUser, updateUserInfo } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [roleErrMsg, setRoleErrMsg] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleSignUp = (data) => {
    setRoleErrMsg("");
    setAuthLoading(true);
    if (data.userType === "default") {
      setRoleErrMsg("Please select your role");
      setAuthLoading(false);
      return;
    }
    createUser(data.email, data.password)
      .then(() => {
        updateUserInfo(data.name, null).then(() => {
          reset();
          setAuthLoading(false);
          navigate("/");
          toast.success("SignUp successful");
        });
      })
      .catch((err) => {
        if (err.message.includes("already")) {
          toast.error("Email Already In Use. Try login instead.");
          setAuthLoading(false);
        }
      });
  };
  return (
    <Container>
      <Helmet>
        <title>Niyejai | SignUp</title>
      </Helmet>
      {authLoading && (
        <p className="fixed z-[1001] w-fit mx-auto rounded-b-lg top-0 px-4 py-1.5 bg-amber-200 left-0 right-0 font-medium">
          loading...
        </p>
      )}
      <main className="min-h-screen flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full my-12">
          <div className="h-auto flex items-center md:order-last">
            <img
              src="https://i.ibb.co/74nyMGg/2853458.jpg"
              alt=""
              className="w-3/4 mx-auto"
            />
          </div>
          <div className="m-12 p-12 bg-my-secondary bg-opacity-20 backdrop-blur rounded-xl">
            <h2 className="text-4xl text-center font-bold text-my-primary">
              SignUp Now
            </h2>
            <form
              onSubmit={handleSubmit(handleSignUp)}
              className="card-body w-full">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name*</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Full Name"
                  className="input input-bordered"
                  autoComplete="off"
                />
                {errors.name && <FormFieldRequiredErrorMsg />}
              </div>
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
                    Please enter a valid email
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">User Type*</span>
                </label>
                <select
                  className="input input-bordered"
                  defaultValue="default"
                  {...register("userType")}>
                  <option disabled value="default">
                    Select your role
                  </option>
                  <option value="rider">Delivery Men</option>
                  <option value="user">User</option>
                </select>
                {roleErrMsg && (
                  <span className="text-sm text-red-500 font-medium">
                    {roleErrMsg}
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password*</span>
                </label>
                <input
                  type={isVisible ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 64,
                    pattern:
                      /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+\-=[\]{};'~`:"\\|,.<>/?])/,
                  })}
                  placeholder="Password"
                  className="input input-bordered"
                />
                {errors.password?.type === "required" && (
                  <FormFieldRequiredErrorMsg />
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-sm text-red-500 font-medium">
                    Password must be at lest 6 characters long
                  </span>
                )}
                {errors.password?.type === "maxLength" && (
                  <span className="text-sm text-red-500 font-medium">
                    Password cannot be more than 64 character long
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-sm text-red-500 font-medium">
                    Password must contain a digit, an UPPERCASE, a lowercase and
                    a special character
                  </span>
                )}
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
                    "SignUp"
                  )}
                </PrimaryBtn>
              </div>
            </form>
            <p className="text-center">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-my-primary">
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>
    </Container>
  );
};

export default SignUp;
