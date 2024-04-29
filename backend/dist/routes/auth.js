var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
const sendMail = require("./mail/ForgotPassMail");
const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const email_from = "Haniflix <no-reply@haniflix.com>";
const List = require("../models/List");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const demo_url = "http://localhost:3000/";

router.post("/register", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { user } = req.body;
    const email = user.email;
    const password = user.password;
    try {
        const { newUser, defaultList, user } = yield registerUser(email, email, password);
        // Subscription logic
        const { token } = req.body; // Assuming you are passing the token from the frontend
        const response = yield subscribeUser(newUser, token.id);
        if (response) {
            // // Subscription successful, redirect or show a success message
            // const verifyUrl = `${demo_url}verify?otp=${newUser.otp}&email=${newUser.username}`;
            // await sendVerificationEmail(email, verifyUrl);
            res.status(201).json({ statusText: "Created" });
        }
        else {
            // Handle subscription error
            console.error("Subscription failed:", response.error);
            // Delete the user and the list
            yield deleteUserAndList(newUser, defaultList);
            res.status(203).json({
                error: true,
                statusText: "Subscription failed. Please try again later.",
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(203).json({ error: true, statusText: "Something is wrong!" });
    }
}));
// Add a new function to delete the user and the list
function deleteUserAndList(user, list) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Delete User", user, list);
            // Delete the user
            yield User.findByIdAndDelete(user._id);
            // Delete the list
            yield List.findByIdAndDelete(list._id);
            console.log("User and list deleted successfully");
        }
        catch (error) {
            console.error("Error deleting user and list:", error);
            throw new Error("Failed to delete user and list");
        }
    });
}
function subscribeUser(newUser, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Create a customer in Stripe
            const customer = yield stripe.customers.create({
                email: newUser.email,
                source: token, // The token ID obtained from the client-side
            });
            console.log("Stripe Customer created:", customer);
            // Create a subscription
            const subscription = yield stripe.subscriptions.create({
                customer: customer.id,
                items: [{ price: "price_1OPzDXH7M6091XYpI3HAP0sc" }],
            });
            // Update user subscription status
            newUser.isSubscribed = true;
            yield newUser.save();
            console.log("Subscription created successfully");
            return { subscription, user: newUser };
        }
        catch (error) {
            console.error("Stripe Subscription Error:", error);
            throw new Error("Subscription failed");
        }
    });
}
function registerUser(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
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
        const user = yield newUser.save();
        yield defaultList.save();
        return { newUser, defaultList, user };
    });
}

//LOGIN
router.post("/login", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({ email: req.body.email });
        //const user = await User.findOne({ email: "test@ŧest.com" });
        console.log(req.body);
        if (!user) {
            res.status(200).json("Wrong email provided!");
            return;
        }
        if (user.emailVerified === false) {
            res
                .status(200)
                .json("Your email address is not verified! Check your inbox.");
            return;
        }
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        if (originalPassword !== req.body.password) {
            res.status(200).json("Wrong password or username!");
            return;
        }
        const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, { expiresIn: "5d" });
        const _a = user._doc, { password } = _a, info = __rest(_a, ["password"]);
        res.status(200).json(Object.assign(Object.assign({}, info), { accessToken }));
    }
    catch (err) {
        res.status(201).json(err);
    }
}));
router.post("/verify_email", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({ email: req.body.email });
        if (!user) {
            res.status(200).json("Wrong email provided!");
            return;
        }
        if (user.emailVerified === true) {
            res.status(200).json("Your email address is already verified!");
            return;
        }
        if (user.otp === req.body.otp) {
            const updatedUser = yield User.findByIdAndUpdate(user._id, { emailVerified: true }, function (err, docs) {
                if (err) {
                    res.status(201).json(err);
                }
                else {
                    const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, { expiresIn: "5d" });
                    const _a = docs._doc, { password } = _a, info = __rest(_a, ["password"]);
                    res.status(200).json(Object.assign(Object.assign({}, info), { accessToken }));
                }
            });
        }
        else {
            res.status(201).json("Wrong OTP supplied!");
        }
    }
    catch (err) {
        res.status(201).json(err);
    }
}));

router.put("/change-password", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json("Wrong email provided!");
        }
        // Hash the new password before updating
        const hashedPassword = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
        // Update user document with the new hashed password
        const updatedUser = yield User.findByIdAndUpdate(user._id, { password: hashedPassword }, { new: true });
        // Omit the password field from the response
        const _b = updatedUser._doc, { password } = _b, info = __rest(_b, ["password"]);
        // Respond with the updated user information
        res.status(200).json(Object.assign({}, info));
    }
    catch (err) {
        console.error(err);
        res.status(500).json("Internal Server Error");
    }
}));
module.exports = router;
