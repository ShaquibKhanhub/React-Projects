import { useEffect, useRef, useState } from "react";
import "./Input.css";

const Input = () => {
  const emptyArr = ["", "", "", ""];
  const refs = [useRef(), useRef(), useRef(), useRef()];
  const [inputs, setInputs] = useState(emptyArr);
  const [missing, setMissing] = useState(emptyArr);
  const CODE = "1234";

  const handleInput = (e, ind) => {
    const val = e.target.value;
    if (!Number(val)) {
      return;
    }
    if (ind < inputs.length - 1) {
      refs[ind + 1].current.focus();
    }
    const copyInp = [...inputs];
    copyInp[ind] = val;
    setInputs(copyInp);
  };

  const handleOnkeyDown = (e, i) => {
    if (e.keyCode === 8) {
      const copyInputs = [...inputs];
      copyInputs[i] = "";
      setInputs(copyInputs);
      if (i > 0) {
        refs[i - 1].current.focus();
      }
    }
  };
  const handlePaste = (e) => {
    const copy = e.clipboardData.getData("text");
    if (!Number(copy) || copy.length !== inputs.length) return;

    const pasteData = copy.split("");
    setInputs(pasteData);
    refs[inputs.length - 1].current.focus();
  };

  const handleSubmit = () => {
    const missed = inputs
      .map((item, i) => {
        if (item === "") {
          return i;
        }
      })
      .filter((item) => item || item === 0);
    setMissing(missed);
    if (missed.length) {
      return;
    }

    const userInput = inputs.join("");
    const isMatch = userInput === CODE;
    const msg = isMatch ? "Code is Valid" : "Code is not Valid";
    alert(msg);
    console.log("missed", missed);
  };

  useEffect(() => {
    refs[0].current.focus();
  }, []);
  return (
    <div className="box1">
      <div className="cont">
        <h1>Enter OTP</h1>

        {emptyArr.map((inp, i) => (
          <input
            value={inputs[i]}
            type="text"
            key={i}
            maxLength={1}
            ref={refs[i]}
            onChange={(e) => handleInput(e, i)}
            onKeyDown={(e) => handleOnkeyDown(e, i)}
            onPaste={(e) => handlePaste(e, i)}
            className={missing.includes(i) ? "error" : ""}
          />
        ))}

        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Input;
