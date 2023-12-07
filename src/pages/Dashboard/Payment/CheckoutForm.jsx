import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const CheckoutForm = () => {
  const { user } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { bookingId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: booking = {}, isLoading } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/booking/${bookingId}`);
      return data;
    },
  });

  const price = booking?.deliveryFee;

  useEffect(() => {
    if (!isLoading) {
      axiosSecure
        .post("/create-payment-intent", { amount: price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, price, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      //   console.log("payment error", error);
      setError(error.message);
    } else {
      //   console.log("payment method", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.name || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });
    if (confirmError) {
      //   console.log("confirm error", confirmError);
    } else {
      //   console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        navigate("/dashboard/payment-success", {
          state: { payment: paymentIntent.id },
        });
        toast.success("Payment Successful");
      }
    }
  };

  return (
    <div className="-mt-12">
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <div className="w-1/2 mt-12 mb-6 border-2 px-8 py-4 rounded-lg">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
        <button
          type="submit"
          className="btn bg-my-primary border-2 text-white hover:text-my-primary border-my-primary hover:bg-white hover:border-my-primary my-6 min-w-24 text-xl"
          disabled={!stripe || !clientSecret}>
          Pay {price}tk.
        </button>
      </form>
      {error && (
        <p className="text-red-500 text-center font-semibold text-2xl">
          {error}
        </p>
      )}
    </div>
  );
};

export default CheckoutForm;
