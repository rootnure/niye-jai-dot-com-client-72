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

const MyProfile = () => {
  const { user, updateUserInfo } = useAuth();
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
          <div className="h-32 bg-my-primary rounded-t-md lg:rounded-t-lg p-2 lg:p-6">
            <div className=" text-white flex items-center justify-between">
              <h2 className="text-white text-3xl font-semibold">
                Hello, {user?.displayName}
              </h2>
            </div>
          </div>
          <div className="absolute top-16 left-0 right-0 flex justify-center">
            <figure className="rounded-full h-32 w-32">
              <img
                src={user?.photoURL}
                alt=""
                className="border-4 border-my-secondary border-opacity-70 bg-white rounded-full min-h-full min-w-full"
              />
            </figure>
          </div>
          <div className="card-body pt-20 items-center">
            <h2 className="card-title text-3xl font-bold mt-2 mb-6">
              Update Your Profile Photo
            </h2>
            <div className="card-actions">
              <form
                onSubmit={handleSubmit(handleUpdateProfileImage)}
                className="form-body">
                <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                  <div className="form-control">
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
                  <div>
                    <PrimaryBtn className="w-full">Update</PrimaryBtn>
                  </div>
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
