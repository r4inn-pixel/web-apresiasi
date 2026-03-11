import { useState } from "react";
import { useStore } from "../store/useStore";

function CommentSection() {
  const user = useStore((state) => state.user);
  const usersData = useStore((state) => state.usersData);
  const updateUser = useStore((state) => state.updateUser);

  const [comment, setComment] = useState("");

  const comments = usersData[user]?.comments || [];

  // TAMBAH KOMENTAR
  const addComment = () => {
    if (comment.trim() === "") return;

    updateUser({
      comments: [...comments, { name: user, text: comment }],
    });

    setComment("");
  };

  // HAPUS KOMENTAR
  const deleteComment = (indexToDelete) => {
    const updatedComments = comments.filter(
      (_, index) => index !== indexToDelete
    );

    updateUser({
      comments: updatedComments,
    });
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>💬 Komentar</h3>

      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Tulis komentar..."
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          width: "100%",
          marginBottom: "10px",
          boxSizing: "border-box",
        }}
      />

      <button
        onClick={addComment}
        style={{
          padding: "10px 20px",
          background: "#667eea",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Kirim
      </button>

      <div style={{ marginTop: "15px" }}>
        {comments.map((c, i) => (
          <div
            key={i}
            style={{
              background: "#f5f5f5",
              padding: "10px",
              borderRadius: "8px",
              marginTop: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <b style={{ color: "#4a5568" }}>{c.name}</b>
              <p style={{ margin: "5px 0 0 0" }}>{c.text}</p>
            </div>

            {/* Tombol hapus hanya untuk komentar milik user */}
            {c.name === user && (
              <button
                onClick={() => deleteComment(i)}
                style={{
                  background: "#ff4d6d",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "5px 10px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                Hapus
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;