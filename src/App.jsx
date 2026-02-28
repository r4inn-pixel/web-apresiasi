import { useState, useEffect } from "react";
import { FaHeart, FaUserCircle, FaSignOutAlt } from "react-icons/fa";

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

  useEffect(() => {
    localStorage.setItem("likes", likes);
  }, [likes]);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem("user", user);
  }, [user]);

  const handleLogin = () => {
    if (inputUser.trim() !== "") {
      setUser(inputUser);
    }
  };

  const handleLogout = () => {
    setUser("");
    localStorage.removeItem("user");
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, { name: user, text: newComment }]);
      setNewComment("");
    }
  };

  if (!user) {
    return (
      <div style={container}>
        <div style={card}>
          <h2>🔐 Login</h2>
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

  return (
    <div style={container}>
      <div style={card}>
        <div style={topBar}>
          <h2>🌟 Web Apresiasi 🌟</h2>
          <button onClick={handleLogout} style={logoutBtn}>
            <FaSignOutAlt />
          </button>
        </div>

        <div style={{ textAlign: "center" }}>
          <FaUserCircle size={100} color="#667eea" />
          <h3 style={{ marginTop: "10px" }}>Rahmaniarti</h3>
          <p style={{ color: "#555" }}>
            Mahasiswa kreatif dan inovatif di bidang teknologi.
          </p>

          <p style={{ marginTop: "10px" }}>
            Login sebagai: <b>{user}</b>
          </p>

          <button
            onClick={() => setLikes(likes + 1)}
            style={likeBtn}
          >
            <FaHeart /> {likes}
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
          {comments.map((c, index) => (
            <div key={index} style={commentItem}>
              <b>{c.name}</b>
              <p style={{ margin: "5px 0 0 0" }}>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===== MODERN STYLE ===== */

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  padding: "20px"
};

const card = {
  background: "rgba(255,255,255,0.9)",
  backdropFilter: "blur(10px)",
  padding: "30px",
  borderRadius: "20px",
  width: "100%",
  maxWidth: "400px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
};

const input = {
  padding: "10px",
  width: "100%",
  borderRadius: "10px",
  border: "1px solid #ccc",
  marginBottom: "10px"
};

const primaryBtn = {
  padding: "10px",
  width: "100%",
  borderRadius: "10px",
  border: "none",
  background: "#667eea",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold"
};

const likeBtn = {
  padding: "10px 20px",
  borderRadius: "50px",
  border: "none",
  background: "#ff4d6d",
  color: "white",
  cursor: "pointer",
  fontSize: "16px",
  marginTop: "10px",
  transition: "0.3s"
};

const logoutBtn = {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  fontSize: "18px"
};

const commentBox = {
  display: "flex",
  flexDirection: "column"
};

const commentItem = {
  background: "#f4f4f4",
  padding: "10px",
  borderRadius: "10px",
  marginBottom: "10px"
};

const topBar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px"
};

export default App;