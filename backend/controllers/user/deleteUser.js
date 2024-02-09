const User = require("../../models/User");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const deleteUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      const user = await User.findById(req.params.id);
      if (user?.subscriptionId) {
        await stripe.subscriptions.cancel(user?.subscriptionId);
      }
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can delete only your account!");
  }
};

module.exports = deleteUser;
