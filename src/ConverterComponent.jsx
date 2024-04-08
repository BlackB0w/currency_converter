import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const RUB = {
    "ID": "R00000",
    "NumCode": "001",
    "CharCode": "RUB",
    "Nominal": 1,
    "Name": "Рубль",
    "Value": 1,
    "Previous": 1
}


function parseInputString(inputStr) {
    let valNames = inputStr.split(" ");
    valNames.splice(1, 1);
    return [valNames[0], valNames[1]]
}

const findValByName = (valname, valutes) => { return valutes[valname] }

function HeaderComponent() {
    return (
        <div className="p-3">
            <h2> Конвертер валют</h2>
            <Link to="/"> Назад</Link>
        </div>

    )
}

function InputComponent({ onInput }) {

    function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        let data = Object.fromEntries(formData.entries()).convertInput;
        onInput(data);
    }

    return (
        <div className="p-3 ">
            <p>Введите запрос формата "Валюта1 in Валюта2": </p>
            <form method="post" onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <input className="form-control" name="convertInput" defaultValue="USD in RUB" />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="submit">Конвертировать</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

function ResultComponent({ input, valutes, converterFunc }) {
    let resStr = "";

    if (input) {
        const [valname1, valname2] = parseInputString(input);
        if (!valname1 || !valname2) {
            resStr = 'Ошибка: формат ввода \" Валюта1 in Валюта 2 \"'
        }
        else {
            const val1 = findValByName(valname1, valutes);
            const val2 = findValByName(valname2, valutes);
            if (!val1) { resStr = 'Ошибка: валюта ' + valname1 + ' не найдена' } else
                if (!val2) { resStr = 'Ошибка: валюта ' + valname2 + ' не найдена' } else {
                    const course = converterFunc(val1.Value, val1.Nominal, val2.Value, val2.Nominal);
                    resStr = val1.CharCode + ' = ' + course.toFixed(4) + ' ' + val2.CharCode;
                }

        }

    }


    return (
        <div className="container">
            <div className="p-3 border bg-light">
                <h5>Ответ: </h5>
                <p>{resStr}</p>
            </div>
        </div>

    )
}

export function ConverterComponent({ convertingFunc }) {



    const converterAPIURL = 'https://www.cbr-xml-daily.ru/daily_json.js';
    const [valutes, setValutes] = useState();
    const [input, setInput] = useState();
    useEffect(
        () => {
            axios.get(converterAPIURL)
                .then((response) => {
                    let valutesData = response.data.Valute;
                    valutesData["RUB"] = RUB;
                    setValutes(valutesData);
                })
                .catch((error) => {
                    console.error(error);
                });
        }, []
    );


    function handleInput(inputStr) {
        setInput(inputStr)
    }

    return (
        <div className="container">
            <HeaderComponent />
            <InputComponent onInput={handleInput} />
            <ResultComponent input={input} valutes={valutes} converterFunc={convertingFunc} />
        </div>
    )
}