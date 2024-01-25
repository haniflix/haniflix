const mongoose = require("mongoose");
const ListSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String },
    genre: { type: String },
    content: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    adminList: { type: Boolean, default: false },
}, { timestamps: true });
module.exports = mongoose.model("List", ListSchema);
