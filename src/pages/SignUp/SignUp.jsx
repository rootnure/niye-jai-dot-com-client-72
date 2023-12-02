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
import "./SignUp.css";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import moment from "moment";
import sideImg from "./2853458.jpg";

const SignUp = () => {
  const { createUser, updateUserInfo, logOut } = useAuth();
  const axiosPublic = useAxiosPublic();
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

  const handleSignUp = async (data) => {
    setRoleErrMsg("");
    setAuthLoading(true);
    if (data.userType === "default") {
      setRoleErrMsg("Please select your role");
      setAuthLoading(false);
      return;
    }
    const imageFile = { image: data.photo[0] };
    const img_api_url = import.meta.env.VITE_IMAGE_API_URL.replace(
      "CLIENT_API_KEY",
      import.meta.env.VITE_IMGBB_API_KEY
    );
    // image upload
    try {
      const imgRes = await axios.post(img_api_url, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      // create user
      try {
        await createUser(data.email, data.password);
        toast.success("SignUp successful");
        try {
          // update user name & image
          await updateUserInfo(data.name, imgRes?.data?.data?.display_url);
          try {
            await axiosPublic.post(`/users/${data?.email}`, {
              role: data?.userType,
              createdOn: moment.utc().format(),
              name: data?.name,
              photo: imgRes?.data?.data?.display_url,
              phone: data?.phone,
            });
            navigate("/");
          } catch (createUserError) {
            console.log(createUserError);
          }
        } catch (updateUserError) {
          console.log(updateUserError);
          logOut();
          toast.error("Something went wrong updating your info. Please login");
          navigate("/login");
        } finally {
          reset();
        }
      } catch (createUserError) {
        if (createUserError.message.includes("already")) {
          toast.error("Email Already In Use. Try login instead.");
        }
      }
    } catch (imageError) {
      console.log(imageError);
    } finally {
      setAuthLoading(false);
    }
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
        <div className="grid grid-cols-1 md:grid-cols-2 h-full my-6">
          <div className="h-auto flex items-center md:order-last">
            <img
              src={sideImg}
              alt="Side Illustrator"
              className="w-3/4 mx-auto"
            />
          </div>
          <div className="m-12 py-12 px-4 bg-my-secondary bg-opacity-20 backdrop-blur rounded-xl">
            <h2 className="text-4xl text-center font-bold text-my-primary">
              SignUp Now
            </h2>
            <form
              onSubmit={handleSubmit(handleSignUp)}
              className="card-body w-full">
              {/* user name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name*</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Mr./Mrs. X"
                  className="input input-my-bordered"
                  autoComplete="off"
                />
                {errors.name && <FormFieldRequiredErrorMsg />}
              </div>
              {/* user email */}
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
                  placeholder="user@gmail.com"
                  className="input input-my-bordered"
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
              {/* user phone */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone Number*</span>
                </label>
                <input
                  type="text"
                  {...register("phone", {
                    required: true,
                  })}
                  placeholder="+880 1234-567890"
                  className="input input-my-bordered"
                  autoComplete="off"
                />
                {errors.phone && <FormFieldRequiredErrorMsg />}
              </div>
              {/* user role selection */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">User Type*</span>
                </label>
                <select
                  className="input input-my-bordered"
                  defaultValue="default"
                  {...register("userType")}>
                  <option disabled value="default">
                    Select your role
                  </option>
                  <option value="Rider">Delivery Men</option>
                  <option value="User">User</option>
                </select>
                {roleErrMsg && (
                  <span className="text-sm text-red-500 font-medium">
                    {roleErrMsg}
                  </span>
                )}
              </div>
              {/* user profile photo upload */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Profile Photo*</span>
                </label>
                <input
                  type="file"
                  {...register("photo", {
                    required: true,
                  })}
                  className="file-input file-input-bordered file-input-my-primary w-full"
                  accept=".jpg,.jpeg,.png,.webp"
                />
                {errors.photo && <FormFieldRequiredErrorMsg />}
              </div>
              {/* password */}
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
                  placeholder="######"
                  className="input input-my-bordered"
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
                    Password must contain:
                    <br />- A Digit (0-9)
                    <br />- An Uppercase (A-Z)
                    <br />- A Lowercase (a-z)
                    <br />- A Special Character (/*-+!@`#$%^&*_)
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
            <div className="mx-6">
              <p className="text-center">
                Already have an account?{" "}
                <Link to="/login" className="font-bold text-my-primary">
                  Login
                </Link>
              </p>
              <SocialLogin setAuthLoading={setAuthLoading} />
            </div>
          </div>
        </div>
      </main>
    </Container>
  );
};

export default SignUp;
