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
      console.log("[error]", error);
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: error.message,
      });
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setIsPaymentSuccessful(true); // Trigger confetti effect

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Payment successful!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Stop confetti after 3 seconds
      setTimeout(() => {
        setIsPaymentSuccessful(false);
      }, 3000);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center ">
      {isPaymentSuccessful && <Confetti width={width} height={height} />}
      
      <h1 className="md:text-5xl p-10">Make Your Payment</h1>
      <form className="w-5/12" onSubmit={handleSubmit}>
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
        <button className="btn btn-success my-10" type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
