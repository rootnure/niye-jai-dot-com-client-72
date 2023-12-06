import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import SectionTitle from "../../../component/SectionTitle";
import SummaryHeading from "../../../component/SummaryHeading";
import { Helmet } from "react-helmet-async";
import Loading from "../../../component/Loading";
import NoDataMsg from "../../../component/NoDataMsg";

const AllUsers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: allUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users?role=User");
      return data;
    },
  });

  const handleDeleteUser = async (id, name) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      html: `<span class="font-bold text-my-primary italic">${name}</span> will be deleted from database`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1FC58D",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, Delete!`,
    });
    if (result.isConfirmed) {
      try {
        const { data: deleteRes } = await axiosSecure.delete(
          `/user-delete/${id}`
        );
        console.log(deleteRes);
        if (deleteRes.deletedCount > 0) {
          refetch();
          toast.success("Updated Successfully");
        }
      } catch (roleUpdateErr) {
        console.log(roleUpdateErr);
      }
    }
  };

  const handleRoleUpdate = async (newRole, email, name) => {
    if (newRole === "default") {
      return;
    }
    const result = await Swal.fire({
      title: "Are you sure?",
      html: `<span class="font-bold text-my-primary italic">${name}</span> will be <span class="font-bold text-my-primary">${
        newRole === "Rider" ? "Delivery Men" : newRole
      }</span> after this.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1FC58D",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, Make ${
        newRole === "Rider" ? "Delivery Men" : newRole
      }!`,
    });
    if (result.isConfirmed) {
      try {
        const { data: updateRes } = await axiosSecure.patch(
          `/update-role/${email}?newRole=${newRole}`
        );
        if (updateRes.modifiedCount > 0) {
          refetch();
          toast.success("Updated Successfully");
        }
      } catch (roleUpdateErr) {
        console.log(roleUpdateErr);
      }
    }
  };

  return (
    <section className="-mt-6 mb-12">
      <Helmet>
        <title>NiyeJai | All Users</title>
      </Helmet>
      <SectionTitle heading="All Users" subHeading="All Registered" />
      {isLoading ? (
        <Loading />
      ) : !allUsers.length > 0 ? (
        <NoDataMsg>No Users Found</NoDataMsg>
      ) : (
        <>
          <SummaryHeading>Total Users: {allUsers.length}</SummaryHeading>

          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-my-primary text-white border-y-2">
                <tr>
                  <th>#</th>
                  <th>User Info</th>
                  <th>Phone Number</th>
                  <th className="text-center">Total Bookings</th>
                  <th className="text-center">Total Spend</th>
                  <th className="w-52 text-center">Action</th>
                </tr>
              </thead>
              {/* body */}
              <tbody className="border-y-2">
                {allUsers.map(
                  (
                    {
                      _id,
                      name = "",
                      photo = "",
                      email = "",
                      phone = "",
                      bookingCount = 0,
                      totalSpend = 0,
                    },
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
                              <a href={`mailto:${email}`}>
                                {email &&
                                  email.split("@")[0].slice(0, 2) +
                                    "..." +
                                    email.split("@")[0].slice(-2) +
                                    "@" +
                                    email.split("@")[1]}
                              </a>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {phone ? (
                          <a
                            href={`tel:${phone
                              .split(" ")
                              .join("")
                              .split("-")
                              .join("")}`}>
                            {phone}
                          </a>
                        ) : (
                          "+880 1***-******"
                        )}
                      </td>
                      <td className="text-center">{bookingCount}</td>
                      <td className="text-center">${totalSpend.toFixed(2)}</td>
                      <td className="flex flex-col gap-2 w-52">
                        <button
                          onClick={() => handleRoleUpdate("Rider", email, name)}
                          title={`Delete`}
                          className="btn btn-sm btn-ghost uppercase border-2 hover:border-my-secondary hover:bg-my-secondary hover:text-white border-my-secondary">
                          Make Delivery Men
                        </button>
                        <button
                          onClick={() => handleRoleUpdate("Admin", email, name)}
                          title={`Delete`}
                          className="btn btn-sm btn-ghost uppercase border-2 hover:border-my-primary hover:bg-my-primary hover:text-white border-my-primary">
                          Make Admin
                        </button>
                        <button
                          disabled={email === user.email}
                          onClick={() => handleDeleteUser(_id, name)}
                          title={`Delete`}
                          className="btn btn-sm btn-ghost uppercase border-2 hover:border-red-500 hover:bg-red-500 hover:text-white border-red-500">
                          Delete User
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
};

export default AllUsers;
