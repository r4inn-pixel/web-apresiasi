import { useState, useEffect } from "react";
import {
  FaHeart,
  FaUserCircle,
  FaSignOutAlt,
  FaEdit,
  FaSave,
} from "react-icons/fa";

function App() {
  const [user, setUser] = useState(localStorage.getItem("user") || "");
  const [inputUser, setInputUser] = useState("");

  const [likes, setLikes] = useState(
    Number(localStorage.getItem("likes")) || 0
  );

  const [comments, setComments] = useState(
    JSON.parse(localStorage.getItem("comments")) || []
  );

  const [newComment, setNewComment] = useState("");

  const [description, setDescription] = useState(
    localStorage.getItem("description") ||
      "Mahasiswa kreatif dan inovatif di bidang teknologi."
  );

  const [editDesc, setEditDesc] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // ================= RESPONSIVE =================
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 480;

  // ================= SAVE TO LOCAL STORAGE =================
  useEffect(() => {
    localStorage.setItem("likes", likes);
  }, [likes]);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem("user", user);
  }, [user]);

  useEffect(() => {
    localStorage.setItem("description", description);
  }, [description]);

  // ================= LOGIN =================
  const handleLogin = () => {
    if (inputUser.trim() !== "") {
      setUser(inputUser.trim());
    }
  };

  const handleLogout = () => {
    setUser("");
    localStorage.removeItem("user");
  };

  // ================= COMMENT =================
  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([
        ...comments,
        { name: user, text: newComment },
      ]);
      setNewComment("");
    }
  };

  // ================= RESPONSIVE STYLE =================
  const dynamicCard = {
    ...card,
    padding: isMobile ? "20px" : "30px",
    maxWidth: isMobile ? "100%" : "420px",
  };

  const dynamicIconSize = isMobile ? 70 : 100;

  const dynamicFont = {
    fontSize: isMobile ? "13px" : "15px",
  };

  // ================= LOGIN PAGE =================
  if (!user) {
    return (
      <div style={container}>
        <div style={dynamicCard}>
          <h2 style={{ textAlign: "center" }}>🔐 Login</h2>
          <input
            type="text"
            placeholder="Masukkan nama..."
            value={inputUser}
            onChange={(e) => setInputUser(e.target.value)}
            style={input}
          />
          <button onClick={handleLogin} style={primaryBtn}>
            Masuk
          </button>
        </div>
      </div>
    );
  }

  // ================= MAIN PAGE =================
  return (
    <div style={container}>
      <div style={dynamicCard}>
        <div style={topBar}>
          <h2>🌟 Web Apresiasi 🌟</h2>
          <button onClick={handleLogout} style={logoutBtn}>
            <FaSignOutAlt />
          </button>
        </div>

        <div style={{ textAlign: "center" }}>
          <FaUserCircle size={dynamicIconSize} color="#667eea" />

          <h3 style={{ marginTop: "10px" }}>
            {user.charAt(0).toUpperCase() + user.slice(1)}
          </h3>

          {/* ================= EDITABLE DESCRIPTION ================= */}
          {!editDesc ? (
            <p style={{ color: "#555", ...dynamicFont }}>
              {description}
              <FaEdit
                style={{ marginLeft: "8px", cursor: "pointer" }}
                onClick={() => setEditDesc(true)}
              />
            </p>
          ) : (
            <>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={textarea}
              />
              <button
                onClick={() => setEditDesc(false)}
                style={primaryBtn}
              >
                <FaSave /> Simpan
              </button>
            </>
          )}

          <button
            onClick={() => setLikes(likes + 1)}
            style={likeBtn}
          >
            ❤️ {likes}
          </button>
        </div>

        <hr style={{ margin: "25px 0" }} />

        <h3>💬 Komentar</h3>

        <div style={commentBox}>
          <input
            type="text"
            placeholder="Tulis komentar..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            style={input}
          />
          <button onClick={handleAddComment} style={primaryBtn}>
            Kirim
          </button>
        </div>

        <div style={{ marginTop: "15px" }}>
          {comments.length === 0 && (
            <p style={{ color: "#777" }}>
              Belum ada komentar...
            </p>
          )}

          {comments.map((c, index) => (
            <div key={index} style={commentItem}>
              <b>
                {c.name.charAt(0).toUpperCase() +
                  c.name.slice(1)}
              </b>
              <p style={{ margin: "5px 0 0 0" }}>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= STYLE ================= */

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  padding: "15px",
};

const card = {
  background: "rgba(255,255,255,0.95)",
  borderRadius: "20px",
  width: "100%",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
};

const input = {
  padding: "12px",
  width: "100%",
  borderRadius: "10px",
  border: "1px solid #ccc",
  marginBottom: "10px",
};

const textarea = {
  width: "100%",
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  marginBottom: "10px",
  minHeight: "70px",
};

const primaryBtn = {
  padding: "10px",
  width: "100%",
  borderRadius: "10px",
  border: "none",
  background: "#667eea",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
  marginTop: "5px",
};

const likeBtn = {
  marginTop: "15px",
  padding: "10px 20px",
  borderRadius: "50px",
  border: "none",
  background: "#ff4d6d",
  color: "white",
  cursor: "pointer",
};

const logoutBtn = {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  fontSize: "18px",
};

const commentBox = {
  display: "flex",
  flexDirection: "column",
};

const commentItem = {
  background: "#f4f4f4",
  padding: "10px",
  borderRadius: "10px",
  marginBottom: "10px",
};

const topBar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

export default App;