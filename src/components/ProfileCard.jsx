function ProfileCard(props) {
  return (
    <div style={cardStyle}>
      <img
        src={props.foto}
        alt="foto"
        style={{ width: "120px", borderRadius: "50%" }}
      />
      <h2>{props.nama}</h2>
      <p>{props.deskripsi}</p>
    </div>
  );
}

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "15px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  textAlign: "center",
  width: "300px",
};

export default ProfileCard;