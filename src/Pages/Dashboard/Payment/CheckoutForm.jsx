import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { width, height } = useWindowSize();

  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: error.message,
      });
    } else {
      setIsPaymentSuccessful(true);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Payment Successful!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Stop confetti after 3 seconds
      setTimeout(() => setIsPaymentSuccessful(false), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {isPaymentSuccessful && <Confetti width={width} height={height} />}

      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6 border border-gray-300">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-4">
          💳 Secure Payment
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Enter your card details below to proceed.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-3 border border-gray-300 rounded-lg bg-gray-50">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": { color: "#aab7c4" },
                  },
                  invalid: { color: "#9e2146" },
                },
              }}
            />
          </div>

          <button
            className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition"
            type="submit"
            disabled={!stripe}
          >
            Pay Securely
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
