const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, defaut: "" },
    isAdmin: { type: Boolean, default: false },
    isSubscribed: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: true },
    otp: { type: String, default: "" },
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: "List" }],
    defaultList: { type: mongoose.Schema.Types.ObjectId, ref: "List" }, // Id of user's default list
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
