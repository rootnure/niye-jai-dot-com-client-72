import PropTypes from "prop-types";
import CountUp from "react-countup";
import { FaStar } from "react-icons/fa6";

const Rider = ({ rider }) => {
  //   console.log(rider);
  return (
    <div className="card border rounded-md lg:rounded-lg">
      <div className="h-32 bg-my-primary rounded-t-md lg:rounded-t-lg p-2 lg:p-6">
        <div className=" text-white flex items-center justify-between">
          <h2 className="text-white text-3xl font-semibold">{rider.name}</h2>
          <p className="text-sm flex items-center gap-1 border px-1 rounded-full">
            <FaStar />
            {rider.ratingAvg || 0}
          </p>
        </div>
      </div>
      <div className="absolute top-16 left-0 right-0 flex justify-center">
        <figure className="rounded-full h-32 w-32">
          <img
            src={rider.photo}
            alt={`Photo of ${rider.name}`}
            className="border-4 border-my-secondary border-opacity-70 bg-white rounded-full min-h-full min-w-full"
          />
        </figure>
      </div>
      <div className="card-body pt-20 items-center">
        <h2 className="card-title text-2xl font-bold">
          Total{" "}
          <CountUp
            enableScrollSpy
            end={rider.deliveryCount || 0}
            duration={2}
          />{" "}
          parcel delivered
        </h2>
        <div className="card-actions">
          <div className="badge bg-my-primary bg-opacity-30">
            <span className="font-bold me-1">
              {Math.ceil(Math.random() * 10) + 2}
            </span>{" "}
            time(s) best delivery men of the month
          </div>
          <div className="badge bg-my-primary bg-opacity-30">
            <span className="font-bold me-1">
              {Math.floor(Math.random() * 3)}
            </span>{" "}
            time(s) best delivery men of the year
          </div>
        </div>
      </div>
    </div>
  );
};
Rider.propTypes = {
  rider: PropTypes.object.isRequired,
};
export default Rider;
