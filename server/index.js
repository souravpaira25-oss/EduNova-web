require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Razorpay = require("razorpay");
const authMiddleware = require("./middleware/authMiddleware");
app.use(express.json());
const purchaseRoutes = require("./routes/purchaseRoutes");
const crypto = require("crypto");
const Purchase = require("./models/Purchase");
app.use("/api/purchase", purchaseRoutes);
const courseRoutes = require("./routes/courseRoutes");
app.use("/api/courses", courseRoutes);
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Server Running ");
});
app.get("/profile", authMiddleware, (req, res) => {
  res.send("Welcome user 🔥 " + req.user.userId);
});
const razorpay = new Razorpay({
  key_id: "rzp_test_SXNRwPXky3XP5X",
  key_secret: "iDMMKp3kUfu6xpG0awlpFXpD"
});



app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "order_rcptid"
    };

    const order = await razorpay.orders.create(options);
    res.json(order);

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Order error" });
  }
});
app.post("/verify-payment", authMiddleware, async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    courseId,
  } = req.body;

  const userId = req.user.userId; // ✅ yaha se lo

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", "iDMMKp3kUfu6xpG0awlpFXpD")
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    await Purchase.create({
      userId,
      courseId: courseId.toString(), // ✅ FIX
      paymentId: razorpay_payment_id,
    });

    res.json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
});
app.get("/check-purchase/:courseId", async (req, res) => {
  const userId = req.user.userId; // auth middleware se

  const purchase = await Purchase.findOne({
    userId: userId,
    courseId: req.params.courseId,
  });

  if (purchase) {
    res.json({ purchased: true });
  } else {
    res.json({ purchased: false });
  }
});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch((err) => console.log(err));

app.listen(5000, () => {
  console.log("Server running on 5000");
});