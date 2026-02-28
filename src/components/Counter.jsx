import { useState } from "react";

function Counter(props) {
  const [hitung, setHitung] = useState(0);

  const tambah = () => {
    setHitung(hitung + 1);
  };

  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <h3>{props.judul}</h3>
      <h2>{hitung}</h2>
      <button onClick={tambah} style={btnStyle}>
        Beri Apresiasi ❤️
      </button>
    </div>
  );
}

const btnStyle = {
  padding: "10px 20px",
  backgroundColor: "#ff4d6d",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export default Counter;