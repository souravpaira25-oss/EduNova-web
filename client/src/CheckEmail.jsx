export default function CheckEmail() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">
          📧 Check Your Email
        </h1>

        <p className="text-slate-300">
          We've sent a verification link to your email.
          Please verify your account before logging in.
        </p>
      </div>
    </div>
  );
}