import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function CurrencyListHeader({ timestamp }) {
  const date = new Date(timestamp);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timezone: "UTC",
    hour: "numeric",
    minute: "numeric",
  };

  return (
    <div className="container p-3">
      <h2> Курсы валют ЦБ РФ </h2>
      <p>Последнее обновление: {date.toLocaleString("ru", options)}</p>
      <Link to="/converter">Конвертер</Link>
    </div>
  );
}
CurrencyListHeader.propTypes = {
  timestamp: PropTypes.date.isRequired,
};

export default CurrencyListHeader;
