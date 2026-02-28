import { useState, useEffect } from "react";
import { FaHeart, FaMoon, FaSun, FaUserCircle } from "react-icons/fa";

function App() {
  const [likes, setLikes] = useState(
    Number(localStorage.getItem("likes")) || 0
  );
  const [darkMode, setDarkMode] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    localStorage.setItem("likes", likes);
  }, [likes]);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div style={darkMode ? darkContainer : lightContainer}>
      <div style={cardStyle}>
        <div style={topBar}>
          <h2>🌟 Web Apresiasi Profil</h2>
          <button onClick={toggleDarkMode} style={iconBtn}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        <div style={{ textAlign: "center" }}>
          {image ? (
            <img src={image} alt="profile" style={imgStyle} />
          ) : (
            <FaUserCircle size={120} />
          )}

          <h3>Rahmaniarti</h3>
          <p>Mahasiswa kreatif, inovatif, dan berprestasi di bidang teknologi.</p>

          <input type="file" onChange={handleImageUpload} />

          <div style={{ marginTop: "20px" }}>
            <button onClick={handleLike} style={likeBtn}>
              <FaHeart /> Like ({likes})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== STYLE ===== */

const lightContainer = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  transition: "0.5s",
};

const darkContainer = {
  ...lightContainer,
  background: "linear-gradient(135deg, #1e1e2f, #121212)",
};

const cardStyle = {
  background: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(15px)",
  padding: "30px",
  borderRadius: "20px",
  width: "350px",
  color: "white",
  boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
  transition: "0.5s",
};

const imgStyle = {
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  objectFit: "cover",
  marginBottom: "10px",
  transition: "0.3s",
};

const likeBtn = {
  padding: "10px 20px",
  background: "#ff4d6d",
  border: "none",
  borderRadius: "10px",
  color: "white",
  cursor: "pointer",
  fontSize: "16px",
  transition: "0.3s",
};

const iconBtn = {
  background: "transparent",
  border: "none",
  color: "white",
  fontSize: "20px",
  cursor: "pointer",
};

const topBar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

export default App;