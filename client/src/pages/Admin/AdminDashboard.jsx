import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

const [isMobile, setIsMobile] = useState(
  window.innerWidth < 768
);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);

  const [notificationTitle, setNotificationTitle] = useState("");
const [notificationBody, setNotificationBody] = useState("");
  const [active, setActive] = useState("dashboard");

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [courses, setCourses] = useState([]);

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [videoTitle, setVideoTitle] = useState("");
const [videoUrl, setVideoUrl] = useState("");
const [selectedCourse, setSelectedCourse] = useState("");

const [editVideoMode, setEditVideoMode] = useState(false);
const [editVideoIndex, setEditVideoIndex] = useState(null);
const [editVideoCourseId, setEditVideoCourseId] = useState(null);

const [stats, setStats] = useState({
  users: 0,
  courses: 0,
  totalPurchases: 0,
  totalRevenue: 0,
});
const cardStyle = {
  background: "#1e293b",
  padding: "25px",
  borderRadius: "15px",
  textAlign: "center",
};

const handleAddVideo = async () => {
  if (!selectedCourse) return alert("Select course");

  // validate YouTube link
  if (!videoUrl.includes("youtube") && !videoUrl.includes("youtu.be")) {
    return alert("Enter valid YouTube link");
  }

  //  convert all formats → embed
  const convertToEmbed = (url) => {
    if (url.includes("embed")) return url;

    let videoId = "";

    // normal youtube link
    if (url.includes("v=")) {
      videoId = url.split("v=")[1]?.split("&")[0];
    }

    // share link 
    else if (url.includes("youtu.be")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    }

    return `https://www.youtube.com/embed/${videoId}`;
  };

  await fetch(`https://edunova-web-backend.onrender.com/api/courses/add-video/${selectedCourse}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: videoTitle,
      videoUrl: convertToEmbed(videoUrl)
    })
  });

  alert("Video Added 🎥");

  setVideoTitle("");
  setVideoUrl("");
};

  //  FETCH COURSES
  useEffect(() => {
    fetch("https://edunova-web-backend.onrender.com/api/courses")
      .then(res => res.json())
      .then(data => setCourses(data));
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };
  

  // ADD COURSE
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", imageFile);

    await fetch("https://edunova-web-backend.onrender.com/api/courses/add", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });

    alert("Course Added 🚀");
    window.location.reload();
  };
// Delete Video
  const handleDeleteVideo = async (courseId, index) => {
    
  await fetch(`https://edunova-web-backend.onrender.com/api/courses/delete-video/${courseId}/${index}`, {
    method: "DELETE"
  });

  alert("Video Deleted ❌");
  window.location.reload();
};

