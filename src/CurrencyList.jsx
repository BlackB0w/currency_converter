import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function CurrencyListHeader({ timestamp }) {
    const date = new Date(timestamp);
    
    const options ={
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
      };
    
    return (
        <div className="container p-3">
            <h2> Курсы валют ЦБ РФ </h2>
            <p>Последнее обновление: {date.toLocaleString('ru',options)}</p>
            <Link to='/converter'>Конвертер</Link>
        </div>
    )
}

function CurrencyListElem({ valute }) {
    let diff = (valute.Value - valute.Previous).toFixed(2);
    let arrow = Number(diff) > 0 ? '▲':'▼';
    return (
        <tr>
            <td scope="row">
                {valute.Name}
            </td>
            <td>
                {valute.CharCode}
            </td>
            <td>
                {valute.Nominal}
            </td>
            <td>
                {valute.Value}
            </td>
            <td>
                {diff + ' ' + arrow}
            </td>
        </tr>
    )
}

function CurrencyListBody({ valutes }) {
    const header = ["Валюта", "Букв. код", "Единиц", "Курс (RUB)", "Изменение"];
    valutes = valutes;
    return (
        <div className="p-3">
        <table className="table table-striped">
            <thead>
                <tr>{header.map((h, i) => <th  scope="col" key={i}>{h}</th>)}</tr>
            </thead>
            <tbody>
                {
                valutes != undefined 
                ?
                   Object.keys(valutes)?.map((k,i)=>{
                        let valute = valutes[k]
                        return(
                            <CurrencyListElem key={k} valute={valute}/>
                        )
                    })
                : null
                }
            </tbody>

        </table>
        </div>
    )
}


export function CurrencyList({convertingFunc}) {
    const [currencies, setCurrencies] = useState(1);
    const converterAPIURL = 'https://www.cbr-xml-daily.ru/daily_json.js';
    useEffect(
        () => {
            axios.get(converterAPIURL)
                .then((response) => {
                    setCurrencies(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }, []
    );

    return (<div className='container'>
        <CurrencyListHeader timestamp={currencies.Timestamp} />
        <CurrencyListBody valutes={currencies.Valute} />

    </div>)



}