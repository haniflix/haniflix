const sendMail = require("./mail/ForgotPassMail");
const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
// const SENDGRID_API_KEY =
//   "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";
const email_from = "Haniflix <no-reply@haniflix.com>";
const { List } = require("../models/index");
// const mongoose = require("mongoose")
// const List = require("../models/List");

dotenv.config();
console.log("secret", process.env.STRIPE_SECRET_KEY);
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const Stripe = require("stripe");
const stripeInstance = Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15", // Replace with the desired API version
});

const demo_url = "https://haniflix.com/"; // "http://localhost:3000/";

// sgMail.setApiKey(SENDGRID_API_KEY);

const stripeSession = async (plan, user_email, user_password, username) => {
  try {
    const session = await stripeInstance.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: plan,
          quantity: 1,
        },
      ],
      success_url: `http://localhost:5173/register/?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: "http://localhost:5173/register/cancelled=true",
      metadata: {
        user_email,
        user_password,
        username,
      },
    });
    return session;
  } catch (e) {
    return e;
  }
};
router.post("/v1/create-subscription-checkout-session", async (req, res) => {
  const { plan, customerId, email, username, password } = req.body;

  console.log(req.body);
  console.log("email", email);
  // const emailExists = await User.find({ email: email });
  const emailExists = await User.findOne({ email: req.body.email });
  console.log("emailExists", emailExists);
  if (emailExists) {
    res.status(404).json({
      error: true,
      statusText: "This email already exists. Try another email",
    });
    return;
  }
  const usernameExists = await User.findOne({ username: username });
  console.log("usernameExists", usernameExists);
  if (usernameExists) {
    res.status(404).json({
      error: true,
      statusText: "This username already exists. Try another username",
    });
    return;
  }
  try {
    const session = await stripeSession(
      "price_1P3kLrELZYEDPohb5ZWIbvUh",
      email,
      password,
      username
    );
    // const user = await admin.auth().getUser(customerId);
    console.log("session", session);
    return res.json({ session });
  } catch (error) {
    res.send(error);
  }
});

router.post("/v1/payment-success", async (req, res) => {
  const { sessionId, email, password, username } = req.body;

  console.log("body in success", req.body);

  try {
    const session = await stripeInstance.checkout.sessions.retrieve(sessionId);
    const userExist = await User.findOne({
      email: session.metadata.user_email,
    });
    if (userExist && userExist.isSubscribed) {
      console.log("User is subscribed already");
      return res.json({ message: "User is subscribed already" });
    }
    if (userExist && !userExist.isSubscribed) {
      console.log("User has been resubscribed");
      await User.findOneAndUpdate(
        { email: session.metadata.user_email },
        { isSubscribed: true }
      );
      return res.json({ message: "User has been resubscribed" });
    }
    console.log("session", session);
    if (session.payment_status === "paid") {
      const subscriptionId = session.subscription;
      try {
        const subscription = await stripeInstance.subscriptions.retrieve(
          subscriptionId
        );
        console.log("subscription", subscription);
        const newUser = await new User({
          username: session.metadata.username,
          email: session.metadata.user_email,
          otp: CryptoJS.lib.WordArray.random(16),
          password: CryptoJS.AES.encrypt(
            session.metadata.user_password,
            process.env.SECRET_KEY
          ).toString(),
          isSubscribed: true,
          subscriptionId: subscription.id,
          // old: username,
          // old: email,
        }).save();
        // await newUser.save();
        console.log("Newuser", newUser);

        // TODO:Uncomment
        const defaultList = new List({
          title: `${console.log("email", email)}'s Watchlist`,
          user: newUser._id,
        });

        console.log("defaultList", defaultList);

        newUser.lists.push(defaultList._id);
        newUser.defaultList = defaultList._id;

        return res.status(200).json({ newUser });
        // const { newUser, defaultList, user, err } = await registerUser(
        //   email,
        //   password,
        //   username
        // );

        // // Update user subscription status

        // console.log("newUser", newUser);
        // console.log("user", user);
        // newUser;
        // await User.findByIdAndUpdate(
        //   { _id: user._id },
        //   { isSubscribed: true, subscriptionId: subscription.id }
        // );

        // const resUser = await User.findOne({ email });

        // res.status(200).json({ resUser });
        // console.log("newUser after", newUser);
        // console.log("user after", user);
        // const planId = subscription.plan.id;
        // const planType = subscription.plan.amount === 50000 ? "basic" : "pro";
        // const startDate = moment
        //   .unix(subscription.current_period_start)
        //   .format("YYYY-MM-DD");
        // const endDate = moment
        //   .unix(subscription.current_period_end)
        //   .format("YYYY-MM-DD");
        // const durationInSeconds =
        //   subscription.current_period_end - subscription.current_period_start;
        // const durationInDays = moment
        //   .duration(durationInSeconds, "seconds")
        //   .asDays();
        // // await admin
        // //   .database()
        // //   .ref("users")
        // //   .child(user.uid)
        // console.log(
        //   "planId",
        //   planId,
        //   "planType",
        //   planType,
        //   "planStartDate",
        //   startDate,
        //   "planEndDate",
        //   endDate,
        //   "planDuration",
        //   durationInDays
        // );
      } catch (error) {
        console.error("Error retrieving subscription:", error);
      }
      return res.json({ message: "Payment successful" });
    } else {
      return res.json({ message: "Payment failed" });
    }
  } catch (error) {
    res.send(error);
  }
});

