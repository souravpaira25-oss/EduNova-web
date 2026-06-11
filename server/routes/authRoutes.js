const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Course = require("../models/Course");
const Purchase = require("../models/Purchase");
const crypto = require("crypto");
const transporter = require("../config/mailer");
const admin = require("../firebaseAdmin");
const { getMessaging } = require("firebase-admin/messaging");



// signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken: null,
      isVerified: true,
    });

    await user.save();

    res.send("Sign up Complete✅");
  } catch (err) {
    console.error("SIGNUP ERROR =>", err);
    res.status(500).send("Server Error");
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

//     if (!user.isVerified) {
//   return res.status(401).json({
//     message: "Please verify your email first"
//   });
// }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Wrong Password" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

   res.json({
  message: "Login successful",
  token,
  userId: user._id,
});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// verify email
router.get("/verify-email/:token", async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      verificationToken: token
    });

    if (!user) {
      return res.status(400).send("Invalid verification token");
    }

    user.isVerified = true;
    user.verificationToken = null;

    await user.save();

    res.redirect("https://edu-nova-web.vercel.app/login");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// forgot password
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    await user.save();

    const resetLink =
      `https://edu-nova-web.vercel.app/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: "souravpaira374@gmail.com",
      to: email,
      subject: "Reset Your EduNova Password",
      html: `
        <h2>Password Reset Request</h2>
        <p>Click below to reset your password:</p>

        <a href="${resetLink}">
          Reset Password
        </a>
      `,
    });

    res.send("Password reset link sent to your email");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// reset password
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
    });

    if (!user) {
      return res.status(400).send("Invalid or expired token");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = null;

    await user.save();

    res.send("Password reset successful ✅");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// ForNotification
router.post("/save-fcm-token", async (req, res) => {
  console.log("SAVE TOKEN API HIT");
  console.log(req.body);
  try {
    const { userId, fcmToken } = req.body;

    await User.findByIdAndUpdate(userId, {
      fcmToken,
    });

    res.json({
      success: true,
      message: "FCM Token Saved",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// send notification
router.post("/send-test-notification", async (req, res) => {

  try {
    // console.log("REQUEST RECEIVED");
    // console.log(req.body)
    const { userId } = req.body;

    const user = await User.findById(userId);

    if (!user || !user.fcmToken) {
      return res.status(404).json({
        success: false,
        message: "FCM token not found",
      });
    }

    await getMessaging().send({
  token: user.fcmToken,
  notification: {
    title: "📚 EduNova",
    body: "Keep your learning streak alive! Visit EduNova today 🚀",
  },
});

    res.json({
      success: true,
      message: "Notification sent successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Notification admin route
router.post("/send-notification", async (req, res) => {
  try {
    const { title, body } = req.body;

    const users = await User.find({
      fcmToken: { $exists: true, $ne: "" }
    });

    for (const user of users) {
      await getMessaging().send({
        token: user.fcmToken,

        notification: {
          title,
          body,
        },

        webpush: {
          notification: {
            icon: "https://edu-nova-web.vercel.app/logo.png",
            image: "https://edu-nova-web.vercel.app/banner.png"
          }
        }
      });
    }

    res.json({
      success: true,
      message: "Notification sent to all users 🚀",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// show all users (for admin)
router.get("/all-users", async (req, res) => {
  try {
    const users = await User.find()
      .select("-password -verificationToken -resetPasswordToken");

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// delete user (for admin)
router.delete("/delete-user/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}); 

// Users with their purchased courses
router.get("/users-with-courses", async (req, res) => {
  try {
    const users = await User.find().select("-password");

    const purchases = await Purchase.find()
      .populate("courseId");

    const result = users.map((user) => {
      const userPurchases = purchases.filter(
        (p) => p.userId === user._id.toString()
      );

      return {
        ...user._doc,

        purchasedCourses: userPurchases
          .filter((p) => p.courseId)
          .map((p) => p.courseId.title),

        totalPurchases: userPurchases.length,
      };
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// dashboard stats
router.get("/dashboard-stats", async (req, res) => {
  try {
    const users = await User.countDocuments();
    const courses = await Course.countDocuments();

    const purchases = await Purchase.find().populate("courseId");

    const totalPurchases = purchases.length;

    const totalRevenue = purchases.reduce((sum, purchase) => {
      return sum + (purchase.courseId?.price || 0);
    }, 0);

    res.json({
      users,
      courses,
      totalPurchases,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
module.exports = router;