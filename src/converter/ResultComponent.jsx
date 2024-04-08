import PropTypes from "prop-types";

function parseInputString(inputStr) {
  let valNames = inputStr.split(" ");
  valNames.splice(1, 1);
  return [valNames[0], valNames[1]];
}

const findValByName = (valname, valutes) => {
  return valutes[valname];
};

function ResultComponent({ input, valutes, converterFunc }) {
  let resStr = "";

  if (input) {
    const [valname1, valname2] = parseInputString(input);
    if (!valname1 || !valname2) {
      resStr = 'Ошибка: формат ввода " Валюта1 in Валюта 2 "';
    } else {
      const val1 = findValByName(valname1, valutes);
      const val2 = findValByName(valname2, valutes);
      if (!val1) {
        resStr = "Ошибка: валюта " + valname1 + " не найдена";
      } else if (!val2) {
        resStr = "Ошибка: валюта " + valname2 + " не найдена";
      } else {
        const course = converterFunc(
          val1.Value,
          val1.Nominal,
          val2.Value,
          val2.Nominal
        );
        resStr =
          val1.CharCode + " = " + course.toFixed(4) + " " + val2.CharCode;
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
  );
}
ResultComponent.propTypes = {
  input: PropTypes.string.isRequired,
  valutes: PropTypes.object.isRequired,
  converterFunc: PropTypes.func.isRequired,
};

export default ResultComponent;
