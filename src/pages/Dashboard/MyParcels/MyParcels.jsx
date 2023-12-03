import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../component/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaPen, FaRegCommentDots, FaX } from "react-icons/fa6";
import Swal from "sweetalert2";
import moment from "moment";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: userBookings = [], refetch } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/bookings/${user?.email}`);
      return data;
    },
  });

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
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="text-center bg-my-primary text-white">
              <th>#</th>
              <th>Parcel Type</th>
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
              <th>
                Booking
                <br />
                Date
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
                },
                index
              ) => (
                <tr key={_id}>
                  <th>{index + 1}</th>
                  <td>{type || "-"}</td>
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
                    {bookingDate
                      ? moment(bookingDate).format("DD-MMM-YYYY")
                      : "-"}
                  </td>
                  <td>{deliveryMen || status}</td>
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
                    {status || "-"}
                  </td>
                  <td>
                    <Link
                      to={
                        status === "Pending"
                          ? `/dashboard/update-booking/${_id}`
                          : ""
                      }>
                      <button
                        disabled={status !== "Pending"}
                        className="btn btn-sm text-white border-my-primary hover:border-my-primary hover:bg-white border-2 bg-my-primary hover:text-my-primary me-1"
                        title="Update Booking">
                        <FaPen />
                      </button>
                    </Link>
                    <button
                      disabled={status !== "Pending"}
                      onClick={() => handleCancelBooking(_id)}
                      className="btn btn-sm text-white border-red-500 hover:border-red-500 hover:bg-white border-2 bg-red-500 hover:text-red-500 me-1"
                      title="Cancel Booking">
                      <FaX />
                    </button>
                    <button
                      disabled={status !== "Delivered"}
                      className="btn btn-sm text-white border-blue-600 hover:border-blue-600 hover:bg-white border-2 bg-blue-600 hover:text-blue-600"
                      title="Write a review">
                      <FaRegCommentDots />
                    </button>
                  </td>
                  <td>
                    <button
                      disabled={status !== "Pending"}
                      className="btn border-2 border-my-secondary hover:bg-my-secondary hover:bg-opacity-50 hover:border-my-primary">
                      Pay
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyParcels;
