import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getCurrencyList } from '../../redux/currency/currencySlice';
import ExchangeItem from './ExchangeItem';

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
    <div>
      <div>This is home list</div>
      <form>
        <input
          id="searchBar"
          type="search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <ul>
        <li>rule your world</li>
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
