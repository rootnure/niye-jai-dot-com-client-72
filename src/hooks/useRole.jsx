import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: userDataInDB,
    isLoading: isRoleLoading,
    refetch,
  } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user-role/${user?.email}`);
      return { role: data?.role || "", uId: data?._id };
    },
  });
  return {
    role: userDataInDB?.role,
    isRoleLoading,
    refetch,
    uId: userDataInDB?.uId,
  };
};

export default useRole;
