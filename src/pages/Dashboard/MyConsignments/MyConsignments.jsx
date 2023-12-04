import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../component/SectionTitle";
import useRole from "../../../hooks/useRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SummaryHeading from "../../../component/SummaryHeading";
import moment from "moment";
import { FaCheck, FaMapLocationDot, FaX } from "react-icons/fa6";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const MyConsignments = () => {
  const { uId } = useRole();
  const axiosSecure = useAxiosSecure();
  const [mapData, setMapData] = useState({
    deliveryLat: 0,
    deliveryLon: 0,
  });
  mapData;
  const { data: myConsignments = [], refetch } = useQuery({
    queryKey: ["consignments", uId],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-consignments/${uId}`);
      return data;
    },
  });

  const handleCancelBooking = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      html: `<span class="text-red-500 font-bold leading-10 text-xl">Cancel Consignment?</span><br />You won't be able to revert this!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    });
    if (result.isConfirmed) {
      const { data: cancelRes } = await axiosSecure.patch(`/bookings/${id}`, {
        status: "Cancelled",
      });
      if (cancelRes.modifiedCount > 0) {
        toast.success("Consignment Marked as Cancelled by Delivery Men");
        refetch();
      }
    }
  };

  const handleMarkAsDeliveredBooking = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#1fc58d",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Mark As Delivered.",
    });
    if (result.isConfirmed) {
      const { data: cancelRes } = await axiosSecure.patch(`/bookings/${id}`, {
        status: "Delivered",
      });
      if (cancelRes.modifiedCount > 0) {
        toast.success("Consignment Marked as Delivered by Delivery Men");
        refetch();
      }
    }
  };

  return (
    <section className="-mt-6 mb-12">
      <Helmet>
        <title>NiyeJai | My Delivery List</title>
      </Helmet>
      <SectionTitle
        heading="My Delivery List"
        subHeading="Consignments Assigned"
      />
      {myConsignments.length ? (
        <>
          <SummaryHeading>
            Total Consignments: {myConsignments.length}
          </SummaryHeading>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead className="text-white text-center bg-my-primary">
                <tr>
                  <th>#</th>
                  <th>Booked By</th>
                  <th>Receiver</th>
                  <th>
                    Booked By
                    <br />
                    Phone
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
                  <th>Receiver Phone</th>
                  <th>Delivery Address</th>
                  <th>
                    View Location
                    <br />
                    On Map
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              {/* row 1 */}
              <tbody className="text-center">
                {myConsignments.map(
                  (
                    {
                      _id,
                      name,
                      receiverName,
                      phone,
                      reqDeliveryDate,
                      approxDeliveryDate,
                      receiverPhone,
                      deliveryAddress,
                      deliveryLat,
                      deliveryLon,
                      status,
                    },
                    index
                  ) => (
                    <tr key={_id}>
                      <th>{index + 1}</th>
                      <td>{name}</td>
                      <td>{receiverName}</td>
                      <td>
                        <a
                          className="hover:underline text-blue-600"
                          title={`Make a call to: ${phone}`}
                          href={`tel:${phone
                            .split(" ")
                            .join("")
                            .split("-")
                            .join("")}`}>
                          {phone}
                        </a>
                      </td>
                      <td>
                        {reqDeliveryDate
                          ? moment(reqDeliveryDate).format("DD-MMM-YYYY")
                          : "-"}
                      </td>
                      <td>
                        {approxDeliveryDate
                          ? moment(approxDeliveryDate).format("DD-MMM-YYYY")
                          : "-"}
                      </td>
                      <td>
                        <a
                          className="hover:underline text-blue-600"
                          title={`Make a call to: ${receiverPhone}`}
                          href={`tel:${receiverPhone
                            .split(" ")
                            .join("")
                            .split("-")
                            .join("")}`}>
                          {receiverPhone}
                        </a>
                      </td>
                      <td title={deliveryAddress}>
                        {deliveryAddress.length > 5
                          ? deliveryAddress.slice(0, 6) +
                            "..." +
                            deliveryAddress.slice(-6)
                          : deliveryAddress}
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            setMapData({ deliveryLat, deliveryLon })
                          }
                          className="btn btn-sm">
                          <FaMapLocationDot className="w-fit mx-auto text-xl text-blue-500 cursor-pointer" />
                        </button>
                      </td>
                      <td className="flex items-center justify-center">
                        <button
                          disabled={status !== "On The Way"}
                          onClick={() => handleCancelBooking(_id)}
                          className="btn btn-sm text-white border-red-500 hover:border-red-500 hover:bg-white border-2 bg-red-500 hover:text-red-500 me-2 text-xl"
                          title="Cancel Booking">
                          <FaX />
                        </button>
                        <button
                          disabled={status !== "On The Way"}
                          onClick={() => handleMarkAsDeliveredBooking(_id)}
                          className="btn btn-sm text-white border-my-primary hover:border-my-primary hover:bg-white border-2 bg-my-primary hover:text-my-primary text-xl"
                          title="Mark As Delivered">
                          <FaCheck />
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <h2 className="text-center font-bold text-4xl text-gray-300 my-12">
          No Consignments Assigned Yet
        </h2>
      )}
    </section>
  );
};

export default MyConsignments;
