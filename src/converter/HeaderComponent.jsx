import { Link } from "react-router-dom";

function HeaderComponent() {
  return (
    <div className="p-3">
      <h2> Конвертер валют</h2>
      <Link to="/"> Назад</Link>
    </div>
  );
}

export default HeaderComponent;
