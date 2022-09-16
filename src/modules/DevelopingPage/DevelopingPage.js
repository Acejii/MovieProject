import React from "react";

const style = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px 30px",
  color: "#fff",
};

const DevelopingPage = () => {
  return (
    <div style={style}>
      <h1 style={{ color: "#fff", textAlign: "center" }}>
        Trang đang trong quá trình phát triển
      </h1>
      <p style={{ color: "#fff", textAlign: "center" }}>
        Vui lòng quay lại sau
      </p>
    </div>
  );
};

export default DevelopingPage;
