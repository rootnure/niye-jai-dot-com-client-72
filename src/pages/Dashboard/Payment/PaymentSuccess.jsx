// import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import SectionTitle from "../../../component/SectionTitle";
import { Link, useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const { state } = useLocation();
  const height = window.screen.height;
  const width = window.screen.width;
  return (
    <div>
      <SectionTitle
        heading="Payment Success Page"
        subHeading="Congratulation"
      />
      <h2 className="text-3xl mb-12">
        Transaction ID:{" "}
        <span className="text-green-600 font-semibold">{state.payment}</span>
      </h2>
      <Link to="/dashboard">
        <button className="btn btn-outline text-base">Book a new parcel</button>
      </Link>
      <Confetti
        numberOfPieces={250}
        width={width * 0.97}
        height={height * 0.75}
      />
    </div>
  );
};

export default PaymentSuccess;
