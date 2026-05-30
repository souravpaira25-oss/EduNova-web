import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaLock, FaPlayCircle, FaStar } from "react-icons/fa";

const CoursePage = () => {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [videos, setVideos] = useState([]);
  const [locked, setLocked] = useState(true);

  useEffect(() => {

    // PUBLIC COURSE
    fetch(`https://edunova-web-backend.onrender.com/api/courses/${id}`)
      .then((res) => res.json())
      .then((data) => setCourse(data));

    // PROTECTED CONTENT
    fetch(`https://edunova-web-backend.onrender.com/api/courses/${id}/content`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.status === 403) {
          setLocked(true);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setVideos(data);
          setLocked(false);
        }
      });

  }, [id]);

  if (!course)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#020617",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        Loading...
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #0f172a, #020617 60%)",
        color: "white",
        padding: "40px 30px",
      }}
    >

      {/* HERO */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "50px",
          alignItems: "center",
        }}
      >

        {/* LEFT */}
        <div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 18px",
              borderRadius: "999px",
              background: "rgba(59,130,246,0.12)",
              border: "1px solid rgba(59,130,246,0.2)",
              marginBottom: "25px",
              color: "#38bdf8",
              fontWeight: "600",
            }}
          >
            <FaStar />
            Premium Course
          </div>

          <h1
            style={{
              fontSize: "70px",
              lineHeight: "1",
              marginBottom: "25px",
              fontWeight: "900",
            }}
          >
            {course.title}
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "20px",
              lineHeight: "1.8",
              maxWidth: "700px",
            }}
          >
            {course.description}
          </p>

          {/* STATS */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              marginTop: "35px",
            }}
          >

            <div
              style={{
                background: "#0f172a",
                padding: "18px 30px",
                borderRadius: "18px",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <h2 style={{ margin: 0, color: "#38bdf8" }}>
                {(locked ? course.videos || [] : videos).length}
              </h2>
              <p style={{ margin: 0, color: "#94a3b8" }}>
                Videos
              </p>
            </div>

            <div
              style={{
                background: "#0f172a",
                padding: "18px 30px",
                borderRadius: "18px",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <h2 style={{ margin: 0, color: "#22c55e" }}>
                Lifetime
              </h2>
              <p style={{ margin: 0, color: "#94a3b8" }}>
                Access
              </p>
            </div>

            <div
              style={{
                background: "#0f172a",
                padding: "18px 30px",
                borderRadius: "18px",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <h2 style={{ margin: 0, color: "#a855f7" }}>
                Beginner
              </h2>
              <p style={{ margin: 0, color: "#94a3b8" }}>
                Friendly
              </p>
            </div>

          </div>

          {/* LOCK ALERT */}
          {locked && (
            <div
              style={{
                marginTop: "35px",
                background:
                  "linear-gradient(90deg, rgba(234,179,8,0.15), rgba(251,191,36,0.08))",
                border: "1px solid rgba(251,191,36,0.25)",
                padding: "18px 24px",
                borderRadius: "18px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                color: "#facc15",
                fontWeight: "600",
                width: "fit-content",
              }}
            >
              <FaLock />
              Buy this course to unlock all premium videos
            </div>
          )}

        </div>

        {/* RIGHT IMAGE */}
        <div
          style={{
            position: "relative",
          }}
        >

          {/* GLOW */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              background:
                "radial-gradient(circle, rgba(59,130,246,0.35), transparent 70%)",
              filter: "blur(60px)",
              zIndex: 0,
            }}
          />

          <img
            src={`https://edunova-web-backend.onrender.com/${course.image}`}
            alt="course"
            style={{
              width: "100%",
              borderRadius: "28px",
              position: "relative",
              zIndex: 2,
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 20px 80px rgba(0,0,0,0.6)",
            }}
          />

        </div>

      </div>

      {/* VIDEO SECTION */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "80px auto 0",
        }}
      >

        <h2
          style={{
            fontSize: "42px",
            marginBottom: "40px",
            fontWeight: "800",
          }}
        >
          Course Content 🎬
        </h2>

        {(locked ? course.videos || [] : videos).length === 0 ? (

          <div
            style={{
              background: "#0f172a",
              padding: "50px",
              borderRadius: "24px",
              textAlign: "center",
              color: "#94a3b8",
              fontSize: "22px",
            }}
          >
            Coming Soon...
          </div>

        ) : (

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "30px",
            }}
          >

            {(locked ? course.videos : videos).map((video, index) => (

              <div
                key={index}
                style={{
                  background: "#0f172a",
                  borderRadius: "24px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.06)",
                  transition: "0.3s",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-10px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 60px rgba(0,0,0,0.6)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 40px rgba(0,0,0,0.3)";
                }}
              >

                {/* VIDEO */}
                <div
                  style={{
                    position: "relative",
                  }}
                >

                  <iframe
                    width="100%"
                    height="220"
                    src={video.videoUrl}
                    title="video"
                    frameBorder="0"
                    allowFullScreen
                    style={{
                      border: "none",
                      pointerEvents: locked ? "none" : "auto",
                      filter: locked ? "blur(8px)" : "none",
                    }}
                  ></iframe>

                  {locked && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,0.55)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                        backdropFilter: "blur(3px)",
                      }}
                    >
                      <FaLock
                        style={{
                          fontSize: "40px",
                          color: "#facc15",
                        }}
                      />

                      <span
                        style={{
                          fontSize: "20px",
                          fontWeight: "700",
                        }}
                      >
                        Locked Content
                      </span>
                    </div>
                  )}

                </div>

                {/* TITLE */}
                <div
                  style={{
                    padding: "22px",
                  }}
                >

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "14px",
                    }}
                  >
                    <span
                      style={{
                        color: "#38bdf8",
                        fontWeight: "600",
                      }}
                    >
                      Lesson {index + 1}
                    </span>

                    <FaPlayCircle
                      style={{
                        color: "#22c55e",
                        fontSize: "20px",
                      }}
                    />
                  </div>

                  <h3
                    style={{
                      margin: 0,
                      fontSize: "22px",
                      lineHeight: "1.4",
                    }}
                  >
                    {video.title}
                  </h3>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default CoursePage;