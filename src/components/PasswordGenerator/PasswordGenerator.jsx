import React, { useEffect, useState } from "react";
import "./PasswordGenerator.css";
import copyIcon from "../../assets/copy-icon.svg";
import { ToastContainer, toast } from "react-toastify";

const lowercaseList = "abcdefghijklmnopqrstuvwxyz";
const uppercaseList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbersList = "0123456789";
const symbolsList = "!@#$%^&*()?";

function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [passwordLength, setPasswordLength] = useState(8);
  const [selectedChoices, setSelectedChoices] = useState([
    "lowercase",
    "uppercase",
    "numbers",
    "symbols",
  ]);

  useEffect(() => {
    generatePassword();
  }, [passwordLength]);

  const handleCheckbox = (type) => {
    let tempChoices = selectedChoices;
    if (tempChoices.includes(type)) {
      const index = tempChoices.indexOf(type);
      tempChoices.splice(index, 1);
    } else {
      tempChoices.push(type);
    }
    setSelectedChoices(tempChoices);
  };

  const generatePassword = () => {
    let charactersList = "";

    if (lowerCase) charactersList += lowercaseList;
    if (upperCase) charactersList += uppercaseList;
    if (numbers) charactersList += numbersList;
    if (symbols) charactersList += symbolsList;

    let tempPassword = [];
    const characterListLength = charactersList.length;
    const choiceMap = {
      lowercase: lowercaseList,
      uppercase: uppercaseList,
      numbers: numbersList,
      symbols: symbolsList,
    };

    selectedChoices.forEach((choice) => {
      const list = choiceMap[choice];
      const randomIndex = Math.floor(Math.random() * list.length);
      tempPassword.push(list.charAt(randomIndex));
    });

    for (let i = 0; i < passwordLength - selectedChoices.length; i++) {
      const characterIndex = Math.floor(Math.random() * characterListLength);
      tempPassword.push(charactersList.charAt(characterIndex));
    }

    function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    tempPassword = shuffle(tempPassword);

    setPassword(tempPassword.join(""));
  };

  const copyPassword = () => {
    const textArea = document.createElement("textarea");
    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();

    toast.success("Password copied!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      <div className="container">
        <h2 className="title">Password Generator</h2>
        <div className="password-wrapper">
          <div className="password-area">
            <div className="password">
              <input
                type="text"
                value={password}
                disabled
                placeholder="Click on the Generate Password"
              />
              <img
                src={copyIcon}
                alt="copyicon"
                className="copyIcon"
                onClick={copyPassword}
              />
            </div>
          </div>
        </div>
        <div className="password-length">
          <div className="slider">
            <p className="rangeValue">{passwordLength}</p>
            <div className="range">
              <input
                type="range"
                min={8}
                max={40}
                defaultValue={passwordLength}
                onChange={(e) => setPasswordLength(e.currentTarget.value)}
              />
            </div>
          </div>
        </div>
        <div className="setting">
          <div className="customize">
            <div className="checkboxes">
              <div className="left">
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    name="lower"
                    id="lower"
                    disabled={
                      selectedChoices.length === 1 &&
                      selectedChoices.includes("lowercase")
                    }
                    checked={lowerCase}
                    onChange={() => {
                      setLowerCase(!lowerCase);
                      handleCheckbox("lowercase");
                    }}
                  />
                  <label htmlFor="lower">LowerCase(a-z)</label>
                </div>
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    name="upper"
                    id="upper"
                    disabled={
                      selectedChoices.length === 1 &&
                      selectedChoices.includes("uppercase")
                    }
                    checked={upperCase}
                    onChange={() => {
                      setUpperCase(!upperCase);
                      handleCheckbox("uppercase");
                    }}
                  />
                  <label htmlFor="upper">UpperCase(A-Z)</label>
                </div>
              </div>
              <div className="right">
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    name="numbers"
                    id="numbers"
                    disabled={
                      selectedChoices.length === 1 &&
                      selectedChoices.includes("numbers")
                    }
                    checked={numbers}
                    onChange={() => {
                      setNumbers(!numbers);
                      handleCheckbox("numbers");
                    }}
                  />
                  <label htmlFor="numbers">Numbers(0-9)</label>
                </div>
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    name="symbols"
                    id="symbols"
                    checked={symbols}
                    disabled={
                      selectedChoices.length === 1 &&
                      selectedChoices.includes("symbols")
                    }
                    onChange={() => {
                      setSymbols(!symbols);
                      handleCheckbox("symbols");
                    }}
                  />
                  <label htmlFor="symbols">Symbols(&-#)</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="buttons">
          <button type="button" onClick={generatePassword}>
            Generate Password
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default PasswordGenerator;
