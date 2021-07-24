import React from "react";
import "./index.css";
import Copy from "./files.png";
function ValueReader({ Value, main_header }) {
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
      <h6 className="Headding_values">{main_header}</h6>
      <div className="values_main_container">
        <p
          style={{
            border: "1px solid gray",
            padding: "0.5rem",
            minWidth: "25rem",

            marginRight: "1.2rem",
          }}
        >
          {" "}
          {Value}
        </p>

        <div className="hover_sense">
          <img
            onClick={() => {
              console.log(Value);
              copyToClipboard(`${Value}`);
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
