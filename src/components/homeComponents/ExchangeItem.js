import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { imageExist, placeholderImageUrl } from '../../utility/imagePlaceholder';

const ExchangeItem = ({ currency }) => {
  const [currencyImage, setCurrencyImage] = useState(placeholderImageUrl);
  useEffect(() => {
    imageExist(currency.flag).then((imgUrl) => {
      setCurrencyImage(imgUrl);
    });
  }, [currency.flag]);

  const detailUrl = `/currency/${currency.code}`;

  return (
    <li>
      <div>{currency.code}</div>
      <div>{currency.name}</div>
      <div>{currency.rateNow}</div>
      <div>{currencyImage}</div>
      <img src={currencyImage} alt="str" />
      {/* <img src={currency.flag} alt="str" /> */}
      <Link to={detailUrl}>Redirect</Link>
      <hr />
    </li>
  );
};

ExchangeItem.propTypes = {
  currency: PropTypes.instanceOf(Object).isRequired,
};

export default ExchangeItem;
