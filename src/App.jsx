import { useState, useEffect } from "react";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaEdit,
  FaSave,
  FaTrash,
} from "react-icons/fa";

function App() {
  const [user, setUser] = useState(localStorage.getItem("activeUser") || "");
  const [inputUser, setInputUser] = useState("");
  const [usersData, setUsersData] = useState(
    JSON.parse(localStorage.getItem("users")) || {}
  );

  const activeUserData = usersData[user] || {
    likes: 0,
    comments: [],
    description: "Mahasiswa kreatif dan inovatif di bidang teknologi.",
    avatar: "",
  };

  const [editDesc, setEditDesc] = useState(false);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(usersData));
  }, [usersData]);

  useEffect(() => {
    localStorage.setItem("activeUser", user);
  }, [user]);

  const handleLogin = () => {
    if (inputUser.trim() === "") return;

    const username = inputUser.trim().toLowerCase();

    if (!usersData[username]) {
      setUsersData({
        ...usersData,
        [username]: {
          likes: 0,
          comments: [],
          description:
            "Mahasiswa kreatif dan inovatif di bidang teknologi.",
          avatar: "",
        },
      });
    }

    setUser(username);
    setInputUser("");
  };

  const handleLogout = () => {
    setUser("");
    localStorage.removeItem("activeUser");
  };

  const updateUserData = (newData) => {
    setUsersData({
      ...usersData,
      [user]: {
        ...activeUserData,
        ...newData,
      },
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      updateUserData({ avatar: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    updateUserData({ avatar: "" });
  };

  const handleLike = () => {
    updateUserData({ likes: activeUserData.likes + 1 });
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    updateUserData({
      comments: [
        ...activeUserData.comments,
        { name: user, text: newComment },
      ],
    });

    setNewComment("");
  };

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
          {/* FOTO PROFIL */}
          {activeUserData.avatar ? (
            <>
              <img
                src={activeUserData.avatar}
                alt="avatar"
                style={avatarImage}
              />
              <button onClick={handleRemoveAvatar} style={removeBtn}>
                <FaTrash /> Hapus Foto
              </button>
            </>
          ) : (
            <FaUserCircle style={avatarIcon} />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ marginTop: "10px" }}
          />

          {/* NAMA USER */}
          <h3 style={{ margin: "10px 0 5px" }}>
            {user.charAt(0).toUpperCase() + user.slice(1)}
          </h3>

          {/* DESKRIPSI */}
          {!editDesc ? (
            <p style={descriptionText}>
              {activeUserData.description}
              <FaEdit
                style={editIcon}
                onClick={() => setEditDesc(true)}
              />
            </p>
          ) : (
            <>
              <textarea
                value={activeUserData.description}
                onChange={(e) =>
                  updateUserData({ description: e.target.value })
                }
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

          <button onClick={handleLike} style={likeBtn}>
            ❤️ {activeUserData.likes}
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
          {activeUserData.comments.length === 0 && (
            <p style={{ color: "#777" }}>Belum ada komentar...</p>
          )}

          {activeUserData.comments.map((c, index) => (
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
};

const topBar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const profileSection = { textAlign: "center" };

const avatarIcon = { fontSize: "90px", color: "#667eea" };

const avatarImage = {
  width: "90px",
  height: "90px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "3px solid #667eea",
};

const removeBtn = {
  marginTop: "10px",
  padding: "6px 12px",
  borderRadius: "8px",
  border: "none",
  background: "#dc3545",
  color: "white",
  cursor: "pointer",
  fontSize: "12px",
};

const descriptionText = { color: "#555", fontSize: "15px" };

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
};

const textarea = {
  width: "100%",
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  marginBottom: "10px",
  minHeight: "70px",
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
};

const logoutBtn = {
  background: "transparent",
  border: "none",
  fontSize: "18px",
  cursor: "pointer",
};

const commentBox = { display: "flex", flexDirection: "column" };

const commentItem = {
  background: "#f5f5f5",
  padding: "10px",
  borderRadius: "10px",
  marginBottom: "10px",
};

const titleCenter = { textAlign: "center" };

export default App;