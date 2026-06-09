const mongoose = require("mongoose");

const CONNECTION_STATUSES = ["pending", "accepted", "rejected"];

const connectionSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    status: {
      type: String,
      enum: CONNECTION_STATUSES,
      default: "pending"
    }
  },
  { timestamps: true }
);

connectionSchema.index({ sender: 1, receiver: 1 }, { unique: true });

module.exports = mongoose.model("Connection", connectionSchema);
module.exports.CONNECTION_STATUSES = CONNECTION_STATUSES;
