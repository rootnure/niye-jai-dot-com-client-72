import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaArrowsRotate, FaTrash } from "react-icons/fa6";
import { useRef } from "react";
import useAuth from "../../../hooks/useAuth";

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
    // { role: "User", name: "User" },
    { role: "Rider", name: "Delivery Men" },
    { role: "Admin", name: "Admin" },
  ];
  const newRole = useRef();

  const handleDeleteUser = (id, name) => {
    console.log({ id, name });
    refetch();
  };

  const handleRoleUpdate = (id, name) => {
    console.log({ id, name });
    refetch();
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
                <th>Select New Role</th>
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
                      disabled={email === user.email || role === "Admin"}
                      ref={newRole}
                      defaultValue="default"
                      className="select w-max max-w-xs border-my-primary">
                      <option value="default" disabled>
                        Select New Role
                      </option>
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
                      disabled={email === user.email || role === "Admin"}
                      onClick={() => handleRoleUpdate(_id, name)}
                      title={`Update role of ${name}`}
                      className="btn btn-ghost uppercase border-2 hover:border-my-primary hover:bg-my-primary hover:text-white border-my-primary">
                      <FaArrowsRotate className="text-xl" />
                    </button>
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
