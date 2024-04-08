/* eslint-disable import/no-unresolved */
import { useState, useEffect } from "react";
import axios from "axios";
import CurrencyListHeader from "./CurrencyListHeader";
import CurrencyListBody from "./CurrencyListBody";

function CurrencyList() {
  const [currencies, setCurrencies] = useState(null);
  const converterAPIURL = "https://www.cbr-xml-daily.ru/daily_json.js";
  useEffect(() => {
    axios
      .get(converterAPIURL)
      .then((response) => {
        setCurrencies(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container">
      <CurrencyListHeader timestamp={currencies.Timestamp} />
      <CurrencyListBody valutes={currencies.Valute} />
    </div>
  );
}

export default CurrencyList;
