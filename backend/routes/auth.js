const sendMail = require("./mail/ForgotPassMail");
const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const email_from = "Haniflix <no-reply@haniflix.com>";
const {List} = require("../models/index");
// const mongoose = require("mongoose")
// const List = require("../models/List");

dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const demo_url = "https://haniflix.com/"; // "http://localhost:3000/";


router.post("/register", async (req, res) => {
  const { user, payment_method } = req.body; // Destructure `user` and `payment_method` from the request body
  const email = user.email;
  const password = user.password;
  const username = user.username.toLowerCase()

  try {
  const { newUser, defaultList, user, err } = await registerUser(
    email,
    password,
    username
  );

  if (newUser) {
    if (err) {
      res.status(409).json({ error: true, statusText: err.message });
      return; // Return to avoid further execution
    }

    const response = await subscribeUser(newUser, payment_method);

    if (response && !response.error) {
      res.status(201).json({ statusText: "Created" });
    } else {
      console.error("Subscription failed:", response.error);
      await deleteUserAndList(newUser, defaultList);
      res.status(203).json({
        error: true,
        statusText: "Subscription failed. Please try again later.",
      });
    }
  } else {
    console.log("New user does not exist");
    res.status(404).json({ error: true, statusText: "This username or email already exists. Try another username or Signin" });
  }
} catch (error) {
  console.log(error);
  res.status(500).json({ error: true, statusText: "Something went wrong!" });
}

});

// Add a new function to delete the user and the list
async function deleteUserAndList(user, list) {
  try {
    console.log("Delete User", user, list);
    // Delete the user
    await User.findByIdAndDelete(user._id);

    // Delete the list
    await List.findByIdAndDelete(list._id);

    console.log("User and list deleted successfully");
  } catch (error) {
    console.error("Error deleting user and list:", error);
    throw new Error("Failed to delete user and list");
  }
}

async function subscribeUser(newUser, payment_method) {
  console.log("newUser",newUser)
  console.log("payment_method", payment_method)
  try {
    // Create a customer in Stripe
    const customer = await stripe.customers.create({
      name: newUser.username,
      email: newUser.email,
      invoice_settings : {
        default_payment_method: payment_method,
      }
    });
    console.log("Stripe Customer created:", customer);
  
    // const attacher = await stripe.paymentMethods.attach(payment_method.id, {
    //   customer: customer.id,
    // });

    // console.log("attached customer id",attacher)

    // // Create a subscription ---- BUGGY CODE 
    // const subscription = await stripe.subscriptions.create({
    //   customer: customer.id,
    //   items: [{ price: process.env.STRIPE_SUBSCRIPTION_PRICE_ID.toString()}],
    //   expand: ['latest_invoice.payment_intent'],
    //   payment_settings: {
    //     payment_method_options: {
    //       card: {
    //         request_three_d_secure: 'any',
    //       },
    //     },
    //     payment_method_types: ['card'],
    //     save_default_payment_method: 'on_subscription',
    //   },
    // });

    // // BUGGUY CODE HOW DO I FIX

    // console.log("Stripe Subscription Created", subscription)

    // const status = subscription['latest_invoice']['payment_intent']['status']
    // const client_secret = subscription['latest_invoice']['payment_intent']['client_secret']
    // console.log("status", status, "client_secret", client_secret)

    // // Update user subscription status
    // newUser.isSubscribed = true;
    // newUser.subscriptionId = subscription.id;
    // await newUser.save();

    // console.log("Subscription created successfully");

    // return { subscription, user: newUser };
  } catch (error) {
    console.error("Stripe Subscription Error:", error);
    throw new Error("Subscription failed");
  }
}

async function registerUser(email, password, username) {
  try {
    // Check if a user with the provided email or username already exists
    const existingEmailUser = await User.findOne({ email });
    const existingUsernameUser = await User.findOne({ username });
    
    // If a user with the email or username already exists, return an error
    if (existingEmailUser || existingUsernameUser) {
      let errorMessage = '';
      if (existingEmailUser) errorMessage += 'This email already exists. ';
      if (existingUsernameUser) errorMessage += 'This username already exists.';
      console.log(errorMessage)
      return { error: {message: errorMessage}, newUser:null }
      // throw new Error(errorMessage);
    }

    // If the user does not exist, create a new user
    const newUser = new User({
      username,
      email,
      otp: CryptoJS.lib.WordArray.random(16),
      password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString(),
      old_username: username,
      old_email: email
    });

    console.log("Newuser", newUser)
  
    const defaultList = new List({
      title: `${username}'s Watchlist`,
      user: newUser._id,
    });
  
    console.log('defaultList', defaultList)
  
    newUser.lists.push(defaultList._id);
    newUser.defaultList = defaultList._id;
    
    // Save the new user and default list
    const user = await newUser.save();
    await defaultList.save();
  
    return { newUser, defaultList, user, err: null };
  } catch (error) {
    // Return the error message if any
    return { err: { message: error.message } };
  }
}

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const userEmail = req.body.email.toLowerCase(); // Convert user input to lowercase
    const user = await User.findOne({
      email: { $regex: new RegExp("^" + userEmail + "$", "i") },
    });

    if (!user) {
      res.status(400).json({ message: "Wrong email provided!" });
      return;
    }

    if (user.emailVerified === false) {
      res.status(400).json({
        message: "Your email address is not verified! Check your inbox.",
      });
      return;
    }

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      res.status(400).json({
        message: "Wrong password or username!",
      });
      return;
    }

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "30d" } // Adjust refresh token expiration time
    );

    user.accessToken = accessToken;
    await user.save();

    const { password, ...info } = user._doc;

    res.status(200).json({ ...info, accessToken, refreshToken });
  } catch (err) {
    console.log("error ", err);
    res.status(400).json({
      message: err?.message ? err?.message : err,
    });
  }
});

//refresh token
router.post("/refreshToken", async (req, res) => {
  try {
    // 1. Verify refresh token
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
      return res.status(400).json({ error: "Refresh token is required" });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const userId = decoded.id;

    // 2. Find user and check for valid refresh token
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    // 3. Generate new access token
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "24h" } // Adjust expiration time as needed
    );

    // 4. Update accessToken in user document
    user.accessToken = accessToken;
    await user.save();

    // 5. Send response with new access token
    res.json({ accessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/verify_email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(200).json("Wrong email provided!");
      return;
    }

    if (user.emailVerified === true) {
      res.status(200).json("Your email address is already verified!");
      return;
    }

    if (user.otp === req.body.otp) {
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { emailVerified: true },
        function (err, docs) {
          if (err) {
            res.status(201).json(err);
          } else {
            const accessToken = jwt.sign(
              { id: user._id, isAdmin: user.isAdmin },
              process.env.SECRET_KEY,
              { expiresIn: "5d" }
            );

            const { password, ...info } = docs._doc;
            res.status(200).json({ ...info, accessToken });
          }
        }
      );
    } else {
      res.status(201).json("Wrong OTP supplied!");
    }
  } catch (err) {
    res.status(201).json(err);
  }
});


router.put("/change-password", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json("Wrong email provided!");
    }

    // Hash the new password before updating
    const hashedPassword = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString();

    // Update user document with the new hashed password
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { password: hashedPassword },
      { new: true }
    );

    // Omit the password field from the response
    const { password, ...info } = updatedUser._doc;

    // Respond with the updated user information
    res.status(200).json({ ...info });
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
});

module.exports = router;
