const router = require("express").Router();
const User = require("../models/User");

const CryptoJS = require("crypto-js");
const verify = require("../middleware/verifyToken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const _ = require("lodash");

//CREATE
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }
    const newUser = new User(req.body);
    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can update only your account!");
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
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
});

//GET
router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", async (req, res) => {
  // const query = req.query.new;
  //if(req.user.isAdmin) {
  try {
    const params = _.pick(req.query, ["orderBy"]);
    const orderBy = params.orderBy;

    const aggregationPipeline = []; // Initialize empty pipeline

    // Add sort stage based on "orderBy" parameter
    switch (orderBy) {
      case "descAlpha":
        aggregationPipeline.push({ $sort: { fullname: -1 } });
        break;
      case "ascAlpha":
        aggregationPipeline.push({ $sort: { fullname: 1 } });
        break;
    }

    // Ensure at least one pipeline stage
    if (aggregationPipeline.length === 0) {
      aggregationPipeline.push({ $match: {} });
    }

    aggregationPipeline.push({
      $project: {
        _id: 1,
        // Exclude accessToken
        accessToken: 0,
      },
    });

    const users = await User.aggregate(aggregationPipeline);

    console.log("users length", users.length);

    res.status(200).json(users);
  } catch (err) {
    //-- throws a 'headers_already_sent' error
    console.log("erro ", err);

    res.status(500).json(err);
  }
  /*} else {
      res.status(403).json("You are not allowed to see all users!");
  }*/
});

//GET USER STATS
router.get("/stats", async (req, res) => {
  const today = new Date();
  const latYear = today.setFullYear(today.setFullYear() - 1);

  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE USER DETAILS
router.put("/updateUserDetails/:id", async (req, res) => {
  if (req.body.id === req.params.id) {
    try {
      // Update user details, excluding password
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            fullname: req.body.name,
            username: req.body.email,
            email: req.body.email,
          },
        },
        { new: true }
      );
      const { password, ...info } = updatedUser._doc;
      res.status(200).json(info);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can update only your account!");
  }
});

// UPDATE PASSWORD
router.put("/updatePassword/:id", async (req, res) => {
  if (req.user.id === req.params.id) {
    try {
      // Encrypt new password
      const encryptedPassword = CryptoJS.AES.encrypt(
        req.body.newPassword,
        process.env.SECRET_KEY
      ).toString();

      // Update user password
      await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            password: encryptedPassword,
          },
        },
        { new: true }
      );
      res.status(200).json("Password updated successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can update only your account!");
  }
});

// router.post('/subscribe', async (req, res) => {
//   try {
//     // Create a customer in Stripe
//     const customer = await stripe.customers.create({
//       email: req.body.email,
//       source: req.body.tokenId, // The token ID obtained from the client-side
//     });

//     // Create a subscription
//     const subscription = await stripe.subscriptions.create({
//       customer: customer.id,
//       items: [{ price: 'price_1OPzRqH7M6091XYpgo612qWG' }], // Replace with your price ID
//     });

//     const user = await User.findOne({ email: req.body.email });
//     user.isSubscribed == true

//     res.status(200).json(subscription);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Subscription failed' });
//   }
// });

module.exports = router;
