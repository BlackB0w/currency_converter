/* eslint-disable import/no-unresolved */
import CurrencyListElem from "./CurrencyListElem";
import PropTypes from "prop-types";

function CurrencyListBody({ valutes }) {
  const header = ["Валюта", "Букв. код", "Единиц", "Курс (RUB)", "Изменение"];
  return (
    <div className="p-3">
      <table className="table table-striped">
        <thead>
          <tr>
            {header.map((h, i) => (
              <th scope="col" key={i}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {valutes != undefined
            ? Object.keys(valutes)?.map((k, i) => {
                let valute = valutes[k];
                return <CurrencyListElem key={i} valute={valute} />;
              })
            : null}
        </tbody>
      </table>
    </div>
  );
}
CurrencyListBody.propTypes = {
  valutes: PropTypes.object.isRequired,
};

export default CurrencyListBody;
