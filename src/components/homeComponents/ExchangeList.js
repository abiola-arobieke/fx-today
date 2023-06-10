import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getCurrencyList } from '../../redux/currency/currencySlice';
import ExchangeItem from './ExchangeItem';
import '../../styles/exchange.css';

const ExchangeList = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const forEx = useSelector((store) => store.currencies);
  const allExchange = forEx.currencyList;
  useEffect(() => {
    const apiUrls = [
      'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json',
      'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json',
    ];
    dispatch(getCurrencyList(apiUrls));
  }, [dispatch]);

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
      <ul className="grid">
        {allExchange
          ?.filter((currency) => (search.toLowerCase() === ''
            ? currency
            : currency.code.toLowerCase().includes(search)))
          .map((currency) => (
            <ExchangeItem key={currency.code} currency={currency} />
          ))}
      </ul>
    </div>
  );
};

export default ExchangeList;
