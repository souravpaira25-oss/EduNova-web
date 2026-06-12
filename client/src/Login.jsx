import { useState, useEffect } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { requestNotificationPermission } from "./utils/notification";

function Login() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false); 

  const fullText = "Learn. Build. Get Hired 🚀";

  //  Typing Effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 80);

    return () => clearInterval(interval);
  }, []);

  //  UPDATED LOGIN FUNCTION
  const handleLogin = async () => {
    setLoading(true); // start loading

    try {
      const res = await fetch("https://edunova-web-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          rememberMe,
          })
      });

      const data = await res.json();

      if (data.token) {
  console.log("LOGIN SUCCESS");
  console.log("USER ID:", data.userId);

  localStorage.setItem("token", data.token);

  const fcmToken = await requestNotificationPermission();

  console.log("FCM TOKEN:", fcmToken);

  console.log("CALLING SAVE TOKEN API");

  const saveRes = await fetch(
    "https://edunova-web-backend.onrender.com/api/auth/save-fcm-token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: data.userId,
        fcmToken,
      }),
    }
  );

  const saveData = await saveRes.json();

  console.log("SAVE RESPONSE:", saveData);

  window.location.href = "/";
} else {
  alert(data.message || "Login failed ❌");
}

    } catch (error) {
      console.log(error);
      alert("Server error ⚠️");
    }

    setLoading(false); // stop loading
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

      {/*  PARTICLES */}
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

      {/* GLOW BLOBS */}
      <div style={{
        position: "absolute",
        width: "300px",
        height: "300px",
        background: "#3b82f6",
        filter: "blur(120px)",
        top: "10%",
        left: "20%",
        animation: "float 6s infinite ease-in-out"
      }}></div>

      <div style={{
        position: "absolute",
        width: "250px",
        height: "250px",
        background: "#22c55e",
        filter: "blur(120px)",
        bottom: "10%",
        right: "20%",
        animation: "float 8s infinite ease-in-out"
      }}></div>

      {/*  LOGIN BOX */}
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

        <p style={{ color: "#22c55e", marginBottom: "10px" }}>
          {text}
        </p>

        <h2 style={{
          marginBottom: "30px",
          fontSize: "32px",
          fontWeight: "bold"
        }}>
          Welcome Back 🚀
        </h2>

        {/* EMAIL */}
        <div style={{
          display: "flex",
          alignItems: "center",
          background: "#0f172a",
          padding: "12px",
          borderRadius: "10px",
          marginBottom: "20px"
        }}>
          <FaEnvelope style={{ marginRight: "10px" }} />
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "white",
              width: "100%"
            }}
          />
        </div>

        {/* PASSWORD */}
        <div style={{
          display: "flex",
          alignItems: "center",
          background: "#0f172a",
          padding: "12px",
          borderRadius: "10px",
          marginBottom: "25px"
        }}>
          <FaLock style={{ marginRight: "10px" }} />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "white",
              width: "100%"
            }}
          />
        </div>

        <div
  style={{
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    color: "#cbd5e1",
    fontSize: "14px",
  }}
>
  <input
    type="checkbox"
    checked={rememberMe}
    onChange={(e) => setRememberMe(e.target.checked)}
    style={{
      marginRight: "8px",
      cursor: "pointer",
    }}
  />
  <label style={{ cursor: "pointer" }}>
    Remember Me
  </label>
</div>

        {/*  UPDATED BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            background: "linear-gradient(90deg, #22c55e, #3b82f6)",
            border: "none",
            borderRadius: "10px",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* <p
  style={{
    marginTop: "12px",
    textAlign: "right",
    color: "#22c55e",
    cursor: "pointer"
  }}
  onClick={() => window.location.href = "/forgot-password"}
>
  Forgot Password?
</p> */}

        <p style={{ marginTop: "20px", color: "#94a3b8" }}>
          Don’t have an account?{" "}
          <span
            style={{ color: "#22c55e", cursor: "pointer" }}
            onClick={() => window.location.href = "/signup"}
          >
            Sign up
          </span>
        </p>

      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

    </div>
  );
}

export default Login;