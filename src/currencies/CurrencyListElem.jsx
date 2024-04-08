import PropTypes from "prop-types";

function CurrencyListElem({ valute }) {
  let diff = (valute.Value - valute.Previous).toFixed(2);
  let arrow = Number(diff) > 0 ? "▲" : "▼";
  return (
    <tr>
      <td scope="row">{valute.Name}</td>
      <td>{valute.CharCode}</td>
      <td>{valute.Nominal}</td>
      <td>{valute.Value}</td>
      <td>{diff + " " + arrow}</td>
    </tr>
  );
}
CurrencyListElem.propTypes = {
  valute: PropTypes.shape({
    Value: PropTypes.number.isRequired,
    Previous: PropTypes.number.isRequired,
    Name: PropTypes.string.isRequired,
    CharCode: PropTypes.string.isRequired,
    Nominal: PropTypes.number.isRequired,
  }),
};

export default CurrencyListElem;
