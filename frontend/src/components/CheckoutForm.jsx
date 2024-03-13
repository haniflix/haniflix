import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState, useEffect } from "react";
import ErrorDialog from './popup/ErrorPopup'

function CheckoutForm({ name, email }) {
  const [priceId, setPriceId] = useState("");

  useEffect(() => {
    // Set priceId using the environment variable
    setPriceId(import.meta.env.VITE_APP_STRIPE_SUBSCRIPTION_PRICE_ID);
  }, []);

  // stripe items
  const stripe = useStripe();
  console.log(stripe)
  const elements = useElements();

  // main function
  const createSubscription = async () => {
    try {
      // create a payment method
      console.log("func triggered")
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        billing_details: {
          name,
          email,
        },
      });
      console.log(paymentMethod, error)

      if (error) {
        alert(error.message);
        <ErrorDialog message={error.message}/>
        return;
      }

      // call the backend to create subscription
      const response = await fetch("http://localhost:8800/api/stripe/create-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethod: paymentMethod.id,
          name,
          email,
          priceId
        }),
      });

      const data = await response.json();
      console.log(data)

      const confirmPayment = await stripe.confirmCardPayment(data.clientSecret);

      if (confirmPayment.error) {
        alert(confirmPayment.error.message);
      } else {
        alert("Success! Check your email for the invoice.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px', // Adjust the font size
        color: '#333', // Change the text color
        '::placeholder': {
          color: '#ccc', // Change the placeholder color
        },
      },
      invalid: {
        color: '#e74c3c', // Change the color of the invalid input
      },
    },
    hidePostalCode: true,
  };

  return (
    <div className="grid gap-4 m-auto">
      <CardElement options={cardElementOptions} />
      <button onClick={createSubscription} style={{ marginTop: "20px", marginBottom: "20px", color: "#fff" }} type="submit" disabled={!stripe}>Subscribe</button>
    </div>
  );
}

export default CheckoutForm;
