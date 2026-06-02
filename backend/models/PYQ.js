const mongoose = require("mongoose");

const pyqSchema = new mongoose.Schema({
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

  year: {
    type: String,
    required: true,
  },

  file: {
    type: String,
    required: true,
  },

  downloads: {
    type: Number,
    default: 0,
  },

  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PYQ", pyqSchema);
