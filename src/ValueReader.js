import React from "react";
import "./index.css";
import Copy from "./files.png";
function ValueReader() {
  function copyToClipboard(text) {
    const elem = document.createElement("textarea");
    elem.value = text;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
    alert(`Color code copied: ${text}`);
  }
  return (
    <div className="value_holder">
      <h6 className="Headding_values">RGB Values</h6>
      <div className="values_main_container">
        Hello
        <div className="hover_sense">
          <div className="hover_message">Click to copy </div>{" "}
          <img
            onClick={() => {
              copyToClipboard("Hello");
            }}
            src={Copy}
            id="right"
            className="logo_pro_image"
          ></img>
        </div>
      </div>
    </div>
  );
}

export default ValueReader;
