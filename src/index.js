import React from "react";
import ReactDOM from "react-dom";

import Picker from "./Picker";

import { GlobalStyle } from "./GlobalStyle";
import Head from "./head";
import "./index.css";
import ValueReader from "./ValueReader";

function App() {
  return (
    <>
      <Head />
      <GlobalStyle />
      <div className="divider">
        <div className="wrapper">
          <div className="wrapper_inner">
            <p>Click on the color switch</p>
            <Picker />
          </div>
        </div>
        <div className="wrapper" id="divone">
          color shades
        </div>
      </div>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
