import React from "react";

export const Layout = ({ children }) => (
  <div
    style={{
      width: "100vw",
      height: "100vh",
      backgroundColor: "#1c1c1c",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {children}
  </div>
);

export const Quote = ({ children }) => (
  <div
    style={{
      width: "50%",
      padding: "0.5em",
      backgroundColor: "#2c2c2c",
      borderLeft: "8px solid #4c4c4c",
      color: "#fff",
    }}
  >
    {children}
  </div>
);
