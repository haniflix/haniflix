const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String },
    img: { type: String },
    imgTitle: { type: String },
    imgSm: { type: String },
    trailer: { type: String },
    ageRating: { type: String },
    duration: { type: String },
    video: { type: String },
    year: { type: String },
    limit: { type: Number },
    genre: { type: mongoose.Schema.Types.Mixed },
    //
    // Use array of Genre references
    // genre: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }],
    //
    isSeries: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
