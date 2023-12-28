import React from "react";
import { register } from "../context/register/apiCalls";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";


function StripePaymentForm({newUser}) {
  console.log(newUser)
  const stripe = useStripe();
  const elements = useElements();
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      console.error(error);
      alert("Subscription failed. Please try again later.");
    } else {
    
        alert("Subscription successful!");
        register(newUser, token);
        
      }
    
  };

  return (
    <form onSubmit={handleSubmit} style={{margin:"5px", padding:"0px"}}>
      <h4>
        Card Details:
        <CardElement />
      </h4>
      <button style={{marginTop:"20px", marginBottom:"20px"}} type="submit">Subscribe</button>
    </form>
  );
}

export default StripePaymentForm;
