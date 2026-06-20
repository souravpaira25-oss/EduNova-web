const express = require("express");
const multer = require("multer");
const router = express.Router();
const Course = require("../models/Course");
const authMiddleware = require("../middleware/authMiddleware");
const Purchase = require("../models/Purchase");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "edunova",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

// Add Course
router.post("/add", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const image = req.file ? req.file.path : "";

    const course = new Course({
      title,
      description,
      price,
      image,
      createdBy: req.user.userId
    });

    await course.save();

    res.json({ message: "Course added successfully 🔥", course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  Get All Courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Course Content for a User
router.get("/:id/content", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const courseId = req.params.id;

    console.log("USER:", userId);
    console.log("COURSE:", courseId);

    //  PURCHASE CHECK
    const purchase = await Purchase.findOne({
      userId: userId,
      courseId: courseId.toString(),
    });

    if (!purchase) {
      return res.status(403).json({ message: "Not purchased" });
    }

    const course = await Course.findById(courseId);

    res.json(course.videos);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

//  Get Single Course
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Update Course
router.put("/:id", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { title, price, description } = req.body;

    let updateData = {
      title,
      price,
      description
    };

    // image update
    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  COURSE DELETE
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted 🗑️" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add video to course
router.post("/add-video/:courseId", async (req, res) => {
  try {
    const { title, videoUrl } = req.body;

    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.videos.push({ title, videoUrl });

    await course.save();

    res.json({ message: "Video added 🔥", course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete video from course
router.delete("/delete-video/:courseId/:videoIndex", async (req, res) => {
  const { courseId, videoIndex } = req.params;

  try {
    const course = await Course.findById(courseId);

    if (!course) return res.status(404).json({ msg: "Course not found" });

    course.videos.splice(videoIndex, 1);

    await course.save();

    res.json({ msg: "Video deleted successfully" });

  } catch (err) {
    res.status(500).json({ msg: "Error deleting video" });
  }
});

// Update video in course
router.put("/update-video/:courseId/:index", async (req, res) => {
  const { courseId, index } = req.params;
  const { title, videoUrl } = req.body;

  try {
    const course = await Course.findById(courseId);

    course.videos[index] = { title, videoUrl };

    await course.save();

    res.json({ msg: "Video updated" });
  } catch (err) {
    res.status(500).json({ msg: "Error updating video" });
  }
});

module.exports = router;