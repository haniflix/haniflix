import React from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import App from "./App"; // Replace with your main app component file
import store, { persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
const pk = import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY;

const stripePromise = loadStripe(pk);

const container = document.getElementById("root");

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </Elements>
  </React.StrictMode>
);
