const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  contentTitle: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  /* which premium note */
  premiumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PremiumContent",
    required: true,
  },

  /* which user purchased */
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  /* payment verification */
  status: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
  },

  paymentId: {
    type: String,
    default: "",
  },

  paidAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
