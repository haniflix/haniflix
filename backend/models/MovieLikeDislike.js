const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isLike: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MovieLikeDislike", ListSchema);
