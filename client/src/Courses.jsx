import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [purchased, setPurchased] = useState([]);
  const navigate = useNavigate();

  const handleBuy = async (course) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first ");
      navigate("/login");
      return;
    }

    const res = await fetch("https://edunova-web-backend.onrender.com/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: course.price
      })
    });

    const data = await res.json();

    const options = {
      key: "rzp_test_SXNRwPXky3XP5X",
      amount: data.amount,
      currency: "INR",
      name: "EduNova",
      description: course.title,
      order_id: data.id,

      handler: async function (response) {

        await fetch("https://edunova-web-backend.onrender.com/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            courseId: course._id,
          }),
        });

        alert("Payment Successful ✅");
        window.location.href = "/courses";
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  useEffect(() => {
    //  All Courses
    fetch("https://edunova-web-backend.onrender.com/api/courses")
  .then((res) => res.json())
  .then((data) => {
    console.log("API DATA =", data);
    setCourses(data);
  });

    //  Purchased Courses
    const token = localStorage.getItem("token");

    if (token) {
      fetch("https://edunova-web-backend.onrender.com/api/purchase/my-courses", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(" PURCHASED DATA:", data);

          const ids = data.map(item => item.courseId?._id?.toString());
      setPurchased(ids);
        });
    }

  }, []);

  return (
    <div>
      <Navbar />

      <div style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        color: "white",
        padding: "30px"
      }}>

        <h1 style={{
          fontSize: "32px",
          marginBottom: "30px",
          textAlign: "center",
          color: "#f8fafc"
        }}>
          Explore Courses 
        </h1>

        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "15px",
            marginTop: "50px"
          }}>

          {courses.map((course) => {
            // const isPurchased = purchased.includes(course._id.toString());

            return (
              <div
                key={course._id}
                style={{
                  width: "100%",
                  minwidth: "0",
                  background: "#1e293b",
                  borderRadius: "12px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column"
                }}
              >


                {/* IMAGE */}
                <img
                  src={course.image}
                  alt="course"
                  style={{
                    width: "100%",
                    height: "120px",
                    objectFit: "cover"
                  }}
                />

                {/* CONTENT */}
                <div style={{
                  padding: "15px",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  justifyContent: "space-between"
                }}>

                  <div>
                    <h3>{course.title}</h3>
                    <p style={{ color: "#94a3b8", fontSize: "14px", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {course.description}
                    </p>
                  </div>

                  <div>
                    <h4>₹{course.price}</h4>

                    <div style={{ display: "flex", gap: "10px" }}>

                      {/* Explore */}
                      <button
                        onClick={() => navigate(`/course/${course._id}`)}
                        style={{
                          flex: 1,
                          padding: "10px",
                          background: "#3b82f6",
                          border: "none",
                          borderRadius: "8px",
                          color: "white",
                          cursor: "pointer"
                        }}
                      >
                        Explore
                      </button>

                      {/*  CONDITIONAL BUTTON */}
                      {purchased.includes(course._id) ? (
                    <button
                      onClick={() => navigate(`/course/${course._id}`)}
                      style={{
                        flex: 1,
                        padding: "10px",
                        background: "#3b82f6",
                        border: "none",
                        borderRadius: "8px",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "600"
                      }}
                      >
                        Open Course
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBuy(course)}
                        style={{
                          flex: 1,
                          padding: "10px",
                          background: "#22c55e",
                          border: "none",
                          borderRadius: "8px",
                          color: "white",
                          cursor: "pointer",
                          fontWeight: "600"
                        }}
                      >
                        Buy
                      </button>
                    )}

                    </div>
                  </div>

                </div>

              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}

export default Courses;