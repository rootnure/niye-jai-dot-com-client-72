import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../component/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaCircleRight, FaPen, FaRegCommentDots, FaX } from "react-icons/fa6";
import Swal from "sweetalert2";
import moment from "moment";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import SummaryHeading from "../../../component/SummaryHeading";
import { Controller, useForm } from "react-hook-form";
import FormFieldRequiredErrorMsg from "../../../component/FormFieldRequiredErrorMsg";
import { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [reviewIds, setReviewIds] = useState({
    deliveryMenId: null,
    bookingId: null,
  });
  const { data: userBookings = [], refetch } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/bookings/${user?.email}`);
      return data;
    },
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const handleRiderReviewSubmit = async (data) => {
    const reviewData = {
      reviewBy: {
        name: user?.displayName,
        photo: user?.photoURL,
      },
      rating: data?.rating,
      feedback: data?.feedback,
      deliveryMenId: reviewIds?.deliveryMenId,
      bookingId: reviewIds?.bookingId,
    };
    reset();
    const { data: reviewRes } = await axiosSecure.patch("/reviews", reviewData);
    if (reviewRes.upsertedId) {
      toast.success("Review Submitted Successfully.");
    } else if (reviewRes.modifiedCount > 0) {
      toast.info("Review Updated");
    } else if (!reviewRes.upsertedId && reviewRes.matchedCount > 0) {
      toast.info("Already Submitted");
    }
  };

  const handleCancelBooking = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    });
    if (result.isConfirmed) {
      const { data: updateRes } = await axiosSecure.patch(`/bookings/${id}`, {
        status: "Cancelled",
      });
      if (updateRes.modifiedCount > 0) {
        toast.success("Booking cancelled successfully");
        refetch();
      }
    }
  };

  return (
    <section className="-mt-12 mb-12">
      <SectionTitle heading="My Parcels" subHeading="Bookings" />
      <SummaryHeading>Total Bookings: {userBookings.length}</SummaryHeading>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="text-center bg-my-primary text-white">
              <th>#</th>
              <th>Parcel Type</th>
              <th>
                Booking
                <br />
                Date
              </th>
              <th>
                Requested
                <br />
                Delivery Date
              </th>
              <th>
                Approximate
                <br />
                Delivery Date
              </th>
              <th>Delivery Men ID</th>
              <th>Booking Status</th>
              <th>Action</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {/* row */}
            {userBookings.map(
              (
                {
                  _id,
                  type,
                  reqDeliveryDate,
                  approxDeliveryDate,
                  bookingDate,
                  deliveryMen,
                  status,
                  deliveryFee,
                },
                index
              ) => (
                <tr key={_id}>
                  <th>{index + 1}</th>
                  <td>{type || "-"}</td>
                  <td>
                    {bookingDate
                      ? moment(bookingDate).format("DD-MMM-YYYY")
                      : "-"}
                  </td>
                  <td>
                    {reqDeliveryDate
                      ? moment(reqDeliveryDate).format("DD-MMM-YYYY")
                      : "-"}
                  </td>
                  <td>
                    {approxDeliveryDate
                      ? moment(approxDeliveryDate).format("DD-MMM-YYYY")
                      : status}
                  </td>
                  <td>
                    {deliveryMen
                      ? deliveryMen.slice(0, 7) + "..." + deliveryMen.slice(-7)
                      : status}
                  </td>
                  <td
                    className={`font-bold ${
                      status === "Pending"
                        ? "text-cyan-500 italic"
                        : status === "Delivered"
                        ? "text-my-primary"
                        : status === "Cancelled" || status === "Returned"
                        ? "text-red-500"
                        : "text-blue-600"
                    }`}>
                    {status || "-"}
                  </td>
                  <td>
                    {status === "Pending" ? (
                      <Link to={`/dashboard/update-booking/${_id}`}>
                        <button
                          className="btn btn-sm text-white border-my-primary hover:border-my-primary hover:bg-white border-2 bg-my-primary hover:text-my-primary me-1"
                          title="Update Booking">
                          <FaPen />
                        </button>
                      </Link>
                    ) : (
                      <button
                        disabled={status !== "Pending"}
                        className="btn btn-sm border-2 me-1">
                        <FaPen />
                      </button>
                    )}
                    <button
                      disabled={status !== "Pending"}
                      onClick={() => handleCancelBooking(_id)}
                      className="btn btn-sm text-white border-red-500 hover:border-red-500 hover:bg-white border-2 bg-red-500 hover:text-red-500 me-1"
                      title="Cancel Booking">
                      <FaX />
                    </button>
                    <a
                      disabled={status !== "Delivered"}
                      onClick={() =>
                        setReviewIds({
                          deliveryMenId: deliveryMen,
                          bookingId: _id,
                        })
                      }
                      href="#reviewRiderModal"
                      className="btn btn-sm text-white border-blue-600 hover:border-blue-600 hover:bg-white border-2 bg-blue-600 hover:text-blue-600"
                      title="Write a review">
                      <FaRegCommentDots />
                    </a>
                  </td>
                  <td>
                    <button
                      disabled={status !== "Pending"}
                      className="btn border-2 border-my-secondary hover:bg-my-secondary hover:bg-opacity-50 hover:border-my-primary">
                      Pay {deliveryFee}tk.
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      {/* User Review Modal */}
      <div className="modal" role="dialog" id="reviewRiderModal">
        <div className="modal-box">
          <div className="-mt-10 -mb-6">
            <SectionTitle heading="Write A Review" />
          </div>
          <div className="flex items-center justify-center gap-x-6 mb-6">
            <div title={user?.displayName}>
              <figure className="h-20 w-20 mx-6">
                <img
                  src={user?.photoURL}
                  alt="User Profile Image"
                  className="max-w-full max-h-full rounded-full"
                />
              </figure>
              <p className="text-center">You</p>
            </div>
            <h1>
              <FaCircleRight className="text-6xl text-my-primary" />
            </h1>
            <div title={reviewIds?.deliveryMenId}>
              <figure className="h-20 w-20 mx-6">
                <img
                  src="https://i.ibb.co/p0NkrY6/image.png"
                  alt="Rider Illustration"
                  className="max-w-full max-h-full"
                />
              </figure>
              <p className="text-center -mx-4">Delivery Men</p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(handleRiderReviewSubmit)}
            className="form-body">
            <div className="grid grid-cols-2 gap-x-3 gap-y-1">
              {/* user name (auto filled) */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Review By
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  {...register("userName", { required: true })}
                  defaultValue={user?.displayName}
                  className="input input-my-bordered bg-gray-200"
                  readOnly
                />
                {errors.userName && <FormFieldRequiredErrorMsg />}
              </div>
              {/* user image auto filled */}
              {/* rating out of 5 */}
              <div className="form-control justify-center">
                <div id="rating_label">
                  <span className="label-text">
                    Rating
                    <span className="text-red-500">*</span>
                  </span>
                </div>
                <Controller
                  control={control}
                  name="rating"
                  rules={{
                    validate: (rating) => rating > 0,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Rating
                      value={value}
                      isRequired
                      onChange={onChange}
                      visibleLabelId="rating_label"
                      onBlur={onBlur}
                    />
                  )}
                />
                {errors.rating && <FormFieldRequiredErrorMsg />}
              </div>
              {/* rider id (auto filled) */}
              {/* feedback */}
              <div className="form-control col-span-2">
                <label className="label">
                  <span className="label-text">
                    Your Feedback
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                <textarea
                  {...register("feedback", { required: true })}
                  className="input input-my-bordered h-32 py-2"></textarea>
                {errors.feedback && <FormFieldRequiredErrorMsg />}
              </div>
            </div>
            <div className="modal-action justify-center">
              <button className="btn bg-my-primary bg-opacity-90 border-my-primary hover:bg-my-primary hover:bg-opacity-100 text-white uppercase">
                Submit
              </button>
              <a
                href="#"
                className="btn bg-red-600 bg-opacity-80 border-red-600 hover:bg-red-600 hover:bg-opacity-100 text-white uppercase">
                Close
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default MyParcels;
