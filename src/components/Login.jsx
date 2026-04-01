import { useState } from "react";
import { useStore } from "../store/useStore";

function Login() {
  const [username, setUsername] = useState("");
  const login = useStore((state) => state.login);

  const handleLogin = () => {
    if (!username.trim()) return;
    login(username);
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>🌟 Profil Apresiasi</h1>
        <p style={subtitleStyle}>
          Masuk untuk melihat dan memberikan apresiasi
        </p>

        <input
          type="text"
          placeholder="Masukkan username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleLogin} style={buttonStyle}>
          Masuk
        </button>
      </div>
    </div>
  );
}

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  padding: "20px",
};

const cardStyle = {
  background: "rgba(255, 255, 255, 0.95)",
  padding: "40px 30px",
  borderRadius: "24px",
  boxShadow: "0 12px 40px rgba(0, 0, 0, 0.12)",
  textAlign: "center",
  width: "100%",
  maxWidth: "420px",
  backdropFilter: "blur(8px)",
};

const titleStyle = {
  fontSize: "2rem",
  fontWeight: "700",
  color: "#2e7d32",
  marginBottom: "10px",
};

const subtitleStyle = {
  fontSize: "1rem",
  color: "#666",
  marginBottom: "25px",
};

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "14px",
  border: "1px solid #d6d6d6",
  outline: "none",
  fontSize: "1rem",
  marginBottom: "18px",
  transition: "0.3s ease",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  background: "linear-gradient(135deg, #66bb6a, #43a047)",
  color: "white",
  fontSize: "1rem",
  fontWeight: "600",
  cursor: "pointer",
  transition: "0.3s ease",
};

export default Login;