import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";
import { FaBook, FaTruck, FaUsers } from "react-icons/fa6";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const States = () => {
  const axiosPublic = useAxiosPublic();
  const { data: countData = {} } = useQuery({
    queryKey: ["dataCount"],
    queryFn: async () => {
      const result = await axiosPublic.get("/counter");
      return result.data;
    },
  });
  const states = [
    {
      title: "Total Bookings",
      value: countData.bookingCount || 0,
      icon: (
        <FaBook className="text-3xl md:text-4xl lg:text-5xl text-my-primary me-2" />
      ),
    },
    {
      title: "Parcel Delivered",
      value: countData.deliveryCount || 0,
      icon: (
        <FaTruck className="text-3xl md:text-4xl lg:text-5xl text-my-primary me-2" />
      ),
    },
    {
      title: "Happy Customers",
      value: countData.userCount || 0,
      icon: (
        <FaUsers className="text-3xl md:text-4xl lg:text-5xl text-my-primary me-2" />
      ),
    },
  ];
  return (
    <section className="py-12" data-aos="fade-up">
      <div className="stats w-full py-6 border-gray-200 rounded-none">
        {states.map(({ title, icon, value }) => (
          <div
            key={title}
            className="flex items-center justify-center text-center py-4">
            <div>
              <div className="text-sm md:text-base lg:text-lg text-gray-500 font-medium whitespace-nowrap">
                {title}
              </div>
              <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold flex items-center justify-center">
                <div>{icon}</div>
                <CountUp enableScrollSpy end={value} duration={2} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default States;
