import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleCurrency } from '../../redux/currency/currencySlice';
import ExchangeDetailItem from './ExchangeDetailItem';

const ExchangeDetails = () => {
  const { id } = useParams();
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const apiUrls = [
    'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json',
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${id}.json`,
  ];
  const flag = `https://currencyfreaks.com/photos/flags/${id}.png`;

  useEffect(() => {
    dispatch(getSingleCurrency(apiUrls));
  }, [dispatch]);
  const myCurrency = useSelector((store) => store.currencies);
  const selectedCurrency = myCurrency.singleCurrency;

  return (
    <div className="container bg-screen txt-white">
      <form className="d-flex search-form">
        <input
          id="searchBar"
          type="search"
          className="search"
          placeholder="Search currency..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <div className="d-flex info">
        <div className="md-6 d-flex mid-center">
          <img className="base-img" src={flag} alt="currency-flag" />
        </div>
        <div className="md-6 d-flex mid-center base-title">
          <div className="md-6">
            <h2>{id}</h2>
            <div>1.000</div>
          </div>
        </div>
      </div>
      <ul className="grid-details">
        {selectedCurrency?.filter((currency) => (search.toLowerCase() === ''
          ? currency
          : currency.code.toLowerCase().includes(search))).map((currency) => (
            <ExchangeDetailItem key={currency.code} currency={currency} />
        ))}
      </ul>
    </div>
  );
};

export default ExchangeDetails;
