import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLessThan } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <div className="header d-flex a-center">
      <Link to="/">
        <FontAwesomeIcon className="txt-white" icon={faLessThan} />
      </Link>
      <h2 className="header-title txt-white a-center">FX-Today</h2>
    </div>
  );
}
export default Header;
