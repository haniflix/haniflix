const User = require("../../models/User");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const cancelSubscription = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      const user = await User.findById(req.params.id);
      if (user?.subscriptionId) {
        await stripe.subscriptions.cancel(user.subscriptionId);

        user.isSubscribed = false;

        await user.save();
        res.status(200).json({
          message: "Subscription has been canceled.",
        });
      } else {
        res.status(400).json({
          message: "User does not have an active subscription.",
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json({
      message: "You can cancel subscription only for your account!",
    });
  }
};

module.exports = cancelSubscription;
