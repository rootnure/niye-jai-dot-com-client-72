import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../component/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SummaryHeading from "../../../component/SummaryHeading";

const AllRiders = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allRiders = [], isLoading } = useQuery({
    queryKey: ["allRiders"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users?role=Rider");
      return data;
    },
  });

  return (
    <section className="-mt-6 mb-12">
      <SectionTitle heading="All Delivery Men" subHeading="Riders" />
      <SummaryHeading>Total Delivery Men: {allRiders.length}</SummaryHeading>
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-my-primary text-white border-y-2">
              <tr>
                <th>#</th>
                <th>Info</th>
                <th>Phone Number</th>
                <th>Parcel Delivered</th>
                <th>Average Rating</th>
              </tr>
            </thead>
            {/* body */}
            <tbody className="border-y-2">
              {allRiders.map(
                (
                  { _id, name, photo, email, phone, deliveryCount, ratingAvg },
                  index
                ) => (
                  <tr key={_id} className="">
                    <th>{index + 1}</th>
                    <td className="font-bold">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={photo}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div className="text-left">
                          <div className="font-bold">{name}</div>
                          <div className="text-sm opacity-50" title={email}>
                            {email.split("@")[0].slice(0, 3) +
                              "..." +
                              email.split("@")[0].slice(-2) +
                              "@" +
                              email.split("@")[1]}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{phone || "-"}</td>
                    <td>{deliveryCount || "-"}</td>
                    <td>{ratingAvg || "-"}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default AllRiders;
