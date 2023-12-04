import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../component/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

const Payment = () => {
  return (
    <section>
      <SectionTitle heading="Payment" subHeading="Please Pay To Continue" />
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm></CheckoutForm>
        </Elements>
      </div>
    </section>
  );
};

export default Payment;
