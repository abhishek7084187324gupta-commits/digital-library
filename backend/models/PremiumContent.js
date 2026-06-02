const mongoose = require("mongoose");

const premiumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  subject: {
    type: String,
    required: true,
  },

  semester: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    default: "",
  },

  /* Full Premium PDF */
  fullFile: {
    type: String,
    required: true,
  },

  /* Preview PDF (1–2 pages only) */
  previewFile: {
    type: String,
    required: true,
  },

  /* Cover Thumbnail Image */
  coverImage: {
    type: String,
    default: "",
  },

  isPaid: {
    type: Boolean,
    default: true,
  },

  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PremiumContent", premiumSchema);
