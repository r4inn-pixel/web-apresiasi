import { useState } from "react";
import { useStore } from "../store/useStore";

function CommentSection() {
  const [text, setText] = useState("");

  const user = useStore((s) => s.user);
  const comments = useStore((s) => s.usersData[user]?.comments || []);
  const addComment = useStore((s) => s.addComment);
  const deleteComment = useStore((s) => s.deleteComment);

  const handleSubmit = () => {
    if (!text.trim()) return;
    addComment(text);
    setText("");
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Komentar</h3>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Tulis komentar..."
        style={{
          padding: "10px",
          width: "250px",
          marginRight: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 16px",
          border: "none",
          borderRadius: "8px",
          backgroundColor: "#4caf50",
          color: "white",
          cursor: "pointer",
        }}
      >
        Kirim
      </button>

      <div style={{ marginTop: "20px" }}>
        {comments.length === 0 ? (
          <p>Belum ada komentar.</p>
        ) : (
          comments.map((c, i) => (
            <div
              key={i}
              style={{
                background: "#f5f5f5",
                padding: "12px",
                margin: "10px auto",
                borderRadius: "10px",
                width: "300px",
              }}
            >
              <b>{c.name}</b>
              <p>{c.text}</p>

              {c.name === user && (
                <button
                  onClick={() => deleteComment(i)}
                  style={{
                    padding: "6px 12px",
                    border: "none",
                    borderRadius: "6px",
                    backgroundColor: "#e53935",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Hapus
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CommentSection;