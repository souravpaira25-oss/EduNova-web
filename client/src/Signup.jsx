import { useState, useEffect } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Signup() {
   const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [text, setText] = useState("");

  const fullText = "Start Your Journey Today 🚀";

  //  Typing effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 80);

    return () => clearInterval(interval);
  }, []);

  const handleSignup = async () => {
    const res = await fetch("https://edunova-web-backend.onrender.com/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.text();
    alert(data);
    if (res.ok) {
      navigate("/login");
    }
  };

  return (
    <div style={{
      height: "100vh",
      background: "#0f172a",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      overflow: "hidden",
      position: "relative"
    }}>

      {/* PARTICLES */}
      {[...Array(20)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: "4px",
          height: "4px",
          background: "white",
          borderRadius: "50%",
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: 0.3,
          animation: `float ${3 + Math.random() * 5}s infinite ease-in-out`
        }}></div>
      ))}

      {/*  GLOW */}
      <div style={{
        position: "absolute",
        width: "300px",
        height: "300px",
        background: "#22c55e",
        filter: "blur(120px)",
        top: "10%",
        left: "20%",
        animation: "float 6s infinite ease-in-out"
      }}></div>

      <div style={{
        position: "absolute",
        width: "250px",
        height: "250px",
        background: "#3b82f6",
        filter: "blur(120px)",
        bottom: "10%",
        right: "20%",
        animation: "float 8s infinite ease-in-out"
      }}></div>

      {/*  BOX */}
      <div style={{
        background: "rgba(30,41,59,0.7)",
        padding: "50px",
        borderRadius: "20px",
        width: "420px",
        backdropFilter: "blur(15px)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        textAlign: "center",
        zIndex: 2,
        animation: "fadeIn 1s ease"
      }}>

        <p style={{ color: "#3b82f6", marginBottom: "10px" }}>
          {text}
        </p>

        <h2 style={{ marginBottom: "30px", fontSize: "32px" }}>
          Create Account ✨
        </h2>

        {/* NAME */}
        <div style={inputStyle}>
          <FaUser />
          <input placeholder="Enter Name" onChange={(e) => setName(e.target.value)} style={inputField}/>
        </div>

        {/* EMAIL */}
        <div style={inputStyle}>
          <FaEnvelope />
          <input placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} style={inputField}/>
        </div>

        {/* PASSWORD */}
        <div style={inputStyle}>
          <FaLock />
          <input type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} style={inputField}/>
        </div>

        <button onClick={handleSignup} style={{
          width: "100%",
          padding: "14px",
          background: "linear-gradient(90deg, #3b82f6, #22c55e)",
          border: "none",
          borderRadius: "10px",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer"
        }}>
          Sign Up
        </button>

        <p style={{ marginTop: "20px", color: "#94a3b8" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#22c55e", cursor: "pointer" }}
            onClick={() => window.location.href = "/login"}
          >
            Login
          </span>
        </p>

      </div>

      {/*  CSS */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

    </div>
  );
}

const inputStyle = {
  display: "flex",
  alignItems: "center",
  background: "#0f172a",
  padding: "12px",
  borderRadius: "10px",
  marginBottom: "15px",
  gap: "10px"
};

const inputField = {
  background: "transparent",
  border: "none",
  outline: "none",
  color: "white",
  width: "100%"
};

export default Signup;