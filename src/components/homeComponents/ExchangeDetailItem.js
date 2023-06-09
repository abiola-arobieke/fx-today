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
    <div>
      <div>{currency.code}</div>
      <div>{currency.name}</div>
      <div>{currency.rateNow}</div>
      <div>{currencyImage}</div>
    </div>
  );
};

ExchangeDetailItem.propTypes = {
  currency: PropTypes.instanceOf(Object).isRequired,
};
export default ExchangeDetailItem;
