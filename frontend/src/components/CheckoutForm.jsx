import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

function CheckoutForm({ name, email }) {
  
  // collect data from the user
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  const [priceId, setPriceId] = useState("");
  
  // stripe items
  const stripe = useStripe();
  const elements = useElements();

  // main function
  const createSubscription = async () => {
    try {
      // create a payment method
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        billing_details: {
          name,
          email,
        },
      });

      if (error) {
        alert(error.message);
        return;
      }

      // call the backend to create subscription
      const response = await fetch("http://localhost:4000/create-subscription", {
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

  return (
    <div className="grid gap-4 m-auto">
      <input
        placeholder="Price Id"
        type="text"
        value={priceId}
        onChange={(e) => setPriceId(e.target.value)}
      />
      <input
        placeholder="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        placeholder="Email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <CardElement />
      <button onClick={createSubscription} style={{ marginTop: "20px", marginBottom: "20px", color: "#fff" }} type="submit" disabled={!stripe}>Subscribe</button>
    </div>
  );
}

export default CheckoutForm;
