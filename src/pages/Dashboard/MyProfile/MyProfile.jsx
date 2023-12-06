import { useForm } from "react-hook-form";
import SectionTitle from "../../../component/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import FormFieldRequiredErrorMsg from "../../../component/FormFieldRequiredErrorMsg";
import PrimaryBtn from "../../../component/PrimaryBtn";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useRole from "../../../hooks/useRole";

const MyProfile = () => {
  const { user, updateUserInfo } = useAuth();
  const { role, uId } = useRole();
  const [loadingMsg, setLoadingMsg] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUpdateProfileImage = async (data) => {
    setLoadingMsg("Image Uploading");
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
      setLoadingMsg("Please Wait...");
      try {
        await updateUserInfo(data?.name, imgRes?.data?.data?.display_url);
        toast.success("Profile Picture Updated");
        navigate("/", { replace: true });
      } catch (updateInfoErr) {
        console.log(updateInfoErr);
      }
    } catch (photoULErr) {
      console.log(photoULErr);
    } finally {
      setLoadingMsg("");
    }
  };

  return (
    <section className="-mt-12 mb-12 relative">
      <Helmet>
        <title>NiyeJai | My Profile</title>
      </Helmet>
      {loadingMsg && (
        <div className="absolute z-50 -top-12 left-0 right-0 flex items-center justify-center">
          <p className="px-4 py-0.5 bg-amber-300 rounded-b-lg font-medium min-h-6">
            {loadingMsg}
          </p>
        </div>
      )}
      <SectionTitle heading="My Profile" subHeading="User Data" />
      <div className="min-h-[calc(100vh-280px)] flex items-center justify-center">
        <div className="card border rounded-md lg:rounded-lg min-w-[500px]">
          <div className="h-40 bg-my-primary rounded-t-md lg:rounded-t-lg p-2 lg:p-6">
            <div className=" text-white flex items-center justify-between">
              <div>
                <h2 className="text-3xl" title={user?.displayName}>
                  Hello,{" "}
                  <span className="font-bold">
                    {user?.displayName.length > 40
                      ? user?.displayName.slice(0, 35) + "..."
                      : user?.displayName}
                  </span>
                </h2>
                <p className="text-sm mt-1">
                  E-mail: <span className="font-semibold">{user?.email}</span>
                </p>
              </div>
              <p className="border px-2 py-0.5 rounded-badge bg-white text-slate-500 prevent-text-select">
                Role:{" "}
                <span className="font-bold text-lg bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-transparent bg-clip-text">
                  {role}
                </span>
              </p>
            </div>
          </div>
          <div className="absolute top-[88px] left-0 right-0 flex justify-center">
            <figure className="rounded-full h-36 w-36">
              <img
                src={user?.photoURL}
                alt=""
                className="border-4 border-my-secondary border-opacity-70 bg-white rounded-full min-h-full min-w-full"
                draggable={false}
              />
            </figure>
          </div>
          <div className="card-body pt-20 items-center">
            <p className="italic text-sm">
              ID:{" "}
              <span className="font-semibold text-base not-italic">{uId}</span>
            </p>
            <h2 className="card-title text-3xl font-bold mt-2 mb-6">
              Update Your Profile
            </h2>
            <div className="card-actions">
              <form
                onSubmit={handleSubmit(handleUpdateProfileImage)}
                className="form-body">
                <div className="grid grid-cols-2 gap-2">
                  <div className="form-control">
                    <label className="label py-0.5">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      type="text"
                      {...register("name", {
                        required: true,
                      })}
                      placeholder={user?.displayName}
                      className="input input-my-bordered w-full"
                    />
                    {errors.photo && <FormFieldRequiredErrorMsg />}
                  </div>
                  <div className="form-control">
                    <label className="label py-0.5">
                      <span className="label-text">Profile Photo</span>
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
                  <PrimaryBtn className="w-full col-span-2">Update</PrimaryBtn>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProfile;
