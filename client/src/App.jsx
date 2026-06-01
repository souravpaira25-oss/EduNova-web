import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FaBook, FaUser, FaSignInAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import ProtectedRoute from "./ProtectedRoute";
import MyCourses from "./MyCourses";
import Courses from "./Courses";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CoursePage from "./CoursePage";
import Navbar from "./components/Navbar";

function App() {
  const [ setCourses] = useState([]);

  useEffect(() => {
    fetch("https://edunova-web-backend.onrender.com/api/courses")
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error("Error fetching courses:", err));
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    });
    elements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/course/:id" element={<CoursePage />} />
        
        <Route
          path="/my-courses"
          element={
            <ProtectedRoute>
              <MyCourses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={
            <div style={{ minHeight: "100vh", backgroundColor: "#0f172a", color: "white" }}>
      <Navbar />

              
              {/* NAVBAR */}
              

              {/* HERO SECTION */}
<div className="relative min-h-screen overflow-x-hidden overflow-y-hidden bg-[#030712] text-white">
                <div className="absolute top-[-120px] left-[-100px] w-[350px] h-[350px] bg-cyan-500/20 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-150px] right-[-100px] w-[350px] h-[350px] bg-purple-500/20 blur-[120px] rounded-full"></div>
                <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:60px_60px]"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 lg:py-24 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
                  <div className="max-w-2xl text-center lg:text-left">
                    <div className="inline-flex items-center gap-3 bg-slate-900/80 border border-cyan-500/20 backdrop-blur-xl px-5 py-3 rounded-full mb-8">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-slate-300 tracking-wide">Trusted by 10,000+ learners</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[1] tracking-tight">
                      Learn<br />
                      <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 bg-clip-text text-transparent">
                        Future Skills
                      </span>
                    </h1>

                    <p className="mt-6 lg:mt-10 text-slate-400 text-base sm:text-lg lg:text-xl leading-7 lg:leading-9 max-w-xl mx-auto lg:mx-0">
                      Learn coding, AI, development, and job-ready skills with modern premium learning experiences.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-10">
                      <button
                        className="w-full sm:w-auto px-8 py-4 lg:py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-base lg:text-lg shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:scale-105 transition-all duration-300"
                        onClick={() => window.location.href = "/courses"}
                      >
                        🚀 Explore Courses
                      </button>

                      <button
                        className="w-full sm:w-auto px-8 py-4 lg:py-5 rounded-2xl border border-slate-700 bg-slate-900/70 backdrop-blur-xl text-white font-semibold text-base lg:text-lg hover:bg-slate-800 transition-all duration-300"
                        onClick={() => window.open("https://www.youtube.com/watch?v=YOUR_VIDEO_ID", "_blank")}
                      >
                        🎬 Watch Demo
                      </button>
                    </div>
                  </div>

                  {/* STATS & RIGHT SIDE DESIGN */}
                  <div className="relative flex items-center justify-center">
                    <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] rounded-full border border-cyan-500/20 flex items-center justify-center">
                      <div className="absolute w-[340px] h-[340px] sm:w-[500px] sm:h-[500px] lg:w-[620px] lg:h-[620px] border border-cyan-500/10 rounded-full animate-spin" style={{ animationDuration: "20s" }}></div>
                      <div className="absolute w-[240px] h-[240px] sm:w-[340px] sm:h-[340px] lg:w-[420px] lg:h-[420px] border border-purple-500/20 rounded-full animate-spin" style={{ animationDuration: "12s", animationDirection: "reverse" }}></div>

                      <div className="relative z-10 bg-slate-900/80 border border-cyan-500/20 backdrop-blur-2xl rounded-[30px] lg:rounded-[40px] p-6 lg:p-12 shadow-[0_0_80px_rgba(59,130,246,0.3)]">
                        <div className="text-center">
                          <div className="text-5xl lg:text-8xl mb-5">🎓</div>
                          <h2 className="text-3xl font-black">EduNova</h2>
                          <p className="text-slate-400 mt-3">Future Learning Platform</p>
                        </div>
                      </div>

                      <div className="absolute top-0 left-20 bg-slate-900 border border-cyan-500/20 px-6 py-4 rounded-2xl backdrop-blur-xl shadow-xl"><p className="text-3xl">💻</p></div>
                      <div className="absolute bottom-10 right-0 bg-slate-900 border border-purple-500/20 px-6 py-4 rounded-2xl backdrop-blur-xl shadow-xl"><p className="text-3xl">🤖</p></div>
                      <div className="absolute top-32 right-[-30px] bg-slate-900 border border-green-500/20 px-6 py-4 rounded-2xl backdrop-blur-xl shadow-xl"><p className="text-3xl">🚀</p></div>
                    </div>
                  </div>
                </div>
