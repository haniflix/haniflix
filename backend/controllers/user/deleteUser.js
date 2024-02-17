const User = require("../../models/User");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const deleteUser = async (req, res) => {
  try {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      try {
        const user = await User.findById(req.params.id);
        if (user?.subscriptionId) {
          await stripe.subscriptions.cancel(user.subscriptionId);
        }

        await User.findByIdAndUpdate(req.params.id, {
          isDeleted: true,
          isSubscribed: false,
        });
        res.status(200).json({
          message: "User has been deleted along with subscription.",
        });
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json({
        message: "You can delete only your account!",
      });
    }
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
};

module.exports = deleteUser;
