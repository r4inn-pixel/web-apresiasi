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

  // ===== SAVE TO LOCAL STORAGE =====
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

  // ===== LOGIN =====
  const handleLogin = () => {
    if (inputUser.trim() !== "") {
      setUser(inputUser.trim());
    }
  };

  const handleLogout = () => {
    setUser("");
    localStorage.removeItem("user");
  };

  // ===== COMMENT =====
  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, { name: user, text: newComment }]);
      setNewComment("");
    }
  };

  // ===== LOGIN PAGE =====
  if (!user) {
    return (
      <div style={container}>
        <div style={card}>
          <h2 style={titleCenter}>🔐 Login</h2>
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

  // ===== MAIN PAGE =====
  return (
    <div style={container}>
      <div style={card}>
        <div style={topBar}>
          <h2 style={{ margin: 0 }}>🌟 Web Apresiasi</h2>
          <button onClick={handleLogout} style={logoutBtn}>
            <FaSignOutAlt />
          </button>
        </div>

        <div style={profileSection}>
          <FaUserCircle style={avatarIcon} />

          <h3 style={{ margin: "10px 0 5px" }}>
            {user.charAt(0).toUpperCase() + user.slice(1)}
          </h3>

          {!editDesc ? (
            <p style={descriptionText}>
              {description}
              <FaEdit
                style={editIcon}
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

        <h3 style={{ marginBottom: "10px" }}>💬 Komentar</h3>

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
            <p style={{ color: "#777" }}>Belum ada komentar...</p>
          )}

          {comments.map((c, index) => (
            <div key={index} style={commentItem}>
              <b>
                {c.name.charAt(0).toUpperCase() +
                  c.name.slice(1)}
              </b>
              <p style={{ margin: "5px 0 0" }}>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= STYLE RESPONSIVE CLEAN ================= */

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
};

const card = {
  width: "100%",
  maxWidth: "500px",
  background: "white",
  borderRadius: "20px",
  padding: "30px",
  boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
  boxSizing: "border-box",
};

const topBar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const profileSection = {
  textAlign: "center",
};

const avatarIcon = {
  fontSize: "90px",
  color: "#667eea",
};

const descriptionText = {
  color: "#555",
  fontSize: "15px",
};

const editIcon = {
  marginLeft: "8px",
  cursor: "pointer",
  fontSize: "14px",
};

const input = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  marginBottom: "10px",
  fontSize: "14px",
  boxSizing: "border-box",
};

const textarea = {
  width: "100%",
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  marginBottom: "10px",
  minHeight: "70px",
  boxSizing: "border-box",
};

const primaryBtn = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "#667eea",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

const likeBtn = {
  marginTop: "15px",
  padding: "10px 25px",
  borderRadius: "50px",
  border: "none",
  background: "#ff4d6d",
  color: "white",
  cursor: "pointer",
  fontSize: "14px",
};

const logoutBtn = {
  background: "transparent",
  border: "none",
  fontSize: "18px",
  cursor: "pointer",
};

const commentBox = {
  display: "flex",
  flexDirection: "column",
};

const commentItem = {
  background: "#f5f5f5",
  padding: "10px",
  borderRadius: "10px",
  marginBottom: "10px",
};

const titleCenter = {
  textAlign: "center",
};

export default App;