</div>

{/* COMPANIES MARQUEE */}
  <div className="relative overflow-x-hidden py-24 bg-black border-y border-slate-800">

  {/* BG GLOW */}
  <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full"></div>

  <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-500/10 blur-[120px] rounded-full"></div>

  {/* HEADER */}
  <div className="text-center mb-16 relative z-10">

    <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white px-4">

      Trusted By

      <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
        {" "}Top Companies 🌍
      </span>

    </h2>

    <p className="text-slate-400 text-base sm:text-lg md:text-xl mt-4 sm:mt-6 px-4">
      Learners from leading companies trust EduNova
    </p>

  </div>

  {/* MARQUEE */}
  <div className="relative flex overflow-x-hidden  py-10">

  {/* LEFT FADE */}
  <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10"></div>

  {/* RIGHT FADE */}
  <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10"></div>

  {/* MARQUEE TRACK */}
  <div className="flex animate-marquee whitespace-nowrap gap-10 sm:gap-16 lg:gap-24 items-center min-w-max">

    {/* GOOGLE */}
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
      alt="Google"
      className="h-14 object-contain opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300"
    />

    {/* MICROSOFT */}
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
      alt="Microsoft"
      className="h-14 object-contain opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300"
    />

    {/* AMAZON */}
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
      alt="Amazon"
      className="h-14 object-contain opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300"
    />

    {/* NETFLIX */}
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
      alt="Netflix"
      className="h-14 object-contain opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300"
    />

    {/* META */}
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png"
      alt="Meta"
      className="h-14 object-contain opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300"
    />

    {/* APPLE */}
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
      alt="Apple"
      className="h-14 object-contain opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300 invert"
    />

    {/* OPENAI */}
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg"
      alt="OpenAI"
      className="h-14 object-contain opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300 invert"
    />

    {/* NVIDIA */}
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg"
      alt="NVIDIA"
      className="h-14 object-contain opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300 brightness-0 invert"
    />

    {/* ADOBE */}
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg"
      alt="Adobe"
      className="h-14 object-contain opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300"
    />

    {/* SPOTIFY */}
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg"
      alt="Spotify"
      className="h-14 object-contain opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300"
    />

    {/* IBM */}
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
      alt="IBM"
      className="h-14 object-contain opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300 invert"
    />

    {/* ORACLE */}
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg"
      alt="Oracle"
      className="h-14 object-contain opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300"
    />

    {/* TCS FIX */}
    <div className="text-4xl font-black text-white opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300">
      TCS
    </div>

    {/* DUPLICATE FOR INFINITE LOOP */}

    <img
      src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
      alt="Google"
      className="h-14 object-contain opacity-70"
    />

    <img
      src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
      alt="Microsoft"
      className="h-14 object-contain opacity-70"
    />

    <img
      src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
      alt="Amazon"
      className="h-14 object-contain opacity-70"
    />

    <img
      src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
      alt="Netflix"
      className="h-14 object-contain opacity-70"
    />

    <img
      src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png"
      alt="Meta"
      className="h-14 object-contain opacity-70"
    />

    <div className="text-4xl font-black text-white opacity-70">
      TCS
    </div>

  </div>
</div>
</div>

