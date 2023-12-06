import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../component/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from "moment";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormFieldRequiredErrorMsg from "../../../component/FormFieldRequiredErrorMsg";
import SummaryHeading from "../../../component/SummaryHeading";
import { Helmet } from "react-helmet-async";
import Loading from "../../../component/Loading";
import NoDataMsg from "../../../component/NoDataMsg";

const AllParcels = () => {
  const axiosSecure = useAxiosSecure();
  const [dateRange, setDateRange] = useState({
    dateFrom: "",
    dateTo: "",
  });
  const [manageItemId, setManageItemId] = useState("");
  const [selectRiderError, setSelectRiderError] = useState(false);
  const {
    data: bookings = [],
    isLoading,
    refetch: refetchBookings,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/bookings?dateFrom=${dateRange.dateFrom}&dateTo=${dateRange.dateTo}`
      );
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

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
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
        `/bookings/${manageItemId}`,
        dataToUpdate
      );
      if (manageRes.modifiedCount > 0) {
        reset();
        refetchBookings();
      }
    } catch (manageErr) {
      console.log(manageErr);
    }
  };

  const handleBookingsFilter = async (data) => {
    setDateRange({
      dateFrom: moment(data.dateFrom).format("YYYY-MM-DD"),
      dateTo: moment(data.dateTo).format("YYYY-MM-DD"),
    });
  };

  return (
    <section className="-mt-6 mb-12">
      <Helmet>
        <title>NiyeJai | All Parcels</title>
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : !bookings.length > 0 ? (
        <NoDataMsg>No Bookings Yet</NoDataMsg>
      ) : (
        <>
          <SectionTitle subHeading="All Bookings" heading="Parcels" />
          <div className="my-6 flex justify-between items-center">
            <SummaryHeading>Total Bookings: {bookings.length}</SummaryHeading>
            <div>
              <form
                onSubmit={handleSubmit2(handleBookingsFilter)}
                className="form-body">
                <div className="flex items-end gap-x-3 gap-y-1">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Date From
                        <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="date"
                      {...register2("dateFrom", { required: true })}
                      className="input input-my-bordered"
                    />
                    {errors2.dateFrom && <FormFieldRequiredErrorMsg />}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Date To
                        <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="date"
                      {...register2("dateTo", { required: true })}
                      className="input input-my-bordered"
                    />
                    {errors2.dateTo && <FormFieldRequiredErrorMsg />}
                  </div>
                  <button
                    type="submit"
                    className="btn bg-my-primary bg-opacity-80 border-my-primary hover:bg-my-primary hover:bg-opacity-100 text-white uppercase w-28">
                    Filter
                  </button>
                </div>
              </form>
            </div>
          </div>
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
                      <td>
                        {reqDeliveryDate
                          ? moment(reqDeliveryDate).format("DD-MMM-YYYY")
                          : "-"}
                      </td>
                      <td>{deliveryFee}tk.</td>
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
                        {status}
                      </td>
                      <td>
                        <a
                          disabled={status !== "Pending"}
                          onClick={() => setManageItemId(_id)}
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
        </>
      )}
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
