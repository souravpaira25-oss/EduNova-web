import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
const { token } = useParams();
const navigate = useNavigate();

const [password, setPassword] = useState("");
const [message, setMessage] = useState("");
const [loading, setLoading] = useState(false);

const handleResetPassword = async () => {
setLoading(true);

const res = await fetch(
 `https://edunova-web-backend.onrender.com/api/auth/reset-password/${token}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  }
);

const data = await res.text();

setMessage(data);
setLoading(false);

if (res.ok) {
  setTimeout(() => {
    navigate("/login");
  }, 2000);
}

};

return ( <div className="min-h-screen bg-black flex items-center justify-center px-4"> <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">

    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-white">
        Reset Password 🔐
      </h1>

      <p className="text-slate-400 mt-3 text-sm">
        Enter your new password below.
      </p>
    </div>

    <div className="space-y-5">

      <input
        type="password"
        placeholder="Enter New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-cyan-500"
      />

      <button
        onClick={handleResetPassword}
        disabled={loading}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:scale-[1.02] transition disabled:opacity-60"
      >
        {loading ? "Updating..." : "Reset Password"}
      </button>

      {message && (
        <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm text-center">
          ✅ {message}
        </div>
      )}

    </div>

    <p className="text-center text-slate-400 text-sm mt-6">
      Back to{" "}
      <a
        href="/login"
        className="text-cyan-400 hover:text-cyan-300"
      >
        Login
      </a>
    </p>

  </div>
</div>
);
}
