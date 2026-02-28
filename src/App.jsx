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
    setLikes((prev) => prev + 1);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className={darkMode ? "container dark" : "container"}>
      <div className="card">
        <div className="top">
          <h2>🌟 Web Apresiasi Profil</h2>
          <button onClick={() => setDarkMode(!darkMode)} className="iconBtn">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        <div className="profile">
          {image ? (
            <img src={image} alt="profile" />
          ) : (
            <FaUserCircle size={120} />
          )}

          <h3>Rahmaniarti</h3>
          <p>
            Mahasiswa kreatif, inovatif, dan berprestasi di bidang teknologi.
          </p>

          <input type="file" onChange={handleImageUpload} />

          <button onClick={handleLike} className="likeBtn">
            <FaHeart /> {likes} Apresiasi
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;