const express = require('express');
const Stripe = require('stripe');
const router = express.Router();

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Route handler for POST /create-subscription
router.post('/create-subscription', async (req, res) => {
  try {
    const subscriptionDetails = await createSubscription(req.body);
    res.json(subscriptionDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the subscription.' });
  }
});

// Function to create a subscription
async function createSubscription(createSubscriptionRequest) {
  try {
    // Create a customer in Stripe
    const customer = await stripe.customers.create({
      name: createSubscriptionRequest.name,
      email: createSubscriptionRequest.email,
      payment_method: createSubscriptionRequest.paymentMethod,
      invoice_settings: {
        default_payment_method: createSubscriptionRequest.paymentMethod,
      },
    });

    // Get the price id from the front-end
    const priceId = createSubscriptionRequest.priceId;

    // Create a Stripe subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_settings: {
        payment_method_options: {
          card: {
            request_three_d_secure: 'any',
          },
        },
        payment_method_types: ['card'],
        save_default_payment_method: 'on_subscription',
      },
      expand: ['latest_invoice.payment_intent'],
    });

    // Save user subscription status to the database
    const user = await User.findOneAndUpdate(
      { email: createSubscriptionRequest.email },
      { isSubscribed: true },
      { new: true }
    );

    // Return the client secret, subscription id, and subscription status
    return {
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      subscriptionId: subscription.id,
      user: user // You may choose to return the updated user object
    };
  } catch (error) {
    console.error(error);
    throw new Error('Subscription failed');
  }
}


module.exports = router;
