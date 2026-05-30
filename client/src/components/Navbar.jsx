import React from "react";
import { FaBook, FaUser, FaSignInAlt } from "react-icons/fa"; 

const Navbar = () => {
  return (
    <div style={{
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 40px",
      background: "linear-gradient(90deg, #020617, #0f172a)",
      borderBottom: "1px solid #1e293b",
      boxSizing: "border-box",
      boxShadow: "0 2px 10px rgba(0,0,0,0.5)"
    }}>

      {/* LOGO */}
      <h2 style={{
        margin: 0,
        fontWeight: "bold",
        background: "linear-gradient(90deg, #3b82f6, #22c55e)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
      }}>
        EduNova 🚀
      </h2>
      

      {/* MENU */}  
      <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
        <span
          onClick={() => window.location.href = "/"} 
          style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "5px", 
            color: "#ffffff", 
            cursor: "pointer,"
           }}
        >
          <FaBook /> Home
        </span>
        
        <span
          onClick={() => window.location.href = "/courses"} 
          style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "5px", 
            color: "#ffffff", 
            cursor: "pointer,"
           }}
        >
          <FaBook /> Courses
        </span>

        <span
          onClick={() => window.location.href = "/my-courses"}
          style={{
             display: "flex", 
             alignItems: "center", 
             gap: "5px", 
             color: "#ffffff", 
             cursor: "pointer"
             }}
        >
          <FaUser /> My Courses
        </span>

        {localStorage.getItem("token") ? (
          <span
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
              padding: "6px 10px",
              borderRadius: "6px",
              backgroundColor: "#ef4444"
            }}
          >
            <FaSignInAlt /> Logout
          </span>
        ) : (
          <span
            onClick={() => window.location.href = "/login"}
            style={{
              display: "flex",
              color: "#ffffff",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
              padding: "6px 10px",
              borderRadius: "6px",
              backgroundColor: "#22c55e"
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