router.get("/send-email", async (req, res) => {
  const msg = {
    to: "aaron@professorval.com",
    from: email_from,
    subject: "Email Server Test",
    html: "Email works!",
  };

  // sgMail
  //   .send(msg)
  //   .then((data) => {
  //     res.status(201).json(data);
  //   })
  //   .catch((error) => {
  //     res.status(203).json(error);
  //   });
});

router.post("/register", async (req, res) => {
  const { user, payment_method } = req.body; // Destructure `user` and `payment_method` from the request body
  const email = user.email;
  const password = user.password;
  const username = user.username.toLowerCase();

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
      res.status(404).json({
        error: true,
        statusText:
          "This username or email already exists. Try another username or Signin",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, statusText: "Something went wrong!" });
  }
});

// router.post("/create-payment-intent", async (req, res)  => {
//   if (!req.body.currency || !req.body.amount || !req.body.bagID) {
//     res.status(400).json({ message: "invalid parameters" });
//     return;
//   }
//   const emailIsValid = await User.findOne({ email: req.body.email });
//   if (!bagIsValid) {
//     res.status(400).json({ message: "No bag selected" });
//     return;
//   }
//   if (!emailIsValid) {
//     res.status(400).json({ message: "No user found" });
//     return;
//   }
//   if (bagIsValid && bagIsValid.items.length == 0) {
//     res.status(400).json({ message: "Bag is empty" });
//     return;
//   }
//   if (!req.body.email) {
//     res.status(400).json({ message: "No email provided" });
//     return;
//   }
//   console.log(bagIsValid);

//   try {
//     const paymentIntent = await stripeInstance.paymentIntents.create({
//       currency: req.body.currency,
//       amount: req.body.amount,
//       automatic_payment_methods: { enabled: true },
//       metadata: { bagID: req.body.bagID, email: req.body.email },
//     });

