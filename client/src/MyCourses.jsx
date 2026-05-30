import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { BookOpen, PlayCircle } from "lucide-react";

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // PROTECTION
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/api/purchase/my-courses", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("🔥 DATA:", data);
        setCourses(data);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <Navbar />

      <div className="px-6 py-10 md:px-14">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {/* My Courses 🎓 */}
            </h1>

            <p className="text-slate-400 mt-3 text-lg">
              Continue learning and level up your skills.
            </p>
          </div>

          <div className="bg-slate-800/70 border border-slate-700 px-5 py-4 rounded-2xl backdrop-blur-md shadow-lg">
            <p className="text-slate-400 text-sm">Total Courses</p>
            <h2 className="text-3xl font-bold text-blue-400">
              {courses.length}
            </h2>
          </div>
        </div>

        {/* EMPTY STATE */}
        {courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <BookOpen size={70} className="text-slate-600 mb-5" />

            <h2 className="text-2xl font-semibold mb-2">
              No Courses Yet
            </h2>

            <p className="text-slate-400 max-w-md">
              Purchase a course and start your learning journey with EduNova.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {courses.map((item) => {
              const course = item.courseId;

              if (!course) return null;

              return (
                <div
                  key={course._id}
                  className="group bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-2"
                >
                  {/* IMAGE */}
                  <div className="relative overflow-hidden">
                    <img
                      src={`http://localhost:5000/uploads/${course.image}`}
                      alt={course.title}
                      className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                    <div className="absolute bottom-4 left-4 bg-blue-500/90 text-white text-xs px-3 py-1 rounded-full font-semibold backdrop-blur-md">
                      Enrolled
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-5">
                    <h3 className="text-xl font-semibold line-clamp-2 mb-3 group-hover:text-blue-400 transition-colors duration-300">
                      {course.title}
                    </h3>

                    <p className="text-slate-400 text-sm mb-5 line-clamp-2">
                      Start learning and continue your journey with high-quality
                      content curated for modern learners.
                    </p>

                    <button
                      onClick={() => navigate(`/course/${course._id}`)}
                      className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
                    >
                      <PlayCircle size={20} />
                      Open Course
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
export default MyCourses;
