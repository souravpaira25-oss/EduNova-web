import React, { useState } from "react";
import React, { useState, useEffect } from "react";
import { FaBook, FaUser, FaSignInAlt, FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 20);
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 15px",
        background: "linear-gradient(90deg, #020617, #0f172a)",
        background: scrolled
          ? "rgba(2, 6, 23, 0.95)"
          : "rgba(2, 6, 23, 0.75)",
              
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
              
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid transparent",
              
        boxShadow: scrolled
          ? "0 8px 30px rgba(0,0,0,0.4)"
          : "none",
              
        transition: "all 0.3s ease",
              
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        zIndex: "9999",
      }}
    >
      {/* LOGO */}
      <h2
        style={{
          margin: 0,
          fontSize: "22px",
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

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        <span
          onClick={() => navigate("/")}
          style={{ display: "flex", alignItems: "center", gap: "5px", color: "#fff", cursor: "pointer" }}
        >
          <FaBook /> Home
        </span>

        <span
          onClick={() => navigate("/courses")}
          style={{ display: "flex", alignItems: "center", gap: "5px", color: "#fff", cursor: "pointer" }}
        >
          <FaBook /> Courses
        </span>

        <span
          onClick={() => navigate("/my-courses")}
          style={{ display: "flex", alignItems: "center", gap: "5px", color: "#fff", cursor: "pointer" }}
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
              color: "#fff",
            }}
          >
            <FaSignInAlt /> Logout
          </span>
        ) : (
          <span
            onClick={() => navigate("/login")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
              padding: "6px 10px",
              borderRadius: "6px",
              backgroundColor: "#22c55e",
              color: "#fff",
            }}
          >
            <FaSignInAlt /> Login
          </span>
        )}
      </div>

      {/* Mobile 3 Dots */}
      <div className="md:hidden">
        <FaEllipsisV
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            color: "#fff",
            fontSize: "22px",
            cursor: "pointer",
          }}
        />

        {menuOpen && (
          <div
            style={{
              position: "absolute",
              top: "55px",
              right: "15px",
              background: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: "10px",
              padding: "12px",
              minWidth: "180px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              zIndex: 1000,
            }}
          >
            <span
              onClick={() => {
                navigate("/");
                setMenuOpen(false);
              }}
              style={{ color: "#fff", cursor: "pointer" }}
            >
              Home
            </span>

            <span
              onClick={() => {
                navigate("/courses");
                setMenuOpen(false);
              }}
              style={{ color: "#fff", cursor: "pointer" }}
            >
              Courses
            </span>

            <span
              onClick={() => {
                navigate("/my-courses");
                setMenuOpen(false);
              }}
              style={{ color: "#fff", cursor: "pointer" }}
            >
              My Courses
            </span>

            {localStorage.getItem("token") ? (
              <span
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/");
                  setMenuOpen(false);
                }}
                style={{ color: "#ef4444", cursor: "pointer" }}
              >
                Logout
              </span>
            ) : (
              <span
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
                style={{ color: "#22c55e", cursor: "pointer" }}
              >
                Login
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;