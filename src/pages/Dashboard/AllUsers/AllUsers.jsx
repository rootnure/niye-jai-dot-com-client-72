import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaArrowsRotate, FaTrash } from "react-icons/fa6";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allUsers = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users");
      return data;
    },
  });

  const handleDeleteUser = (id, name) => {
    console.log({ id, name });
  };

  const handleRoleUpdate = (id, name) => {
    console.log({ id, name });
  };

  return (
    <div>
      <h2 className="text-5xl text-center font-semibold">All Users</h2>
      <h3 className="text-3xl my-4">Total Users: {allUsers.length}</h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-center text-base text-my-primary border-y-2">
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
                    <div className="mask w-12 h-12">
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
                    className="select w-max max-w-xs border-my-primary"
                    defaultValue={role}>
                    <option value="User">User</option>
                    <option value="Rider">Delivery Men</option>
                    <option value="Admin">Admin</option>
                  </select>
                </td>
                <th className="flex gap-2">
                  <button
                    onClick={() => handleRoleUpdate(_id, name)}
                    className="btn btn-ghost uppercase border-2 hover:border-my-primary hover:bg-my-primary hover:text-white border-my-primary">
                    <FaArrowsRotate className="text-xl" />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(_id, name)}
                    className="btn btn-ghost uppercase border-2 hover:border-red-500 hover:bg-red-500 hover:text-white border-red-500">
                    <FaTrash className="text-xl" />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