{/* FEATURES SECTION */}
 <div className="relative py-16 lg:py-32 px-4 sm:px-6 lg:px-12 overflow-x-hidden bg-[#030712] text-white">

  {/* BACKGROUND GLOW */}
  <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full"></div>

  <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-500/10 blur-[120px] rounded-full"></div>

  {/* SECTION HEADER */}
  <div className="text-center mb-20 relative z-10">

    <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-cyan-500/20 bg-slate-900/70 backdrop-blur-xl mb-8">

      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>

      <span className="text-slate-300 tracking-wide">
        Why Students Love EduNova
      </span>

    </div>

    <h2 className="text-3xl sm:text-4xl md:text-6xl font-black leading-tight px-2">

      Why Choose

      <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
        {" "}EduNova? 🚀
      </span>

    </h2>

    <p className="text-slate-400 text-base sm:text-lg md:text-xl mt-6 lg:mt-8 max-w-2xl mx-auto leading-7 lg:leading-8 px-4">

      Everything you need to master skills, build projects,
      and become industry-ready.

    </p>

  </div>

  {/* FEATURE GRID */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 max-w-7xl mx-auto relative z-10">

    {/* CARD 1 */}
    <div className="group relative bg-slate-900/70 border border-slate-800 rounded-[24px] lg:rounded-[32px] p-6 lg:p-10 backdrop-blur-2xl hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_0_50px_rgba(6,182,212,0.2)] overflow-x-hidden ">

      {/* ICON */}
      <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-3xl lg:text-4xl shadow-[0_0_40px_rgba(6,182,212,0.5)] mb-8">

        🚀

      </div>

      <h3 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-5 group-hover:text-cyan-400 transition-colors duration-300">

        Learn Fast

      </h3>

      <p className="text-slate-400 leading-7 lg:leading-8 text-base lg:text-lg">

        Structured premium courses designed for faster learning
        and real understanding.

      </p>

      {/* NUMBER */}
      <div className="absolute top-8 right-8 text-4xl lg:text-6xl font-black text-white/5">

        01

      </div>
    </div>

    {/* CARD 2 */}
    <div className="group relative bg-slate-900/70 border border-slate-800 rounded-[24px] lg:rounded-[32px] p-6 lg:p-10 backdrop-blur-2xl hover:border-green-500/30 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_0_50px_rgba(34,197,94,0.2)] overflow-x-hidden ">

      <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-4xl shadow-[0_0_40px_rgba(34,197,94,0.5)] mb-8">

        💻

      </div>

      <h3 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-5 group-hover:text-green-400 transition-colors duration-300">

        Real Projects

      </h3>

      <p className="text-slate-400 leading-7 lg:leading-8 text-base lg:text-lg">

        Build modern real-world projects and strengthen your
        portfolio with practical skills.

      </p>

      <div className="absolute top-8 right-8 text-4xl lg:text-6xl font-black text-white/5">

        02

      </div>
    </div>

    {/* CARD 3 */}
    <div className="group relative bg-slate-900/70 border border-slate-800 rounded-[24px] lg:rounded-[32px] p-6 lg:p-10 backdrop-blur-2xl hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_0_50px_rgba(168,85,247,0.2)] overflow-x-hidden ">

      <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-3xl lg:text-4xl shadow-[0_0_40px_rgba(168,85,247,0.5)] mb-8">

        📚

      </div>

      <h3 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-5 group-hover:text-purple-400 transition-colors duration-300">

        Lifetime Access

      </h3>

      <p className="text-slate-400 leading-7 lg:leading-8 text-base lg:text-lg">

        Learn anytime, anywhere with unlimited lifetime access
        to your purchased courses.

      </p>

      <div className="absolute top-8 right-8 text-4xl lg:text-6xl font-black text-white/5">

        03

      </div>
    </div>

  </div>
</div>

{/* LEARNING ROADMAP */}
<div className="relative py-16 lg:py-36 px-4 sm:px-6 lg:px-12 overflow-x-hidden bg-black text-white">

  <div className="text-center mb-12 lg:mb-24">

    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black px-2">

      Your Learning

      <span className="bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
        {" "}Roadmap 🛣️
      </span>

    </h2>

  </div>

  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10">

    {/* STEP */}
    <div className="bg-slate-900 border border-slate-800 rounded-[24px] lg:rounded-[35px] p-6 lg:p-10 text-center hover:border-cyan-500/30 transition-all duration-500">

      <div className="text-4xl lg:text-6xl mb-4 lg:mb-6">
        📚
      </div>

      <h3 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4">
        Learn
      </h3>

      <p className="text-slate-400 text-sm lg:text-base leading-6">
        Master concepts with premium courses.
      </p>

    </div>

    <div className="bg-slate-900 border border-slate-800 rounded-[24px] lg:rounded-[35px] p-6 lg:p-10 text-center hover:border-green-500/30 transition-all duration-500">

      <div className="text-4xl lg:text-6xl mb-4 lg:mb-6">
        💻
      </div>

      <h3 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4">
        Build
      </h3>

      <p className="text-slate-400 text-sm lg:text-base leading-6">
        Create real-world projects and portfolio.
      </p>

    </div>

    <div className="bg-slate-900 border border-slate-800 rounded-[24px] lg:rounded-[35px] p-6 lg:p-10 text-center hover:border-purple-500/30 transition-all duration-500">

      <div className="text-4xl lg:text-6xl mb-4 lg:mb-6">
        🚀
      </div>

      <h3 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4">
        Practice
      </h3>

      <p className="text-slate-400 text-sm lg:text-base leading-6">
        Improve skills with assignments and coding.
      </p>

    </div>

    <div className="bg-slate-900 border border-slate-800 rounded-[24px] lg:rounded-[35px] p-6 lg:p-10 text-center hover:border-yellow-500/30 transition-all duration-500">

      <div className="text-4xl lg:text-6xl mb-4 lg:mb-6">
        🏆
      </div>

      <h3 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4">
        Get Hired
      </h3>

      <p className="text-slate-400 text-sm lg:text-base leading-6">
        Crack internships and dream jobs confidently.
      </p>

    </div>

  </div>
</div>

{/* TESTIMONIALS SECTION */}
<div className="relative py-16 lg:py-36 px-4 sm:px-6 lg:px-12 overflow-x-hidden overflow-y-hidden bg-[#030712] text-white">

  {/* BACKGROUND EFFECTS */}
  <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-cyan-500/10 blur-[120px] rounded-full"></div>

  <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-purple-500/10 blur-[120px] rounded-full"></div>

  {/* GRID EFFECT */}
  <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:70px_70px]"></div>

  {/* HEADER */}
  <div className="text-center relative z-10 mb-12 lg:mb-24">

    <div className="inline-flex items-center gap-3 bg-slate-900/80 border border-cyan-500/20 backdrop-blur-xl px-6 py-3 rounded-full mb-8">

      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>

      <span className="text-slate-300 tracking-wide">
        Trusted by Thousands of Learners
      </span>

    </div>

    <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black leading-tight px-2">

      Student

      <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
        {" "}Success Stories 💬
      </span>

    </h2>

    <p className="text-slate-400 text-base sm:text-lg lg:text-xl mt-6 lg:mt-8 max-w-3xl mx-auto leading-7 lg:leading-9 px-4">

      Discover how EduNova transformed careers, boosted confidence,
      and helped learners achieve their dream jobs.

    </p>
  </div>

  {/* TESTIMONIALS */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 max-w-7xl mx-auto relative z-10">

    {/* CARD 1 */}
    <div className="group relative overflow-x-hidden rounded-[24px] lg:rounded-[40px] border border-cyan-500/10 bg-gradient-to-b from-slate-900 to-slate-950 p-6 lg:p-10 backdrop-blur-2xl hover:border-cyan-500/40 transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_0_80px_rgba(6,182,212,0.25)]">

      {/* QUOTE ICON */}
      <div className="absolute top-6 right-6 text-5xl lg:text-7xl text-cyan-500/10 font-black">
        ”
      </div>

      {/* USER */}
      <div className="flex items-center gap-5 mb-8">

        <div className="relative">

          <img
            src="/Image/Rahulsharma.jpg"
            alt="rahulProfile"
            className="w-16 h-16 lg:w-20 lg:h-20 rounded-3xl object-cover border-2 border-cyan-500"
          />

          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-4 border-[#030712]"></div>

        </div>

        <div>

          <h3 className="text-xl lg:text-2xl font-bold">
            Rahul Sharma
          </h3>

          <p className="text-cyan-400">
            Frontend Developer
          </p>

        </div>
      </div>

      {/* REVIEW */}
      <p className="text-slate-400 text-base lg:text-lg leading-7 lg:leading-9">

        “EduNova completely changed my learning experience.
        The projects, UI, and explanations are better than
        most paid platforms.”

      </p>

      {/* STARS */}
      <div className="flex gap-1 mt-8 text-yellow-400 text-lg lg:text-2xl">

        ⭐ ⭐ ⭐ ⭐ ⭐

      </div>

      {/* GLOW */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500 to-blue-500"></div>
    </div>

    {/* CARD 2 */}
    <div className="group relative overflow-x-hidden rounded-[24px] lg:rounded-[40px] border border-green-500/10 bg-gradient-to-b from-slate-900 to-slate-950 p-6 lg:p-10 backdrop-blur-2xl hover:border-green-500/40 transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_0_80px_rgba(34,197,94,0.25)] lg:scale-105">

      {/* BADGE */}
      <div className="absolute top-6 right-6 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold border border-green-500/20">

        Most Loved ❤️

      </div>

      <div className="flex items-center gap-5 mb-8">

        <div className="relative">

          <img
            src="/Image/anjaliVermaProfile.jpg"
            alt="anjaliProfile"
            className="w-16 h-16 lg:w-20 lg:h-20 rounded-3xl object-cover border-2 border-green-500"
          />

          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-4 border-[#030712]"></div>

        </div>

        <div>

          <h3 className="text-xl lg:text-2xl font-bold">
            Anjali Verma
          </h3>

          <p className="text-green-400">
            UI/UX Designer
          </p>

        </div>
      </div>

      <p className="text-slate-400 text-base lg:text-lg leading-7 lg:leading-9">

        “The teaching style is next-level. I improved my design
        and frontend skills so much after joining EduNova.”

      </p>

      <div className="flex gap-1 mt-8 text-yellow-400 text-lg lg:text-2xl">

        ⭐ ⭐ ⭐ ⭐ ⭐

      </div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-green-500 to-emerald-500"></div>
    </div>

    {/* CARD 3 */}
    <div className="group relative overflow-x-hidden rounded-[24px] lg:rounded-[40px] border border-purple-500/10 bg-gradient-to-b from-slate-900 to-slate-950 p-6 lg:p-10 backdrop-blur-2xl hover:border-purple-500/40 transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_0_80px_rgba(168,85,247,0.25)]">

      <div className="absolute top-6 right-6 text-7xl text-purple-500/10 font-black">
        ”
      </div>

      <div className="flex items-center gap-5 mb-8">

        <div className="relative">

          <img
            src="/Image/souravKumarProfile.jpg"
            alt="souravKumarProfile"
            className="w-16 h-16 lg:w-20 lg:h-20 rounded-3xl object-cover border-2 border-purple-500"
          />

          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-4 border-[#030712]"></div>

        </div>

        <div>

          <h3 className="text-xl lg:text-2xl font-bold">
            Sourav Kumar
          </h3>

          <p className="text-purple-400">
            Software Engineer Intern
          </p>

        </div>
      </div>

      <p className="text-slate-400 text-base lg:text-lg leading-7 lg:leading-9">

        “I got my first internship after completing the
        real-world projects and interview preparation modules.”

      </p>

      <div className="flex gap-1 mt-8 text-yellow-400 text-lg lg:text-2xl">

        ⭐ ⭐ ⭐ ⭐ ⭐

      </div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 to-pink-500"></div>
    </div>

  </div>
</div>

{/* IMPACT SECTION */}
<div style={{
  padding: "60px 15px",
  textAlign: "center"
}}>

  <h2 style={{
  fontSize: window.innerWidth < 768 ? "32px" : "48px",
  fontWeight: "bold",
  marginBottom: "20px",
  background: "linear-gradient(90deg, #3b82f6, #22c55e)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  letterSpacing: "1px"
}}>
  Our Impact 🚀
</h2>

<p style={{
  color: "#94a3b8",
  marginBottom: "60px",
  fontSize: window.innerWidth < 768 ? "15px" : "18px"
}}>
  Thousands of students are already transforming their careers with EduNova
</p>

  <div style={{
    display: "flex",
    justifyContent: "center",
    gap: window.innerWidth < 768 ? "40px" : "80px",
    flexWrap: "wrap"
  }}>

    {/* STUDENTS */}
    <div>
      <h1 style={{
        fontSize: window.innerWidth < 768 ? "48px" : "70px",
        fontWeight: "bold",
        color: "#22c55e",
        animation: "pulse 2s infinite"
      }}>
        10K+
      </h1>
      <p style={{ fontSize: "18px", color: "#94a3b8" }}>
        Students
      </p>
    </div>

    {/* COURSES */}
    <div>
      <h1 style={{
        fontSize: window.innerWidth < 768 ? "48px" : "70px",
        fontWeight: "bold",
        color: "#3b82f6",
        animation: "pulse 2s infinite"
      }}>
        50+
      </h1>
      <p style={{ fontSize: "18px", color: "#94a3b8" }}>
        Courses
      </p>
    </div>

    {/* SUCCESS */}
    <div>
      <h1 style={{
        fontSize: window.innerWidth < 768 ? "48px" : "70px",
        fontWeight: "bold",
        color: "#f59e0b",
        animation: "pulse 2s infinite"
      }}>
        100%
      </h1>
      <p style={{ fontSize: "18px", color: "#94a3b8" }}>
        Success Rate
      </p>
    </div>

  </div>
</div>

{/* FAQ SECTION */}
<div className="relative py-36 px-6 lg:px-12 overflow-x-hidden bg-[#030712] text-white">

  {/* BACKGROUND */}
  <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full"></div>

  <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-purple-500/10 blur-[120px] rounded-full"></div>

  {/* HEADER */}
  <div className="text-center mb-12 lg:mb-20 relative z-10">

    <div className="inline-flex items-center gap-3 bg-slate-900/80 border border-cyan-500/20 backdrop-blur-xl px-6 py-3 rounded-full mb-8">

      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>

      <span className="text-slate-300 tracking-wide">
        Frequently Asked Questions
      </span>

    </div>

    <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black px-2">

      Got Questions

      <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
        {" "}❓
      </span>

    </h2>

    <p className="text-slate-400 text-base sm:text-lg lg:text-xl mt-6 lg:mt-8 max-w-3xl mx-auto leading-7 lg:leading-9 px-4">

      Everything you need to know about learning,
      courses, and your EduNova journey.

    </p>

  </div>

  {/* FAQ LIST */}
  <div className="max-w-4xl mx-auto flex flex-col gap-4 lg:gap-6 relative z-10">

    {/* FAQ 1 */}
    <details className="group bg-slate-900/70 border border-slate-800 rounded-[20px] lg:rounded-[30px] p-5 lg:p-8 backdrop-blur-2xl hover:border-cyan-500/30 transition-all duration-300">

      <summary className="flex items-center justify-between cursor-pointer list-none">

        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">
          Do I get lifetime access to courses?
        </h3>

        <span className="text-2xl lg:text-4xl text-cyan-400 group-open:rotate-45 transition-transform duration-300">
          +
        </span>

      </summary>

      <p className="text-slate-400 text-sm sm:text-base lg:text-lg leading-6 lg:leading-8 mt-6">

        Yes! Once you purchase a course, you get
        unlimited lifetime access including future updates.

      </p>

    </details>

    {/* FAQ 2 */}
    <details className="group bg-slate-900/70 border border-slate-800 rounded-[20px] lg:rounded-[30px] p-5 lg:p-8 backdrop-blur-2xl hover:border-green-500/30 transition-all duration-300">

      <summary className="flex items-center justify-between cursor-pointer list-none">

        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">
          Are there real-world projects included?
        </h3>

        <span className="text-2xl lg:text-4xl text-green-400 group-open:rotate-45 transition-transform duration-300">
          +
        </span>

      </summary>

      <p className="text-slate-400 text-sm sm:text-base lg:text-lg leading-6 lg:leading-8 mt-6">

        Absolutely. Every premium course includes
        practical real-world projects to build your portfolio.

      </p>

    </details>

    {/* FAQ 3 */}
    <details className="group bg-slate-900/70 border border-slate-800 rounded-[20px] lg:rounded-[30px] p-5 lg:p-8 backdrop-blur-2xl hover:border-purple-500/30 transition-all duration-300">

      <summary className="flex items-center justify-between cursor-pointer list-none">

        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">
          Can beginners start learning on EduNova?
        </h3>

        <span className="text-2xl lg:text-4xl text-purple-400 group-open:rotate-45 transition-transform duration-300">
          +
        </span>

      </summary>

      <p className="text-slate-400 text-sm sm:text-base lg:text-lg leading-6 lg:leading-8 mt-6">

        Yes! Courses are beginner-friendly and designed
        with structured learning paths for all levels.

      </p>

    </details>

    {/* FAQ 4 */}
    <details className="group bg-slate-900/70 border border-slate-800 rounded-[20px] lg:rounded-[30px] p-5 lg:p-8 backdrop-blur-2xl hover:border-yellow-500/30 transition-all duration-300">

      <summary className="flex items-center justify-between cursor-pointer list-none">

        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">
          Will I get certificates after completion?
        </h3>

        <span className="text-2xl lg:text-4xl text-yellow-400 group-open:rotate-45 transition-transform duration-300">
          +
        </span>

      </summary>

      <p className="text-slate-400 text-sm sm:text-base lg:text-lg leading-6 lg:leading-8 mt-6">

        Yes, you will receive certificates after
        successfully completing your courses.

      </p>

    </details>

  </div>
</div>

{/* CTA BANNER */}
<div className="relative py-16 lg:py-32 px-4 sm:px-6 lg:px-12 overflow-x-hidden bg-[#030712] text-white">

  {/* GLOW */}
  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 blur-[120px]"></div>

  <div className="relative z-10 max-w-6xl mx-auto rounded-[24px] lg:rounded-[50px] border border-cyan-500/20 bg-slate-900/70 backdrop-blur-2xl p-6 sm:p-8 lg:p-16 text-center overflow-x-hidden">

    {/* SMALL GLOW */}
    <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full"></div>

    <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full"></div>

    <div className="relative z-10">

      <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black leading-tight">

        Ready to Start

        <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
          {" "}Your Journey? 🚀
        </span>

      </h2>

      <p className="text-slate-400 text-base sm:text-lg lg:text-xl leading-7 lg:leading-9 mt-6 lg:mt-10 max-w-3xl mx-auto">

        Join thousands of learners building future-ready skills,
        projects, and careers with EduNova.

      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 lg:gap-6 mt-8 lg:mt-14">

        <button
  className="w-full sm:w-auto px-8 py-4 lg:py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-base lg:text-lg shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:scale-105 transition-all duration-300"
onClick={() => window.location.href = "/courses"} 
  onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
  onMouseOut={(e) => e.target.style.transform = "scale(1)"}
>
  🚀 Explore Courses
</button>

        <button className="w-full sm:w-auto px-8 py-4 lg:py-5 rounded-2xl border border-slate-700 bg-slate-900/70 backdrop-blur-xl text-white font-bold text-base lg:text-xl hover:bg-slate-800 transition-all duration-300">

          Watch Demo ▶

        </button>

      </div>
    </div>
  </div>
</div>

{/* FOOTER */}
 <footer className="relative overflow-x-hidden  bg-black text-white border-t border-slate-800">

  {/* GLOW */}
  <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full"></div>

  <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-500/10 blur-[120px] rounded-full"></div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-20 relative z-10">

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-14">

      {/* BRAND */}
      <div>

        <h2 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

          EduNova

        </h2>

        <p className="text-slate-400 mt-4 lg:mt-6 leading-7 lg:leading-8 text-sm lg:text-base">

          Modern learning platform helping students
          master coding and future skills.

        </p>

      </div>

      {/* LINKS */}
      <div>

        <h3 className="text-xl lg:text-2xl font-bold mb-6">
          Explore
        </h3>

        <div className="flex flex-col gap-4 text-slate-400">

          <a href="#">Courses</a>
          <a href="#">Projects</a>
          <a href="#">Certificates</a>
          <a href="#">Roadmaps</a>

        </div>

      </div>

      {/* COMPANY */}
      <div>

        <h3 className="text-xl lg:text-2xl font-bold mb-6">
          Company
        </h3>

        <div className="flex flex-col gap-4 text-slate-400">

          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>

        </div>

      </div>

      {/* NEWSLETTER */}
      <div>

        <h3 className="text-xl lg:text-2xl font-bold mb-6">
          Stay Updated
        </h3>

        <div className="flex flex-col gap-4">

          <input
            type="email"
            placeholder="Enter your email"
            className="bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-cyan-500"
          />

          <button className="bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300">

            Subscribe 🚀

          </button>

        </div>

      </div>

    </div>

    {/* BOTTOM */}
    <div className="border-t border-slate-800 mt-20 pt-8 flex flex-col md:flex-row items-center justify-between gap-5">

      <p className="text-slate-500">
        © 2026 EduNova. All rights reserved.
      </p>

      <div className="flex gap-5 text-xl lg:text-2xl">

        <a href="#">🌐</a>
        <a href="#">🐦</a>
        <a href="#">📸</a>
        <a href="#">💼</a>

      </div>

    </div>
  </div>
</footer>

            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;