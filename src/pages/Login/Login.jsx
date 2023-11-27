import { useForm } from "react-hook-form";
import Container from "../../component/Container";
import PrimaryBtn from "../../component/PrimaryBtn";
import { useState } from "react";
import FormFieldRequiredErrorMsg from "../../component/FormFieldRequiredErrorMsg";

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <div className="grid grid-cols-2 h-full my-12">
        <div className="h-auto flex items-center">
          <img
            src="https://i.ibb.co/cDp0FCg/2942004.jpg"
            alt=""
            className="w-1/2 mx-auto"
          />
        </div>
        <div className="m-12 p-12 bg-my-secondary bg-opacity-10 backdrop-blur rounded-xl">
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="card-body w-full">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Email"
                className="input input-bordered"
              />
              {errors.email && <FormFieldRequiredErrorMsg />}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
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
              <PrimaryBtn>Login</PrimaryBtn>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Login;
