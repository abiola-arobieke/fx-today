import { Link } from 'react-router-dom';

const backArrow = './back.png';

function Header() {
  return (
    <div className="header d-flex a-center">
      <Link to="/">
        <img className="back" src={backArrow} alt="back-arrow" />
      </Link>
      <h2 className="header-title txt-white a-center">fx-today</h2>
    </div>
  );
}
export default Header;