// Add Video
const handleEditVideo = (courseId, video, index) => {
  setActive("addVideo");

  setVideoTitle(video.title);
  setVideoUrl(video.videoUrl);
  setSelectedCourse(courseId);

  setEditVideoMode(true);
  setEditVideoIndex(index);
  setEditVideoCourseId(courseId);
};
// Update Video
const handleUpdateVideo = async () => {
  await fetch(`https://edunova-web-backend.onrender.com/api/courses/update-video/${editVideoCourseId}/${editVideoIndex}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: videoTitle,
      videoUrl: videoUrl
    })
  });

  alert("Video Updated 🔥");

  setEditVideoMode(false);
  window.location.reload();
};

// DELETE USER
const deleteUser = async (id) => {
  const res = await fetch(
    `https://edunova-web-backend.onrender.com/api/auth/delete-user/${id}`,
    {
      method: "DELETE",
    }
  );

  const data = await res.json();

  alert(data.message);

  setUsers(users.filter((u) => u._id !== id));
};
  
  

  //  EDIT CLICK
  const handleEdit = (course) => {
    setActive("addCourse");
    setEditMode(true);
    setEditId(course._id);

    setTitle(course.title);
    setPrice(course.price);
    setDescription(course.description);
  };
  

  //  UPDATE COURSE
  const handleUpdate = async () => {
  const formData = new FormData();

  formData.append("title", title);
  formData.append("price", price);
  formData.append("description", description);

  if (imageFile) {
    formData.append("image", imageFile);
  }

  await fetch(`https://edunova-web-backend.onrender.com/api/courses/${editId}`, {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  alert("Updated 🔥");
  window.location.reload();
};

// delete course fetch
const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Delete this course? ❌");

  if (!confirmDelete) return;

  await fetch(`https://edunova-web-backend.onrender.com/api/courses/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  alert("Deleted 🗑️");

  // UI refresh without reload
  setCourses(courses.filter(c => c._id !== id));
};

// Notification Fetch Section
const sendNotification = async () => {
  const res = await fetch(
    "https://edunova-web-backend.onrender.com/api/auth/send-notification",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: notificationTitle,
        body: notificationBody,
      }),
    }
  );

  const data = await res.json();

  alert(data.message);

  setNotificationTitle("");
  setNotificationBody("");
};

// fetch all users (for admin dashboard)
fetch("https://edunova-web-backend.onrender.com/api/auth/users-with-courses")
  .then((res) => res.json())
  .then((data) => setUsers(data));

  fetch("https://edunova-web-backend.onrender.com/api/auth/dashboard-stats")
  .then((res) => res.json())
  .then((data) => setStats(data));

  return (
    <div style={{
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      height: "100vh",
      background: "linear-gradient(135deg, #0f172a, #020617)",
      color: "#e2e8f0"
    }}>

      {/* Sidebar */}
      <div style={{
        width: isMobile ? "100%" : "250px",
        padding: "25px",
        background: "#020617",
        borderRight: "1px solid #1e293b"
      }}>
        <h2 style={{ marginBottom: "40px" }}>⚡ EduNova</h2>

        <div onClick={() => setActive("dashboard")} style={menu(active === "dashboard")}>
          Dashboard
        </div>
        <div
  onClick={() => setActive("users")}
  style={menu(active === "users")}
>
  Users
</div>

        <div onClick={() => setActive("addCourse")} style={menu(active === "addCourse")}>
          Add Course
        </div>

        <div onClick={() => setActive("editCourses")} style={menu(active === "editCourses")}>
          Edit Courses
        </div>
        <div
          onClick={() => setActive("addVideo")}
          style={menu(false)}
            >
              Add Video
        </div>
        <div
  onClick={() => setActive("editVideos")}
  style={menu(active === "editVideos")}
>
  Edit Videos
</div>

      <div
         onClick={() => setActive("notifications")}
        style={menu(active === "notifications")}
      >
        Notifications
      </div>
 </div>




      {/* Content */}
      <div style={{ flex: 1, padding: "40px" }}>

        <h1 style={{ marginBottom: "20px" }}>
          {active === "dashboard" && "Dashboard"}
          {active === "addCourse" && (editMode ? "Update Course" : "Create Course")}
          {active === "editCourses" && "Edit Courses"}
          {active === "addVideo" && "Add Video"}
          {active === "editVideos" && "Edit Videos"}
          {active === "notifications" && "Send Notifications"}
          {active === "users" && "Users"}
        </h1>

        {/* Dashboard */}
        {active === "dashboard" && (
  <div>
    {/* <h1
      style={{
        textAlign: "center",
        fontSize: "60px",
        marginBottom: "30px",
      }}
    >
      Dashboard
    </h1> */}

    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile
          ? "1fr"
          : "repeat(4, 1fr)",
        gap: "20px",
      }}
    >
      <div style={card}>
        <p style={{ fontSize: "18px" }}>👥 Users</p>
        <h1>{stats.users}</h1>
      </div>

      <div style={card}>
        <p style={{ fontSize: "18px" }}>📚 Courses</p>
        <h1>{stats.courses}</h1>
      </div>

      <div style={card}>
        <p style={{ fontSize: "18px" }}>🛒 Purchases</p>
        <h1>{stats.totalPurchases}</h1>
      </div>

      <div style={card}>
        <p style={{ fontSize: "18px" }}>💰 Revenue</p>
        <h1>₹{stats.totalRevenue}</h1>
      </div>
    </div>
  </div>
)}
        {/* Users */}
        {active === "users" && (
          <div
    style={{
      maxWidth: "1300px",
      margin: "40px auto",
      color: "white",
    }}
  >
    {/* Header */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile
        ? "1fr"
        : "1fr 2fr 1fr 2fr 1fr 120px",
        padding: "15px 20px",
        background: "#0f172a",
        borderRadius: "12px",
        marginBottom: "15px",
        fontWeight: "bold",
        color: "#38bdf8",
      }}
    >
      <div>Name</div>
      <div>Email</div>
      <div>Joined</div>
      <div>Purchased Courses</div>
      <div>Total</div>
      <div>Action</div>
    </div>

    {users.map((user) => (
      <div
        key={user._id}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr 1fr 2fr 120px 120px",
          alignItems: "center",
          background: "#1e293b",
          padding: "18px 20px",
          borderRadius: "12px",
          marginBottom: "12px",
        }}
      >
        <div>
          <strong>{user.name}</strong>
        </div>

        <div>{user.email}</div>

        <div>
          {user.createdAt
            ? new Date(user.createdAt).toLocaleDateString()
            : "Old User"}
        </div>

        <div
          style={{
            color: "#94a3b8",
            fontSize: "14px",
          }}
        >
          {user.purchasedCourses?.length > 0
            ? user.purchasedCourses.join(", ")
            : "No Course"}
        </div>

        <div>
          <span
            style={{
              background: "#22c55e",
              padding: "6px 12px",
              borderRadius: "20px",
              fontWeight: "bold",
            }}
          >
            {user.totalPurchases || 0}
          </span>
        </div>

        <button
          onClick={() => deleteUser(user._id)}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    ))}
          </div>
        )}

        {/* Edit Courses */}
        {active === "editCourses" && (
          <div>
            {courses.map((course) => (
  <div
    key={course._id}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "20px",
      background: "rgba(30, 41, 59, 0.6)",
      backdropFilter: "blur(10px)",
      padding: "15px",
      borderRadius: "14px",
      marginBottom: "15px",
      boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
      transition: "0.3s"
    }}
  >

    {/* IMAGE */}
    <img
      src={`https://edunova-web-backend.onrender.com/uploads/${course.image}`}
      alt="course"
      style={{
        width: "120px",
        height: "80px",
        objectFit: "cover",
        borderRadius: "10px"
      }}
    />

    {/*  DETAILS */}
    <div style={{ flex: 1 }}>
      <h3 style={{ margin: 0 }}>{course.title}</h3>
      <p style={{ margin: "5px 0", color: "#94a3b8" }}>
        ₹{course.price}
      </p>
    </div>

    {/*  BUTTON */}
    <button
      onClick={() => handleEdit(course)}
      style={{
        padding: "8px 14px",
        background: "linear-gradient(135deg, #f59e0b, #f97316)",
        border: "none",
        borderRadius: "8px",
        color: "white",
        cursor: "pointer",
        fontWeight: "600"
      }}
    >
      Edit
    </button>
    <button
    onClick={() => handleDelete(course._id)}
    style={{
      padding: "8px 14px",
      background: "#ef4444",
      border: "none",
      borderRadius: "8px",
      color: "white",
      cursor: "pointer",
      fontWeight: "600"
    }}
  >
    Delete
  </button>

  </div>
  
))}
          </div>
        )}

        {/* Add / Edit Course */}
        {active === "addCourse" && (
          <div style={formCard}>

            <input type="file" onChange={handleImage} style={input} />

            {preview && (
              <img
                src={preview}
                alt="preview"
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "10px"
                }}
              />
            )}

            <input
              placeholder="Title"
              style={input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              placeholder="Price"
              style={input}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <textarea
              placeholder="Description"
              style={{ ...input, height: "80px" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button
              onClick={editMode ? handleUpdate : handleSubmit}
              style={button}
            >
              {editMode ? "Update Course" : "Add Course"}
            </button>
            
            

          </div>
        )}

        {/* add video */}
        {active === "addVideo" && (
  <div style={formCard}>

    <h2>Add Video</h2>

    <select
      style={input}
      onChange={(e) => setSelectedCourse(e.target.value)}
    >
      <option>Select Course</option>

      {courses.map((course) => (
        <option key={course._id} value={course._id}>
          {course.title}
        </option>
      ))}
    </select>

    <input
      placeholder="Video Title"
      style={input}
      value={videoTitle}
      onChange={(e) => setVideoTitle(e.target.value)}
    />

    <input
      placeholder="YouTube Embed Link"
      style={input}
      value={videoUrl}
      onChange={(e) => setVideoUrl(e.target.value)}
    />

    <button
  onClick={editVideoMode ? handleUpdateVideo : handleAddVideo}
  style={button}
>
  {editVideoMode ? "Update Video" : "Add Video 🎥"}
</button>

  </div>
        )}

        {/* Edit Videos */}
        {active === "editVideos" && (
  <div>

    {courses.map((course) => (
      <div
        key={course._id}
        style={{
          background: "#1e293b",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "15px"
        }}
      >

        <h3>{course.title}</h3>

        {course.videos?.length === 0 ? (
          <p>No videos</p>
        ) : (
          course.videos.map((video, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "10px",
                background: "#020617",
                padding: "10px",
                borderRadius: "8px"
              }}
            >

              <p style={{ margin: 0 }}>{video.title}</p>
              <button
  onClick={() => handleEditVideo(course._id, video, index)}
  style={{
    padding: "5px 10px",
    background: "#3b82f6",
    border: "none",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer",
    marginRight: "8px"
  }}
>
  Edit
</button>

              <button
                onClick={() => handleDeleteVideo(course._id, index)}
                
                style={{
                  padding: "5px 10px",
                  background: "#ef4444",
                  border: "none",
                  borderRadius: "5px",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>
              

            </div>
          ))
        )}

      </div>
    ))}

  </div>
        )}

        {/* notifications */}
        {active === "notifications" && (
  <div style={formCard}>
    <input
      placeholder="Notification Title"
      style={input}
      value={notificationTitle}
      onChange={(e) => setNotificationTitle(e.target.value)}
    />

    <textarea
      placeholder="Notification Message"
      style={{ ...input, height: "100px" }}
      value={notificationBody}
      onChange={(e) => setNotificationBody(e.target.value)}
    />

    <button
      onClick={sendNotification}
      style={button}
    >
      Send Notification 🚀
    </button>
  </div>
        )}
        

      </div>
    </div>
  );
};

const menu = (active) => ({
  padding: "10px",
  marginBottom: "10px",
  cursor: "pointer",
  borderRadius: "8px",
  background: active ? "#1e293b" : "transparent"
});

const card = {
  padding: "20px",
  background: "#1e293b",
  borderRadius: "10px",
  width: "200px"
};

const formCard = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "10px",
  width: "400px"
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "none"
};

const button = {
  width: "100%",
  padding: "10px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

export default AdminDashboard;