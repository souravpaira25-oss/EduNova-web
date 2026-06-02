import { useState } from "react";

export default function ForgotPassword() {
const [email, setEmail] = useState("");
const [message, setMessage] = useState("");
const [loading, setLoading] = useState(false);

const handleForgotPassword = async () => {
  setLoading(true);

  const res = await fetch(
    "https://edunova-web-backend.onrender.com/api/auth/forgot-password",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );

  const data = await res.text();

  setMessage(data);
  setLoading(false);
};

return ( <div className="min-h-screen bg-black flex items-center justify-center px-4"> <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">

Offoo😧
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-white">
        Forgot Password 🔐
      </h1>

      <p className="text-slate-400 mt-3 text-sm">
        Enter your email address and we'll send you a password reset link.
      </p>
    </div>

    <div className="space-y-5">

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-cyan-500"
      />

      <button
  onClick={handleForgotPassword}
  disabled={loading}
  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:scale-[1.02] transition disabled:opacity-60"
>
  {loading ? "Sending..." : "Send Reset Link"}
</button>
{message && (
  <div className="mt-4 p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm text-center">
    📧 {message}
  </div>
)}

    </div>

    <p className="text-center text-slate-400 text-sm mt-6">
      Remember your password?{" "}
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
