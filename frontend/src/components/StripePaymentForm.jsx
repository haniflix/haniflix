import React, { useState } from "react";
<<<<<<< HEAD
import { loadStripe } from '@stripe/stripe-js';
import { CardElement } from "@stripe/react-stripe-js";

function StripePaymentForm({ newUser }) {
  console.log(newUser);
  const [loading, setLoading] = useState(false);
  const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY);
=======
import { register } from "../context/register/apiCalls";
import {
  CardElement,
  useStripe,
  useElements,
  ExpressCheckoutElement,
} from "@stripe/react-stripe-js";
 {loadStripe} from '@stripe/stripe-js'

function StripePaymentForm({ newUser }) {
  console.log(newUser);
  const stripe = useStripe();
  const elements = useElements();
>>>>>>> d8ca080439a8c4b306034d6cfaa2fc3089939587

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    const stripe = await stripePromise;

    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: import.meta.env.VITE_APP_STRIPE_SUBSCRIPTION_PRICE_ID, quantity: 1 }],
      mode: 'subscription',
      successUrl: 'https://haniflix.com/success',
      cancelUrl: 'https://haniflix.com/cancel',
    });
    
    if (error) {
      console.error(error);
<<<<<<< HEAD
      setLoading(false);
=======
      alert("Subscription failed. Please try again later.");
    } else {
      alert("Subscription successful!");
      register(newUser, token);
    }
  };
  const [errorMessage, setErrorMessage] = useState();

  const onConfirm = async (event) => {
    if (!stripe) {
      // Stripe.js hasn't loaded yet.
      // Make sure to disable form submission until Stripe.js has loaded.
      console.log("loading stripe ");
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }

    // Create the PaymentIntent and obtain clientSecret
    const res = await fetch("/create-intent", {
      method: "POST",
    });
    const { client_secret: clientSecret } = await res.json();

    // Confirm the PaymentIntent using the details collected by the Express Checkout Element
    const { error } = await stripe.confirmPayment({
      // `elements` instance used to create the Express Checkout Element
      elements,
      // `clientSecret` from the created PaymentIntent
      clientSecret,
      confirmParams: {
        return_url: "https://haniflix.com",
      },
    });

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      setErrorMessage(error.message);
    } else {
      // The payment UI automatically closes with a success animation.
      // Your customer is redirected to your `return_url`.
>>>>>>> d8ca080439a8c4b306034d6cfaa2fc3089939587
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>
<<<<<<< HEAD
        <div style={{ marginBottom: 10, color: '#fff' }}>Card Details:</div>
      </h4>
      <CardElement options={{ style: { base: { color: '#fff' } } }} />
      <button style={{ marginTop: "20px", marginBottom: "20px", color: "#fff" }} type="submit" disabled={loading}>Subscribe</button>
=======
        <div style={{ marginBottom: 10, color: "#fff" }}>Card Details:</div>
        <ExpressCheckoutElement onConfirm={onConfirm} />
      </h4>
      <button
        style={{ marginTop: "20px", marginBottom: "20px", color: "#fff" }}
        type="submit"
      >
        Subscribe
      </button>
>>>>>>> d8ca080439a8c4b306034d6cfaa2fc3089939587
    </form>
  );
}

export default StripePaymentForm;
