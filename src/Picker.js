import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import Hue from "./Hue";
import Square from "./Square";
import Input from "./Input";
import config from "./config";
import "./main.css";
const { squareSize, barSize, crossSize, inputSize } = config;

export const PickerWrapper = styled.div`
  user-select: none;
  .swatch {
    width: 20rem;
    height: 20rem;
    background: ${(p) => p.color};
  }
`;

export const PickerOuter = styled.div`
  width: ${squareSize + 20}px;
  display: grid;
  border-radius: 2px;
  background: #ffffff;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.3);
`;

export const PickerInner = styled.div`
  display: grid;
  grid-template-rows: ${squareSize + 20}px ${barSize}px ${inputSize}px;
  align-items: center;
  justify-items: center;
`;

export const Inputs = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-items: center;
`;

function computeHueX(h) {
  return Math.round((squareSize / 360) * h - barSize / 2);
}

function computeSquareXY(s, l) {
  const t = (s * (l < 50 ? l : 100 - l)) / 100;
  const s1 = Math.round((200 * t) / (l + t)) | 0;
  const b1 = Math.round(t + l);
  const x = (squareSize / 100) * s1 - crossSize / 2;
  const y = squareSize - (squareSize / 100) * b1 - crossSize / 2;
  return [x, y];
}

const Picker = () => {
  const [show, setShow] = useState(false);
  const [hexval, sethexval] = useState("");
  const [hue, setHue] = useState(180);
  const [hueX, setHueX] = useState(() => squareSize / 2 - barSize / 2);
  const [square, setSquare] = useState([100, 50]);
  const [rgb, setrgb] = useState([]);
  const [squareXY, setSquareXY] = useState(() => [
    squareSize - crossSize / 2,
    crossSize / -2,
  ]);
  const [offsetTop, setOffsetTop] = useState(0);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [color, setColor] = useState(`hsla(180, 100%, 50%, 1)`);
  const [animate, setAnimate] = useState(false);

  const modal = useRef(null);

  useEffect(() => {
    function setOffsets() {
      setOffsetTop(modal.current.offsetTop);
      setOffsetLeft(modal.current.offsetLeft);
    }
    if (show) {
      setOffsets();
      window.addEventListener("resize", setOffsets);
    } else {
      window.removeEventListener("resize", setOffsets);
    }

    return () => {
      window.removeEventListener("resize", setOffsets);
    };
  }, [show]);

  useEffect(() => {
    setColor(`hsla(${hue}, ${square[0]}%, ${square[1]}%, 1)`);
    hslToHex(hue, square[0], square[1]);
  }, [hue, square]);

  function onHueChange(n) {
    setAnimate(true);
    setHue(n);
    setHueX(computeHueX(n));
  }

  function onSaturationChange(n) {
    setAnimate(true);
    setSquare([n, square[1]]);
    setSquareXY(computeSquareXY(n, square[1]));
  }

  function onLightnessChange(n) {
    setAnimate(true);
    setSquare([square[0], n]);
    setSquareXY(computeSquareXY(square[0], n));
  }
  function hslToHex(h, s, l) {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0"); // convert to Hex and prefix "0" if needed
    };
    sethexval(`#${f(0)}${f(8)}${f(4)}`);
    hexToRgb(`#${f(0)}${f(8)}${f(4)}`);
  }
  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    setrgb(result);
    console.log(
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    );
    rgb2hwb(
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    );
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }
  function rgb2hwb(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    var f,
      i,
      w = Math.min(r, g, b);
    var v = Math.max(r, g, b);
    var black = 1 - v;

    if (v === w) return { h: 0, w: w, b: black };
    f = r === w ? g - b : g === w ? b - r : r - g;
    i = r === w ? 3 : g === w ? 5 : 1;
    console.log({ h: ((i - f / (v - w)) / 6) * 100, w: w, b: black });

    return { h: (i - f / (v - w)) / 6, w: w, b: black };
  }
  return (
    <>
      <PickerWrapper color={color}>
        <div className="swatch" onClick={() => setShow(true)} />
        <Modal modal={modal} show={show} onClose={() => setShow(false)}>
          <PickerOuter>
            <PickerInner>
              <Square
                hue={hue}
                squareXY={squareXY}
                offsetTop={offsetTop}
                offsetLeft={offsetLeft}
                animate={animate}
                setSquare={setSquare}
                setSquareXY={setSquareXY}
                setAnimate={setAnimate}
              />
              <Hue
                hueX={hueX}
                offsetLeft={offsetLeft}
                animate={animate}
                setHueX={setHueX}
                setHue={setHue}
                setAnimate={setAnimate}
              />
              <Inputs>
                <Input
                  label="H"
                  value={hue}
                  min={0}
                  max={360}
                  defaultValue={180}
                  setValue={onHueChange}
                />
                <Input
                  label="S"
                  value={square[0]}
                  min={0}
                  max={100}
                  defaultValue={100}
                  setValue={onSaturationChange}
                />
                <Input
                  label="L"
                  value={square[1]}
                  min={0}
                  max={100}
                  defaultValue={50}
                  setValue={onLightnessChange}
                />
              </Inputs>
              <Inputs>
                <Input
                  label="R"
                  value={parseInt(rgb[1], 16)}
                  min={0}
                  max={360}
                  defaultValue={180}
                  setValue={onHueChange}
                />
                <Input
                  label="G"
                  value={parseInt(rgb[2], 16)}
                  min={0}
                  max={100}
                  defaultValue={100}
                  setValue={onSaturationChange}
                />
                <Input
                  label="B"
                  value={parseInt(rgb[3], 16)}
                  min={0}
                  max={100}
                  defaultValue={50}
                  setValue={onLightnessChange}
                />
              </Inputs>
              <Inputs
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: "1.2rem",
                }}
              >
                <Input
                  label="Hex"
                  value={hexval}
                  min={0}
                  max={360}
                  defaultValue={180}
                  setValue={onHueChange}
                />
              </Inputs>
            </PickerInner>
          </PickerOuter>
        </Modal>
      </PickerWrapper>
    </>
  );
};

export default Picker;
