const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  userId: String,
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course" // 🔥 IMPORTANT
  },
  paymentId: String,
});

module.exports = mongoose.model("Purchase", purchaseSchema);