import React, { useState } from "react";
import ReactDOM from "react-dom";

import Picker from "./Picker";

import { GlobalStyle } from "./GlobalStyle";
import Head from "./head";
import "./index.css";
import ValueReader from "./ValueReader";

function App() {
  const [changedHex, changeHex] = useState("");
  const [changedHsl, changeHsl] = useState("");
  const [changedRgb, changeRgb] = useState("");
  function LightenDarkenColor(col, amt) {
    col = parseInt(col, 16);
    return (
      ((col & 0x0000ff) + amt) |
      ((((col >> 8) & 0x00ff) + amt) << 8) |
      (((col >> 16) + amt) << 16)
    ).toString(16);
  }

  // TEST
  console.log(LightenDarkenColor("3F6D2A", 40));
  return (
    <>
      <Head shadowcolor={changedHex} />
      <GlobalStyle />
      <div className="divider">
        <div className="wrapper">
          <div className="wrapper_inner">
            <p>Click on the color switch to edit</p>
            <Picker
              changeHex={(word) => changeHex(word)}
              changeRgb={(word) => changeRgb(word)}
              changeHsl={(word) => changeHsl(word)}
            />
            <ValueReader Value={changedRgb} main_header="RGB Values" />
            <ValueReader Value={changedHsl} main_header="HSLA Values" />
            <ValueReader Value={changedHex} main_header="HEX Values" />
          </div>
        </div>
        <div className="wrapper" id="divone">
          Color shades coming soon
        </div>
      </div>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
