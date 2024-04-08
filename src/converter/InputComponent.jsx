import PropTypes from "prop-types";

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
      <p>Введите запрос формата Валюта1 in Валюта2: </p>
      <form method="post" onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            className="form-control"
            name="convertInput"
            defaultValue="USD in RUB"
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="submit">
              Конвертировать
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
InputComponent.propTypes = {
  onInput: PropTypes.func.isRequired
}

export default InputComponent;
