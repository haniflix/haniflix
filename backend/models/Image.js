const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    filename: String,
    mimetype: String,
    size: Number,
  },
  { timestamps: true }
);

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
