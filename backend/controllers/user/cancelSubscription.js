const User = require("../../models/User");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const cancelSubscription = async (req, res) => {
  // if (req.user.id === req.params.id || req.user.isAdmin) {
  console.log("user id", req.params.id);
  try {
    const user = await User.findById(req.params.id);
    console.log(user, "user");
    if (user?.subscriptionId) {
      await stripe.subscriptions.cancel(user.subscriptionId);

      console.log("i ran");

      // This would be done by stripe hook
      // user.isSubscribed = false;

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
  // } else {
  //   res.status(403).json({
  //     message: "You can cancel subscription only for your account!",
  //   });
  // }
};

module.exports = cancelSubscription;
