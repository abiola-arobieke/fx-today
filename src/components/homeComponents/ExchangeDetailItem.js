import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import {
  imageExist,
  placeholderImageUrl,
} from '../../utility/imagePlaceholder';

const ExchangeDetailItem = ({ currency }) => {
  const [currencyImage, setCurrencyImage] = useState(placeholderImageUrl);
  useEffect(() => {
    imageExist(currency.flag).then((imgUrl) => {
      setCurrencyImage(imgUrl);
    });
  }, [currency.flag]);

  return (
    <li className="details">
      <div className="d-flex">
        <div className="md-6">
          <div className="d-flex spc-btw">
            <div className="img-wrap">
              <img className="flag" src={currencyImage} alt="str" />
            </div>
            <div>
              <h3>{currency.code}</h3>
              <div className="title">{currency.name}</div>
            </div>
          </div>
        </div>
        <div className="md-6">
          <div className="d-flex f-end">
            <div className="rate">{currency.rateNow}</div>
          </div>
        </div>
      </div>
    </li>
  );
};

ExchangeDetailItem.propTypes = {
  currency: PropTypes.instanceOf(Object).isRequired,
};
export default ExchangeDetailItem;
