/* eslint-disable import/no-unresolved */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import HeaderComponent from "./HeaderComponent";
import InputComponent from "./InputComponent";
import ResultComponent from "./ResultComponent";
const RUB = {
  ID: "R00000",
  NumCode: "643",
  CharCode: "RUB",
  Nominal: 1,
  Name: "Российский рубль",
  Value: 1,
  Previous: 1,
};

function ConverterComponent({ convertingFunc }) {
  const converterAPIURL = "https://www.cbr-xml-daily.ru/daily_json.js";
  const [valutes, setValutes] = useState();
  const [input, setInput] = useState();
  useEffect(() => {
    axios
      .get(converterAPIURL)
      .then((response) => {
        let valutesData = response.data.Valute;
        valutesData["RUB"] = RUB;
        setValutes(valutesData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleInput(inputStr) {
    setInput(inputStr);
  }

  return (
    <div className="container">
      <HeaderComponent />
      <InputComponent onInput={handleInput} />
      <ResultComponent
        input={input}
        valutes={valutes}
        converterFunc={convertingFunc}
      />
    </div>
  );
}
ConverterComponent.propTypes = {
  convertingFunc: PropTypes.func.isRequired,
};

export default ConverterComponent;
