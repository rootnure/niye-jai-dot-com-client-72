import SectionTitle from "../../../component/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import { FaTelegramPlane } from "react-icons/fa";
import { useForm } from "react-hook-form";
import FormFieldRequiredErrorMsg from "../../../component/FormFieldRequiredErrorMsg";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BookAParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleBookParcel = async (data) => {
    const { data: bookingRes } = await axiosSecure.post("/bookings", data);
    if (bookingRes.insertedId) {
      toast.success("Booking Successful");
      reset();
      navigate("/dashboard/my-parcels");
    }
  };

  return (
    <section className="-mt-12 mb-12">
      <SectionTitle heading="Book A Parcel" subHeading="Ship Your Happiness" />
      <div className="-mt-4">
        <form onSubmit={handleSubmit(handleBookParcel)} className="form-bdy">
          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Name<span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Your Full Name"
                defaultValue={user?.displayName}
                className="input input-my-bordered bg-gray-200"
                readOnly
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Email<span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Email"
                defaultValue={user?.email}
                className="input input-my-bordered bg-gray-200"
                readOnly
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Phone Number<span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                {...register("phone", { required: true })}
                placeholder="Your Phone Number"
                className="input input-my-bordered"
              />
              {errors.phone && <FormFieldRequiredErrorMsg />}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Parcel Type<span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                {...register("type", { required: true })}
                placeholder="Fruit, Cloth, Phone etc."
                className="input input-my-bordered"
              />
              {errors.type && <FormFieldRequiredErrorMsg />}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Parcel Weight (kg)<span className="text-red-500">*</span>
                </span>
              </label>
              <input
                onChange={() => console.log("changed")}
                type="number"
                {...register("weight", { required: true })}
                step={0.1}
                placeholder="i.e 2.6"
                className="input input-my-bordered"
              />
              {errors.weight && <FormFieldRequiredErrorMsg />}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price (Delivery Cost)</span>
              </label>
              <p className="input input-my-bordered bg-gray-200 flex items-center italic text-sm overflow-hidden whitespace-nowrap">
                Auto Calculate After Booking (1KG - 50tk., 2KG - 100tk., 2KG+ -
                150tk.)
              </p>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Receiver&apos;s Name<span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                {...register("receiverName", { required: true })}
                placeholder="Person To Receive The Parcel"
                className="input input-my-bordered"
              />
              {errors.receiverName && <FormFieldRequiredErrorMsg />}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Receiver&apos;s Phone No.
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                {...register("receiverPhone", { required: true })}
                placeholder="Receiver's Phone Number"
                className="input input-my-bordered"
              />
              {errors.receiverPhone && <FormFieldRequiredErrorMsg />}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Parcel Delivery Address<span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                {...register("address", { required: true })}
                placeholder="Delivery Address"
                className="input input-my-bordered"
              />

              {errors.address && <FormFieldRequiredErrorMsg />}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Requested Delivery Date<span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="date"
                {...register("date", { required: true })}
                className="input input-my-bordered"
              />
              {errors.date && <FormFieldRequiredErrorMsg />}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Delivery Address Latitude
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="number"
                {...register("addressLat", {
                  required: true,
                  min: -90,
                  max: 90,
                })}
                step={0.000000001}
                placeholder="i.e 21.121365496"
                className="input input-my-bordered"
              />
              {errors.addressLat?.type === "required" && (
                <FormFieldRequiredErrorMsg />
              )}
              {errors.addressLat?.type === "min" && (
                <span className="text-sm text-red-500 font-medium">
                  Invalid Latitude Input
                </span>
              )}
              {errors.addressLat?.type === "max" && (
                <span className="text-sm text-red-500 font-medium">
                  Invalid Latitude Input
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Delivery Address Longitude
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="number"
                {...register("addressLon", { required: true })}
                step={0.000000001}
                placeholder="i.e 21.121365496"
                className="input input-my-bordered"
              />
              {errors.addressLon?.type === "required" && (
                <FormFieldRequiredErrorMsg />
              )}
              {errors.addressLon?.type === "min" && (
                <span className="text-sm text-red-500 font-medium">
                  Invalid Latitude Input
                </span>
              )}
              {errors.addressLon?.type === "max" && (
                <span className="text-sm text-red-500 font-medium">
                  Invalid Latitude Input
                </span>
              )}
            </div>
          </div>
          <div className="form-control mt-6">
            <button className="btn text-white border bg-my-primary hover:border-my-primary hover:bg-my-primary hover:saturate-150 w-fit">
              <FaTelegramPlane className="text-2xl" /> Book A Parcel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BookAParcel;
