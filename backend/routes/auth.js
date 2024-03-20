const sendMail = require("./mail/ForgotPassMail");
const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
const SENDGRID_API_KEY =
  "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";
const email_from = "Haniflix <no-reply@haniflix.com>";
const List = require("../models/List");

dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const demo_url = "https://haniflix.com/"; // "http://localhost:3000/";

sgMail.setApiKey(SENDGRID_API_KEY);

router.get("/send-email", async (req, res) => {
  const msg = {
    to: "aaron@professorval.com",
    from: email_from,
    subject: "Email Server Test",
    html: "Email works!",
  };

  sgMail
    .send(msg)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((error) => {
      res.status(203).json(error);
    });
});

router.post("/register", async (req, res) => {
  const { user } = req.body;
  const email = user.email;
  const password = user.password;

  try {
    const { newUser, defaultList, user } = await registerUser(
      email,
      email,
      password
    );

    // Subscription logic
    const { token } = req.body; // Assuming you are passing the token from the frontend
    const response = await subscribeUser(newUser, token.id);

    if (response) {
      // // Subscription successful, redirect or show a success message
      // const verifyUrl = `${demo_url}verify?otp=${newUser.otp}&email=${newUser.username}`;
      // await sendVerificationEmail(email, verifyUrl);

      res.status(201).json({ statusText: "Created" });
    } else {
      // Handle subscription error
      console.error("Subscription failed:", response.error);
      // Delete the user and the list
      await deleteUserAndList(newUser, defaultList);
      res.status(203).json({
        error: true,
        statusText: "Subscription failed. Please try again later.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(203).json({ error: true, statusText: "Something is wrong!" });
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

async function subscribeUser(newUser, token) {
  try {
    // Create a customer in Stripe
    const customer = await stripe.customers.create({
      email: newUser.email,
      source: token, // The token ID obtained from the client-side
    });
    console.log("Stripe Customer created:", customer);

    // Create a subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: "price_1OPzDXH7M6091XYpI3HAP0sc" }],
    });

    // Update user subscription status
    newUser.isSubscribed = true;
    newUser.subscriptionId = subscription.id;
    await newUser.save();

    console.log("Subscription created successfully");

    return { subscription, user: newUser };
  } catch (error) {
    console.error("Stripe Subscription Error:", error);
    throw new Error("Subscription failed");
  }
}

async function registerUser(username, email, password) {
  console.log(username, email, password);
  const newUser = new User({
    username,
    email,
    otp: CryptoJS.lib.WordArray.random(16),
    password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString(),
  });

  const defaultList = new List({
    title: `${username}'s Watchlist`,
    user: newUser._id,
  });

  newUser.lists.push(defaultList._id);
  newUser.defaultList = defaultList._id;
  const user = await newUser.save();
  await defaultList.save();

  return { newUser, defaultList, user };
}

async function sendVerificationEmail(email, verifyUrl) {
  const msg = {
    to: email,
    from: email_from,
    subject: "Verify your Haniflix account",
    html: `
      <div style="padding: 10px; border: solid 1px #ccc; width: 98%; box-sizing: border-box;">
        <img src="http://haniflix.com/static/media/Nav-logo.88a4f529159344031a96.png" style="width: 100px; display: block; margin: 10px auto 20px auto;">
        <p>Thank you for signing up on Haniflix. <br><br> Click on the following link to complete your signup: <br><br>${verifyUrl}<br><br></p>
        <footer style="color:#888; text-align: center; border-top: 1px solid #ddd; padding-top: 10px">
          <a href="https://haniflix.com" style="color:#888; text-decoration: none;">Haniflix.com</a>
        </footer>
      </div>
    `,
  };

  return sgMail.send(msg);
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

    sgMail
      .send(msg)
      .then((data) => {
        console.log("data ", data);
        res.status(201).json(user);
      })
      .catch((error) => {
        console.log("error ", error);
        res.status(203).json(error);
      });
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
