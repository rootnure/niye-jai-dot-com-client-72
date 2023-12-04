import SectionTitle from "../../../component/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import FormFieldRequiredErrorMsg from "../../../component/FormFieldRequiredErrorMsg";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { FaArrowsSpin } from "react-icons/fa6";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const UpdateBooking = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: bookingData = {} } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/booking/${id}`);
      return data;
    },
  });
  console.log(bookingData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUpdateBooking = async (data) => {
    const updatedData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      type: data.type,
      weight: parseFloat(data.weight),
      deliveryFee: data.weight <= 1 ? 50 : data.weight <= 2 ? 100 : 150,
      receiverName: data.receiverName,
      receiverPhone: data.receiverPhone,
      deliveryAddress: data.deliveryAddress,
      reqDeliveryDate: data.reqDeliveryDate,
      deliveryLat: parseFloat(data.deliveryLat),
      deliveryLon: parseFloat(data.deliveryLon),
    };
    const { data: updateRes } = await axiosSecure.patch(
      `/bookings/${id}`,
      updatedData
    );
    if (updateRes.modifiedCount > 0) {
      toast.success("Booking data updated successfully");
    }
    navigate("/dashboard/my-parcels");
  };

  return (
    <section className="-mt-12 mb-12">
      <Helmet>
        <title>NiyeJai | Update Booking</title>
      </Helmet>
      <SectionTitle heading="Update Booking" subHeading="Fix Incorrect Data" />
      <div className="-mt-4">
        <form onSubmit={handleSubmit(handleUpdateBooking)} className="form-bdy">
          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            {/* booked by name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Name<span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder="Your Full Name"
                defaultValue={user?.displayName}
                className="input input-my-bordered bg-gray-200"
                readOnly
              />
            </div>
            {/* booked by email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Email<span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="Email"
                defaultValue={user?.email}
                className="input input-my-bordered bg-gray-200"
                readOnly
              />
            </div>
            {/* booked by phone number */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Phone Number<span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                {...register("phone", { required: true })}
                defaultValue={bookingData.phone}
                placeholder="Your Phone Number"
                className="input input-my-bordered"
              />
              {errors.phone && <FormFieldRequiredErrorMsg />}
            </div>
            {/* parcel Type */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Parcel Type<span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                {...register("type", { required: true })}
                defaultValue={bookingData.type}
                placeholder="Fruit, Cloth, Phone etc."
                className="input input-my-bordered"
              />
              {errors.type && <FormFieldRequiredErrorMsg />}
            </div>
            {/* parcel Weight */}
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
                step={0.01}
                defaultValue={bookingData.weight}
                placeholder="i.e 2.6"
                className="input input-my-bordered"
              />
              {errors.weight && <FormFieldRequiredErrorMsg />}
            </div>
            {/* parcel cost */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price (Delivery Cost)</span>
              </label>
              <p className="input input-my-bordered bg-gray-200 flex items-center italic text-sm font-semibold overflow-hidden whitespace-nowrap">
                {bookingData.deliveryFee}tk. (Current) [Fee may change upon
                weight change after update]
              </p>
            </div>
            {/* receiver name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Receiver&apos;s Name<span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                {...register("receiverName", { required: true })}
                defaultValue={bookingData.receiverName}
                placeholder="Person To Receive The Parcel"
                className="input input-my-bordered"
              />
              {errors.receiverName && <FormFieldRequiredErrorMsg />}
            </div>
            {/* receiver phone */}
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
                defaultValue={bookingData.receiverPhone}
                placeholder="Receiver's Phone Number"
                className="input input-my-bordered"
              />
              {errors.receiverPhone && <FormFieldRequiredErrorMsg />}
            </div>
            {/* delivery address */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Parcel Delivery Address<span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                {...register("deliveryAddress", { required: true })}
                defaultValue={bookingData.deliveryAddress}
                placeholder="Delivery Address"
                className="input input-my-bordered"
              />
              {errors.address && <FormFieldRequiredErrorMsg />}
            </div>
            {/* requested delivery date */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Requested Delivery Date<span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="date"
                {...register("reqDeliveryDate", { required: true })}
                defaultValue={moment(bookingData.reqDeliveryDate).format(
                  "YYYY-MM-DD"
                )}
                className="input input-my-bordered"
              />
              {errors.reqDeliveryDate && <FormFieldRequiredErrorMsg />}
            </div>
            {/* delivery latitude */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Delivery Address Latitude
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="number"
                {...register("deliveryLat", {
                  required: true,
                  min: -90,
                  max: 90,
                })}
                step={0.000000001}
                defaultValue={bookingData.deliveryLat}
                placeholder="i.e 21.121365496"
                className="input input-my-bordered"
              />
              {errors.deliveryLat?.type === "required" && (
                <FormFieldRequiredErrorMsg />
              )}
              {errors.deliveryLat?.type === "min" && (
                <span className="text-sm text-red-500 font-medium">
                  Invalid Latitude Input
                </span>
              )}
              {errors.deliveryLat?.type === "max" && (
                <span className="text-sm text-red-500 font-medium">
                  Invalid Latitude Input
                </span>
              )}
            </div>
            {/* delivery longitude */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Delivery Address Longitude
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="number"
                {...register("deliveryLon", {
                  required: true,
                  min: -180,
                  max: 180,
                })}
                step={0.000000001}
                defaultValue={bookingData.deliveryLon}
                placeholder="i.e 21.121365496"
                className="input input-my-bordered"
              />
              {errors.deliveryLon?.type === "required" && (
                <FormFieldRequiredErrorMsg />
              )}
              {errors.deliveryLon?.type === "min" && (
                <span className="text-sm text-red-500 font-medium">
                  Invalid Latitude Input
                </span>
              )}
              {errors.deliveryLon?.type === "max" && (
                <span className="text-sm text-red-500 font-medium">
                  Invalid Latitude Input
                </span>
              )}
            </div>
          </div>
          {/* submit button */}
          <div className="form-control mt-6">
            <button className="btn text-white border bg-my-primary hover:border-my-primary hover:bg-my-primary hover:saturate-150 w-fit">
              <FaArrowsSpin className="text-xl" /> Update Booking
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateBooking;
