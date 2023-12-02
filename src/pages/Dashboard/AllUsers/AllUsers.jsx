import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrash } from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

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
      const { data } = await axiosSecure.get("/users");
      return data;
    },
  });
  const availableRoles = [
    { role: "User", name: "User" },
    { role: "Rider", name: "Delivery Men" },
    { role: "Admin", name: "Admin" },
  ];
  // const newRole = useRef();

  const handleDeleteUser = async (id, name) => {
    const result = await Swal.fire({
      title: `Are you sure to delete "${name}"?`,
      text: "You won't be able to revert this!",
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
    <>
      <h2 className="text-5xl text-center font-semibold">All Users</h2>
      <h3 className="text-3xl my-4">Total Users: {allUsers.length}</h3>
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="text-center bg-my-primary text-white border-y-2">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Profile Photo</th>
                <th>Email</th>
                <th>Current Role</th>
                <th>Update Role</th>
                <th>Action</th>
              </tr>
            </thead>
            {/* body */}
            <tbody className="border-y-2">
              {allUsers.map(({ _id, name, photo, email, role }, index) => (
                <tr key={_id} className="text-center">
                  <th>{index + 1}</th>
                  <td className="font-bold">{name || email}</td>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={photo || "https://i.ibb.co/yp2YxZf/Profile.png"}
                          alt={`Profile Image of ${name}`}
                        />
                      </div>
                    </div>
                  </td>
                  <td>{email}</td>
                  <td className="font-bold text-center">
                    {role === "Admin"
                      ? role
                      : role === "Rider"
                      ? "Delivery Men"
                      : role}
                  </td>
                  <td>
                    <select
                      onChange={(e) =>
                        handleRoleUpdate(e.target.value, email, name)
                      }
                      disabled={email === user.email}
                      className="select w-max max-w-xs border-my-primary">
                      <option value="default">Select New Role</option>
                      {availableRoles
                        .filter(({ role: filterRole }) => filterRole !== role)
                        .map(({ role: mapRole, name }, idx) => (
                          <option key={idx} value={mapRole}>
                            {name}
                          </option>
                        ))}
                    </select>
                  </td>
                  <th className="flex gap-2">
                    <button
                      disabled={email === user.email}
                      onClick={() => handleDeleteUser(_id, name)}
                      title={`Delete ${role}`}
                      className="btn btn-ghost uppercase border-2 hover:border-red-500 hover:bg-red-500 hover:text-white border-red-500">
                      <FaTrash className="text-xl" />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default AllUsers;
