import { useForm } from "react-hook-form";
import Container from "../../component/Container";
import PrimaryBtn from "../../component/PrimaryBtn";
import { useState } from "react";
import FormFieldRequiredErrorMsg from "../../component/FormFieldRequiredErrorMsg";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignUp = (data) => {
    console.log(data);
  };
  return (
    <Container>
      <div className="grid grid-cols-2 h-full my-12">
        <div className="h-auto flex items-center order-last">
          <img
            src="https://i.ibb.co/74nyMGg/2853458.jpg"
            alt=""
            className="w-3/4 mx-auto"
          />
        </div>
        <div className="m-12 p-12 bg-my-secondary bg-opacity-20 backdrop-blur rounded-xl">
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
              {errors.email && <FormFieldRequiredErrorMsg />}
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
                  Password must contain a digit, an UPPERCASE, a lowercase and a
                  special character
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
              <PrimaryBtn>Login</PrimaryBtn>
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
    </Container>
  );
};

export default SignUp;
