import React, { useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { CardElement } from "@stripe/react-stripe-js";

function StripePaymentForm({ newUser }) {
  console.log(newUser);
  const [loading, setLoading] = useState(false);
  const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY);

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
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>
        <div style={{ marginBottom: 10, color: '#fff' }}>Card Details:</div>
      </h4>
      <CardElement options={{ style: { base: { color: '#fff' } } }} />
      <button style={{ marginTop: "20px", marginBottom: "20px", color: "#fff" }} type="submit" disabled={loading}>Subscribe</button>
    </form>
  );
}

export default StripePaymentForm;
