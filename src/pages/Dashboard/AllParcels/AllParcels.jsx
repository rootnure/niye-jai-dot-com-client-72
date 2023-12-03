import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../component/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from "moment";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormFieldRequiredErrorMsg from "../../../component/FormFieldRequiredErrorMsg";
import { useNavigate } from "react-router-dom";

const AllParcels = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [manageId, setManageId] = useState("");
  const [selectRiderError, setSelectRiderError] = useState(false);
  const { data: bookings = [], refetch: refetchBookings } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/bookings");
      return data;
    },
  });
  const { data: riders = [] } = useQuery({
    queryKey: ["riders"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users?role=Rider");
      return data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleManageBooking = async (data) => {
    setSelectRiderError(false);
    if (data.deliveryMen === "default") {
      setSelectRiderError(true);
      return;
    }
    const dataToUpdate = {
      deliveryMen: data.deliveryMen,
      approxDeliveryDate: data.approxDeliveryDate,
      status: "On The Way",
    };
    try {
      const { data: manageRes } = await axiosSecure.patch(
        `/bookings/${manageId}`,
        dataToUpdate
      );
      if (manageRes.modifiedCount > 0) {
        reset();
        refetchBookings();
        navigate("/dashboard/all-parcels");
      }
    } catch (manageErr) {
      console.log(manageErr);
    }
  };

  return (
    <section className="-mt-12 mb-12">
      <SectionTitle subHeading="All Bookings" heading="Parcels" />
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead className="bg-my-primary text-white text-center">
            <tr>
              <th>#</th>
              <th>Booked By</th>
              <th>
                Booked By
                <br />
                Phone Number
              </th>
              <th>Booking Date</th>
              <th>
                Requested
                <br />
                Delivery Date
              </th>
              <th>Delivery Fee</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {/* row 1 */}
          <tbody className="text-center">
            {bookings.map(
              (
                {
                  _id,
                  name,
                  phone,
                  bookingDate,
                  reqDeliveryDate,
                  deliveryFee,
                  status,
                },
                index
              ) => (
                <tr key={_id}>
                  <th>{index + 1}</th>
                  <td>{name}</td>
                  <td>{phone}</td>
                  <td>
                    {bookingDate
                      ? moment(bookingDate).format("DD-MMM-YYYY")
                      : "-"}
                  </td>
                  <td>{reqDeliveryDate}</td>
                  <td>{deliveryFee}tk.</td>
                  <td
                    className={`font-bold ${
                      status === "Pending"
                        ? "text-blue-600 italic"
                        : status === "Delivered"
                        ? "text-my-primary"
                        : status === "Cancelled" || status === "Returned"
                        ? "text-red-500"
                        : "text-cyan-500"
                    }`}>
                    {status}
                  </td>
                  <td>
                    <a
                      onClick={() => setManageId(_id)}
                      href="#manageBooking"
                      className="btn btn-sm bg-my-primary bg-opacity-80 border-my-primary hover:bg-my-primary hover:bg-opacity-100 text-white uppercase">
                      Manage
                    </a>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <div className="modal" role="dialog" id="manageBooking">
        <div className="modal-box">
          <div className="-mt-10 -mb-6">
            <SectionTitle heading="Manage Booking" />
          </div>
          <form
            onSubmit={handleSubmit(handleManageBooking)}
            className="form-body">
            <div className="grid grid-cols-2 gap-x-3 gap-y-1">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Select Delivery Men<span className="text-red-500">*</span>
                  </span>
                </label>
                <select
                  type="text"
                  {...register("deliveryMen")}
                  placeholder="Your Full Name"
                  defaultValue="default"
                  className="input input-my-bordered">
                  <option value="default" disabled>
                    Select One
                  </option>
                  {riders.map(({ _id, name }) => (
                    <option key={_id} value={_id}>
                      {name}
                    </option>
                  ))}
                </select>
                {selectRiderError && <FormFieldRequiredErrorMsg />}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Approximate Delivery Date
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="date"
                  {...register("approxDeliveryDate", { required: true })}
                  className="input input-my-bordered"
                />
                {errors.approxDeliveryDate && <FormFieldRequiredErrorMsg />}
              </div>
            </div>
            <div className="modal-action justify-center">
              <button className="btn bg-my-primary bg-opacity-80 border-my-primary hover:bg-my-primary hover:bg-opacity-100 text-white uppercase">
                Assign
              </button>
              <a
                href="#"
                className="btn bg-red-500 bg-opacity-80 border-red-500 hover:bg-red-500 hover:bg-opacity-100 text-white uppercase">
                Close
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AllParcels;
