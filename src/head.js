import React from "react";
import "./index.css";
function Head({ shadowcolor }) {
  return (
    <div
      className="header_part"
      style={{ boxShadow: `5px 5px 22px ${shadowcolor}` }}
    >
      <div className="main_part">
        <h1 className="heading" style={{ color: `${shadowcolor}` }}>
          Colors
        </h1>
        <p className="description">
          One stop destination for chossing colors for development
        </p>
      </div>
    </div>
  );
}

export default Head;
