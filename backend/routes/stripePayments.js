import Stripe from 'stripe'
import { config } from 'dotenv';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


app.post('/create-subscription', ( req  ,res ) => {
    try {
        const subscriptionDetails = await createSubscription(req.body);
        res.json(subscriptionDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the subscription.' });
    }
})


async createSubscription(createSubscriptionRequest) {
    const customer = await this.stripe.customers.create({
      name: createSubscriptionRequest.name,
      email: createSubscriptionRequest.email,
      payment_method: createSubscriptionRequest.paymentMethod,
      invoice_settings: {
        default_payment_method: createSubscriptionRequest.paymentMethod,
      },
    });


    // get the price id from the front-end
    const priceId = createSubscriptionRequest.priceId;

    // create a stripe subscription
    const subscription = await this.stripe.subscriptions.create({
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

    // return the client secret and subscription id
    return {
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      subscriptionId: subscription.id,
    };
  }