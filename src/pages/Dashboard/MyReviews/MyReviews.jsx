import { useEffect, useState } from "react";
import SectionTitle from "../../../component/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useRole from "../../../hooks/useRole";
import SummaryHeading from "../../../component/SummaryHeading";
import { FaStar } from "react-icons/fa6";
import moment from "moment";

const MyReviews = () => {
  const { uId } = useRole();
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    axiosSecure.get(`/my-review/${uId}`).then(({ data }) => {
      setReviews(data);
    });
  }, [axiosSecure, uId]);
  console.log(reviews);
  return (
    <section className="-mt-6 mb-12">
      <SectionTitle heading="My Reviews" subHeading="My Pride" />
      {reviews.length ? (
        <>
          <SummaryHeading>Total Reviews: {reviews.length}</SummaryHeading>
          <div className="grid grid-cols-2 gap-4">
            {reviews.map(({ _id, reviewBy, rating, reviewDate, feedback }) => (
              <div key={_id} className="card border rounded-md lg:rounded-lg">
                <div className="h-32 bg-my-primary rounded-t-md lg:rounded-t-lg p-2 lg:p-6">
                  <div className=" text-white flex items-center justify-between">
                    <h2
                      className="text-white text-3xl font-semibold flex items-center gap-1"
                      title={reviewBy?.name}>
                      <span className="text-base font-normal">
                        Reviewed By:
                      </span>
                      {reviewBy?.name.length > 18
                        ? reviewBy?.name.slice(0, 15) + "..."
                        : reviewBy?.name}
                    </h2>
                    <p className="text-lg flex items-center gap-1 border px-3 rounded-full">
                      <FaStar />
                      {rating || 0}
                    </p>
                  </div>
                </div>
                <div className="absolute top-16 left-0 right-0 flex justify-center">
                  <figure className="rounded-full h-32 w-32">
                    <img
                      src={reviewBy?.photo}
                      alt={`Photo of ${reviewBy?.name}`}
                      className="border-4 border-my-secondary border-opacity-70 bg-white rounded-full min-h-full min-w-full"
                    />
                  </figure>
                </div>
                <div className="card-body pt-20 items-center">
                  <h2 className="card-title text-2xl font-bold">
                    Reviewed On {moment(reviewDate).format("DD-MMM-YYYY")}
                  </h2>
                  <p>{feedback}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h2 className="text-center my-12 py-12 text-gray-300 text-4xl">
          No reviews Yet
        </h2>
      )}
    </section>
  );
};

export default MyReviews;
