const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  bookTitle: {
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

  message: {
    type: String,
  },

  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },

  requestedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("BookRequest", requestSchema);
