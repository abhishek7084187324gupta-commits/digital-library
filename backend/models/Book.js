const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  author: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  semester: {
    type: String,
    default: "",
  },

  subject: {
    type: String,
    default: "",
  },

  description: {
    type: String,
    default: "",
  },

  /* PDF file */
  file: {
    type: String,
    required: true,
  },

  /* Cover thumbnail image */
  coverImage: {
    type: String,
    default: "",
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

module.exports = mongoose.model("Book", bookSchema);
