const mongoose = require("mongoose");

const AvatarSchema = new mongoose.Schema(
  {
    filename: String,
    mimetype: String,
    size: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Avatar", AvatarSchema);
