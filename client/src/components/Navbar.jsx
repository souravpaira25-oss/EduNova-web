import React from "react";
import { FaBook, FaUser, FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        background: "linear-gradient(90deg, #020617, #0f172a)",
        borderBottom: "1px solid #1e293b",
        boxSizing: "border-box",
        boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
      }}
    >
      {/* LOGO */}
      <h2
        style={{
          margin: 0,
          fontWeight: "bold",
          background: "linear-gradient(90deg, #3b82f6, #22c55e)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        EduNova 🚀
      </h2>

      {/* MENU */}
      <div
        style={{
          display: "flex",
          gap: "25px",
          alignItems: "center",
        }}
      >
        <span
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            color: "#ffffff",
            cursor: "pointer",
          }}
        >
          <FaBook /> Home
        </span>

        <span
          onClick={() => navigate("/courses")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            color: "#ffffff",
            cursor: "pointer",
          }}
        >
          <FaBook /> Courses
        </span>

        <span
          onClick={() => navigate("/my-courses")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            color: "#ffffff",
            cursor: "pointer",
          }}
        >
          <FaUser /> My Courses
        </span>

        {localStorage.getItem("token") ? (
          <span
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
              padding: "6px 10px",
              borderRadius: "6px",
              backgroundColor: "#ef4444",
              color: "#ffffff",
            }}
          >
            <FaSignInAlt /> Logout
          </span>
        ) : (
          <span
            onClick={() => navigate("/login")}
            style={{
              display: "flex",
              color: "#ffffff",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
              padding: "6px 10px",
              borderRadius: "6px",
              backgroundColor: "#22c55e",
            }}
          >
            <FaSignInAlt /> Login
          </span>
        )}
      </div>
    </div>
  );
};

export default Navbar;