//     // Send publishable key and PaymentIntent details to client
//     // clientSecret: paymentIntent.client_secret,
//     res.status(201).json({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (e: any) {
//     // console.log(e);
//     return res.status(400).json({
//       error: {
//         message: e.message,
//       },
//     });
//   }
// })
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
  console.log("newUser", newUser);
  console.log("payment_method", payment_method);
  try {
    // Create a customer in Stripe
    const customer = await stripeInstance.customers.create({
      // name: newUser.username,
      email: newUser.email,
      // invoice_settings: {
      //   default_payment_method: payment_method,
      // },
    });
    console.log("Stripe Customer created:", customer);

    // Add the payment method to the customer
    const attacher = await stripeInstance.paymentMethods.attach(
      payment_method.id,
      {
        customer: customer.id,
      }
    );
    const updatePaymentMethod = await stripeInstance.customers.update(
      customer.id,
      {
        invoice_settings: {
          default_payment_method: payment_method.id,
        },
      }
    );

    console.log("attached customer id", attacher);
    console.log("update customer id", updatePaymentMethod);

    // Create a subscription ---- BUGGY CODE
    const subscription = await stripeInstance.subscriptions.create({
      customer: customer.id,
      items: [{ price: process.env.STRIPE_SUBSCRIPTION_PRICE_ID.toString() }],
      expand: ["latest_invoice.payment_intent"],
      payment_behavior: "default_incomplete",
      payment_settings: {
        payment_method_options: {
          card: {
            request_three_d_secure: "automatic",
          },
        },
        payment_method_types: ["card"],
        save_default_payment_method: "on_subscription",
      },
    });
    console.log("subscription", subscription);

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
    const existingEmailUser = await User.findOne({ old: email });
    const existingUsernameUser = await User.findOne({ old: username });
    console.log(
      "existingEmailUser under resgiter fundction",
      existingEmailUser
    );
    console.log(
      "existingEmailUser under resgiter fundction",
      existingUsernameUser
    );
    // If a user with the email or username already exists, return an error
    if (existingEmailUser || existingUsernameUser) {
      let errorMessage = "";
      if (existingEmailUser) errorMessage += "This email already exists. ";
      if (existingUsernameUser) errorMessage += "This username already exists.";
      console.log(errorMessage);
      return { error: { message: errorMessage }, newUser: null };
      // throw new Error(errorMessage);
    }

    // If the user does not exist, create a new user
    const newUser = new User({
      username,
      email,
      otp: CryptoJS.lib.WordArray.random(16),
      password: CryptoJS.AES.encrypt(
        password,
        process.env.SECRET_KEY
      ).toString(),
      // old: username,
      // old: email,
    });

    console.log("Newuser", newUser);

    const defaultList = new List({
      title: `${username}'s Watchlist`,
      user: newUser._id,
    });

    console.log("defaultList", defaultList);

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

// async function sendVerificationEmail(email, verifyUrl) {
//   const msg = {
//     to: email,
//     from: email_from,
//     subject: "Verify your Haniflix account",
//     html: `
//       <div style="padding: 10px; border: solid 1px #ccc; width: 98%; box-sizing: border-box;">
//         <img src="http://haniflix.com/static/media/Nav-logo.88a4f529159344031a96.png" style="width: 100px; display: block; margin: 10px auto 20px auto;">
//         <p>Thank you for signing up on Haniflix. <br><br> Click on the following link to complete your signup: <br><br>${verifyUrl}<br><br></p>
//         <footer style="color:#888; text-align: center; border-top: 1px solid #ddd; padding-top: 10px">
//           <a href="https://haniflix.com" style="color:#888; text-decoration: none;">Haniflix.com</a>
//         </footer>
//       </div>
//     `,
//   };

//   return sgMail.send(msg);
// }

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

    const subscription = await stripeInstance.subscriptions.retrieve(
      user.subscriptionId
    );
    if (subscription.status === "active") {
      console.log("Subscription is active");
      // return true;
    }
    if (subscription.status != "active") {
      await User.findOneAndUpdate(
        { email: userEmail },
        { isSubscribed: false }
      );
      res.status(400).json({
        message: "User subscription has expired",
      });
      return;
    }
    console.log(subscription);
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

router.post("/forgot-pass", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user?.username) {
      res.status(400).json({ error: true, statusText: "User does not exist!" });
      return;
    }
    const url = `${demo_url}change-password/${user._id}/${user.email}`;

    const msg = {
      to: req.body.email,
      from: email_from,
      subject: "Password Reset Link - Haniflix",
      html: `
          <p><strong>Hello Haniflix User,</strong></p>
          <p>We received a request to reset your password. Click on the link below to reset your password:</p>
          <p><a href="${url}" target="_blank">${url}</a></p>
          <p>If you didn't request a password reset, please ignore this email.</p>
          <p>This link will expire in 1 day for security reasons.</p>
          <p>Thank you!</p>

                <footer style="color:#888; text-align: center; border-top: 1px solid #ddd; padding-top: 10px">
                    <a href="https://haniflix.com" style="color:#888; text-decoration: none;"">Haniflix.com</a>
                </footer>

            </div>
          `,
    };

    // sgMail
    //   .send(msg)
    //   .then((data) => {
    //     console.log("data ", data);
    //     res.status(201).json(user);
    //   })
    //   .catch((error) => {
    //     console.log("error ", error);
    //     res.status(203).json(error);
    //   });
  } catch (e) {
    console.log("e ", e);
    res.status(400).json({
      message: "Error encountered",
      error: e,
    });
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
