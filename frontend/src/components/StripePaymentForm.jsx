import React from "react";
import { register } from "../context/register/apiCalls";
import { CardElement, useStripe, useElements, ExpressCheckoutElement } from "@stripe/react-stripe-js";


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
  const [errorMessage, setErrorMessage] = useState();

  const onConfirm = async (event) => {
    if (!stripe) {
      // Stripe.js hasn't loaded yet.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const {error: submitError} = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }

    // Create the PaymentIntent and obtain clientSecret
    const res = await fetch('/create-intent', {
      method: 'POST',
    });
    const {client_secret: clientSecret} = await res.json();

    // Confirm the PaymentIntent using the details collected by the Express Checkout Element
    const {error} = await stripe.confirmPayment({
      // `elements` instance used to create the Express Checkout Element
      elements,
      // `clientSecret` from the created PaymentIntent
      clientSecret,
      confirmParams: {
        return_url: 'https://example.com/order/123/complete',
      },
    });

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      setErrorMessage(error.message);
    } else {
      // The payment UI automatically closes with a success animation.
      // Your customer is redirected to your `return_url`.
    }
  };


  return (
    <form onSubmit={handleSubmit} >
      <h4>
        <div style={{marginBottom: 10, color: '#fff'}}>Card Details:</div>
        <ExpressCheckoutElement onConfirm={onConfirm} />
      </h4>
      <button style={{marginTop:"20px", marginBottom:"20px", color: "#fff"}} type="submit">Subscribe</button>
    </form>
  );
}

export default StripePaymentForm;
