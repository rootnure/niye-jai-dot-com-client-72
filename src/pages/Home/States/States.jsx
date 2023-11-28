import CountUp from "react-countup";
import { FaBook, FaTruck, FaUsers } from "react-icons/fa6";

const States = () => {
  const states = [
    {
      title: "Total Bookings",
      value: 1000,
      icon: <FaBook className="text-5xl text-my-primary me-2" />,
    },
    {
      title: "Parcel Delivered",
      value: 1000,
      icon: <FaTruck className="text-5xl text-my-primary me-2" />,
    },
    {
      title: "Happy Customers",
      value: 1000,
      icon: <FaUsers className="text-5xl text-my-primary me-2" />,
    },
  ];
  return (
    <section className="py-12">
      <div className="stats w-full py-6 border-y border-gray-200 rounded-none">
        {states.map(({ title, icon, value }) => (
          <div
            key={title}
            className="flex items-center justify-center text-center py-4">
            <div>{icon}</div>
            <div>
              <div className="mb-2 text-xl text-gray-700 font-medium">
                {title}
              </div>
              <div className="text-5xl font-extrabold">
                <CountUp end={value} duration={2} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default States;
