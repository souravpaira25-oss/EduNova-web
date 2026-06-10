const express = require("express");
const router = express.Router();
const Purchase = require("../models/Purchase");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");
const Course = require("../models/Course");
const { getMessaging } = require("firebase-admin/messaging");


// Buy Course
router.post("/buy/:courseId", authMiddleware, async (req, res) => {
  try {
    const purchase = new Purchase({
      userId: req.user.userId,
      courseId: req.params.courseId,
    });

    await purchase.save();

    const user = await User.findById(req.user.userId);
    const course = await Course.findById(req.params.courseId);

    if (user?.fcmToken) {
      await getMessaging().send({
        token: user.fcmToken,
        notification: {
          title: "🎉 Purchase Successful",
          body: `${course.title} added to your courses`,
        },
      });
    }

    res.json({ message: "Course purchased successfully 🔥" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get User Purchased Courses
router.get("/my-courses", authMiddleware, async (req, res) => {
  try {
    const purchases = await Purchase.find({ userId: req.user.userId })
      .populate("courseId");

    res.json(purchases);
  } catch (err) {
    res.status(500).json({ msg: "Error" });
  }
});


// Check if user purchased course
router.get("/check/:courseId", authMiddleware, async (req, res) => {
  try {
    const purchase = await Purchase.findOne({
      userId: req.user.userId,
      courseId: req.params.courseId
    });

    if (purchase) {
      res.json({ purchased: true });
    } else {
      res.json({ purchased: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;