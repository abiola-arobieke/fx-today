import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  imageExist,
  placeholderImageUrl,
} from '../../utility/imagePlaceholder';
import '../../styles/exchange.css';

const ExchangeItem = ({ currency, amount }) => {
  const [currencyImage, setCurrencyImage] = useState(placeholderImageUrl);
  useEffect(() => {
    imageExist(currency.flag).then((imgUrl) => {
      setCurrencyImage(imgUrl);
    });
  }, [currency.flag]);

  const detailUrl = `/currency/${currency.code}`;

  return (
    <li className="container">
      <Link to={detailUrl}>
        <div className="info">
          <div className="d-flex spc-btw">
            <div className="img-wrap">
              <img className="flag" src={currencyImage} alt="str" />
            </div>
            <div>
              <h3>{currency.code}</h3>
              <div className="title word h-40">{currency.name}</div>
            </div>
          </div>
          <div className="rate d-flex spc-btw-25 a-center">
            <div className="ft-sm">
              <span>
                {amount}
              </span>
              <span> USD</span>
            </div>
            <div>
              <span>~ </span>
              <span className="word">{(currency.rateNow * amount).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

ExchangeItem.propTypes = {
  currency: PropTypes.instanceOf(Object).isRequired,
  amount: PropTypes.number.isRequired,
};

export default ExchangeItem;
