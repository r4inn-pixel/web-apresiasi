import { useState } from "react";
import { useStore } from "../store/useStore";
import { FaTrash } from "react-icons/fa";

function CommentSection() {
  const user = useStore((state) => state.user);
  const usersData = useStore((state) => state.usersData);
  const updateUser = useStore((state) => state.updateUser);

  const [newComment, setNewComment] = useState("");

  const activeUserData = usersData[user] || {};

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    updateUser({
      comments: [
        ...activeUserData.comments,
        { name: user, text: newComment },
      ],
    });

    setNewComment("");
  };

  // fungsi hapus komentar
  const handleDeleteComment = (index) => {
    const updatedComments = activeUserData.comments.filter(
      (_, i) => i !== index
    );

    updateUser({
      comments: updatedComments,
    });
  };

  return (
    <div>
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
        {activeUserData.comments?.length === 0 && (
          <p style={{ color: "#777" }}>Belum ada komentar...</p>
        )}

        {activeUserData.comments?.map((c, index) => (
          <div key={index} style={commentItem}>
            <div style={commentHeader}>
              <b>{c.name.charAt(0).toUpperCase() + c.name.slice(1)}</b>

              <button
                onClick={() => handleDeleteComment(index)}
                style={deleteBtn}
              >
                <FaTrash />
              </button>
            </div>

            <p style={{ margin: "5px 0 0" }}>{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const input = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  marginBottom: "10px",
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

const commentHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const deleteBtn = {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  color: "#ff4d6d",
};

export default CommentSection;