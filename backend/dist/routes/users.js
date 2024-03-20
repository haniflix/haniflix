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
const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");
//CREATE
router.post("/", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (req.user.isAdmin) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
        }
        const newUser = new User(req.body);
        try {
            const savedUser = yield newUser.save();
            res.status(201).json(savedUser);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("You are not allowed!");
    }
}));
//UPDATE
router.put("/:id", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
        }
        try {
            const updatedUser = yield User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });
            res.status(200).json(updatedUser);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("You can update only your account!");
    }
}));
//DELETE
router.delete("/:id", verify, (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            yield User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted...");
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("You can delete only your account!");
    }
}));
//GET
router.get("/find/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = yield User.findById(req.params.id);
        const _a = user._doc, { password } = _a, info = __rest(_a, ["password"]);
        res.status(200).json(info);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
//GET ALL
router.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const query = req.query.new;
    //if(req.user.isAdmin) {
    try {
        const users = query
            ? yield User.find().sort({ _id: -1 }).limit(5)
            : yield User.find();
        res.status(200).json(users);
    }
    catch (err) {
        //-- throws a 'headers_already_sent' error
        //res.status(500).json(err);
    }
    /*} else {
        res.status(403).json("You are not allowed to see all users!");
    }*/
}));
//GET USER STATS
router.get("/stats", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const today = new Date();
    const latYear = today.setFullYear(today.setFullYear() - 1);
    try {
        const data = yield User.aggregate([
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
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// UPDATE USER DETAILS
router.put("/updateUserDetails/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (req.body.id === req.params.id) {
        try {
            // Update user details, excluding password
            const updatedUser = yield User.findByIdAndUpdate(req.params.id, {
                $set: {
                    fullname: req.body.name,
                    username: req.body.email,
                    email: req.body.email,
                },
            }, { new: true });
            const _b = updatedUser._doc, { password } = _b, info = __rest(_b, ["password"]);
            res.status(200).json(info);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("You can update only your account!");
    }
}));
// UPDATE PASSWORD
router.put("/updatePassword/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (req.user.id === req.params.id) {
        try {
            // Encrypt new password
            const encryptedPassword = CryptoJS.AES.encrypt(req.body.newPassword, process.env.SECRET_KEY).toString();
            // Update user password
            yield User.findByIdAndUpdate(req.params.id, {
                $set: {
                    password: encryptedPassword,
                },
            }, { new: true });
            res.status(200).json("Password updated successfully");
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("You can update only your account!");
    }
}));
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
