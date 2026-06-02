const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const crypto = require("crypto");
const transporter = require("../config/mailer");



// signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  
  const existingUser = await User.findOne({ email });

if (existingUser) {
  return res.status(400).send("Email already registered");
}

  const hashedPassword = await bcrypt.hash(password, 10);

const verificationToken = crypto.randomBytes(32).toString("hex");

const verificationLink = `https://edunova-web-backend.onrender.com/api/auth/verify-email/${verificationToken}`;

const user = new User({
  name,
  email,
  password: hashedPassword,
  verificationToken,
  isVerified: false
});
  await user.save();

await transporter.sendMail({
  from: "souravpaira374@gmail.com",
  to: email,
  subject: "Verify your EduNova account",
  html: `
    <h2>Welcome to EduNova 🚀</h2>
    <p>Click below to verify your account:</p>

    <a href="${verificationLink}">
      Verify Email
    </a>
  `,
});

  res.send("Sign up Complete✅");
});

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isVerified) {
  return res.status(401).json({
    message: "Please verify your email first"
  });
}

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

module.exports = router;