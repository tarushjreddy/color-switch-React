import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Picker from "./Picker";

import { GlobalStyle } from "./GlobalStyle";
import Head from "./head";
import "./index.css";

function App() {
  return (
    <>
      <Head />
      <GlobalStyle />
      <div className="wrapper">
        <div className="wrapper_inner">
          <Picker />
          <div className="value_holder">
            <h6 className="Headding_values">RGB Values</h6>
            <div className="values_main_container">Hello</div>
          </div>
        </div>
      </div>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
