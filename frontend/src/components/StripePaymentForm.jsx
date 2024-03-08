import React, { useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm'

function StripePaymentForm({ newUser }) {
  console.log(newUser);
  
  const [loading, setLoading] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  
  const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowCheckoutForm(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>
        <div style={{ marginBottom: 10, color: '#fff' }}>Card Details:</div>
      </h4>
      {showCheckoutForm && (
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
      <button style={{ marginTop: "20px", marginBottom: "20px", color: "#fff" }} type="submit" disabled={loading}>Subscribe</button>
    </form>
  );
}

export default StripePaymentForm;
