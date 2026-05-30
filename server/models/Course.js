const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  image: {
    type: String
  },

  createdBy: {
    type: String
  },

  // Course videos 
  videos: [
    {
      title: String,
      videoUrl: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);