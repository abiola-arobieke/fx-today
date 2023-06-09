import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleCurrency } from '../../redux/currency/currencySlice';
import ExchangeDetailItem from './ExchangeDetailItem';

const ExchangeDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const apiUrls = [
    'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json',
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${id}.json`,
  ];

  useEffect(() => {
    dispatch(getSingleCurrency(apiUrls));
    // eslint-disable-next-line
  }, [dispatch]);

  const myCurrency = useSelector((store) => store.currencies);
  const selectedCurrency = myCurrency.singleCurrency;

  return (
    <div>
      <Link to="/">Back</Link>
      <div>hello world </div>
      <p>{id}</p>
      {selectedCurrency?.map((currency) => (
        <ExchangeDetailItem key={currency.code} currency={currency} />
      ))}
    </div>
  );
};

export default ExchangeDetails;
