import React from "react";
import Slider from "./Slider";

export default function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexWrap: "nowrap",
        position: "relative",
      }}
    >
      <Slider />
    </div>
  );
}
