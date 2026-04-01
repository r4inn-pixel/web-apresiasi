import { useState } from "react";
import { useStore } from "../store/useStore";

function Dashboard() {
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const addLike = useStore((state) => state.addLike);
  const addComment = useStore((state) => state.addComment);
  const updateBio = useStore((state) => state.updateBio);
  const updatePhoto = useStore((state) => state.updatePhoto);
  const removePhoto = useStore((state) => state.removePhoto);

  const userData = useStore((state) => state.usersData[user]);
  const likes = userData?.likes || 0;
  const comments = userData?.comments || [];
  const profile = userData?.profile || {};

  const [newComment, setNewComment] = useState("");
  const [editDesc, setEditDesc] = useState(false);
  const [bioInput, setBioInput] = useState(profile.bio || "");

  const handleComment = () => {
    if (!newComment.trim()) return;
    addComment(newComment);
    setNewComment("");
  };

  const handleSaveBio = () => {
    updateBio(bioInput);
    setEditDesc(false);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    updatePhoto(imageUrl);
  };

  return (
    <div className="dashboard-page">
      <div className="profile-card">
        <div className="top-bar">
          <h1>🌟 Web Apresiasi</h1>
          <button className="logout-icon" onClick={logout}>⎋</button>
        </div>

        <div className="profile-section">
          <img
            src={profile.photo || "https://via.placeholder.com/120"}
            alt="Foto Profil"
            className="profile-image"
          />

          <div className="photo-actions">
            <label className="upload-label">
              Pilih Foto
              <input type="file" accept="image/*" hidden onChange={handlePhotoUpload} />
            </label>

            <button className="delete-photo-btn" onClick={removePhoto}>
              🗑 Hapus Foto
            </button>
          </div>

          <h2 className="profile-name">{profile.name || user}</h2>

          {editDesc ? (
            <div className="bio-edit">
              <textarea
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
              />
              <div className="bio-buttons">
                <button onClick={handleSaveBio}>Simpan</button>
                <button onClick={() => setEditDesc(false)}>Batal</button>
              </div>
            </div>
          ) : (
            <p className="profile-bio">
              {profile.bio || "Belum ada deskripsi"}
              <button className="edit-bio-btn" onClick={() => setEditDesc(true)}>
                ✏
              </button>
            </p>
          )}

          <button className="like-btn" onClick={addLike}>
            💖 {likes}
          </button>
        </div>

        <hr />

        <div className="comment-section">
          <h3>💬 Komentar</h3>

          <input
            type="text"
            className="comment-input"
            placeholder="Tulis komentar..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />

          <button className="send-btn" onClick={handleComment}>
            Kirim
          </button>

          <div className="comment-list">
            {comments.length === 0 ? (
              <p className="empty-comment">Belum ada komentar...</p>
            ) : (
              comments.map((comment, index) => (
                <div key={index} className="comment-item">
                  {comment}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;