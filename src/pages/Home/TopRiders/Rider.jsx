import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa6";

const Rider = ({ rider }) => {
  //   console.log(rider);
  return (
    <div className="card border">
      <div className="h-32 bg-my-primary rounded-t-lg p-6">
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
      <div className="card-body pt-20">
        <h2 className="card-title"></h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div>
      </div>
    </div>
  );
};
Rider.propTypes = {
  rider: PropTypes.object.isRequired,
};
export default Rider;
