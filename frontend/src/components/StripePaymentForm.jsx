import React, { useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { CardElement } from "@stripe/react-stripe-js";

function StripePaymentForm({ newUser }) {
  console.log(newUser);
  
  const [loading, setLoading] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  

  const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY);


  const handleSubmit = async (event) => {
  //   fetch("http://localhost:300/api/create-subscription-checkout-session", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     mode: "cors",
  //     body: JSON.stringify(plan: plan, customerId: userId)
  //   })
  //   .then((res) => {
  //     if(res.ok) return res.json()
  //     console.log(res)
  //     return res.json().then((json) => Promise.reject(json))
  //   })
  //   .then(({session}) => {
  //     window.location = session.url
  //   })
  //   .catch((e) => {
  //     console.log(error)
  //   })
  // };
  event.preventDefault()
  setShowCheckoutForm(true)

  return (
    <form onSubmit={handleSubmit}>
      <h4>
        <div style={{ marginBottom: 10, color: '#fff' }}>Card Details:</div>
      </h4>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
      <button style={{ marginTop: "20px", marginBottom: "20px", color: "#fff" }} type="submit" disabled={loading}>Subscribe</button>
    </form>
  );
}

export default StripePaymentForm;
