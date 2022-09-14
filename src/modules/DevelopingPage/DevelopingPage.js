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
      <h1 style={{ color: "#fff" }}>Trang đang trong quá trình phát triển</h1>
      <h1 style={{ color: "#fff" }}>Vui lòng quay lại sau</h1>
    </div>
  );
};

export default DevelopingPage;
