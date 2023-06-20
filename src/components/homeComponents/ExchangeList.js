import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPencil } from '@fortawesome/free-solid-svg-icons';
import { getCurrencyList } from '../../redux/currency/currencySlice';
import ExchangeItem from './ExchangeItem';
import '../../styles/exchange.css';

const ExchangeList = () => {
  const [search, setSearch] = useState('');
  const [amount, setAmount] = useState(1);
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

  const calculator = (e) => {
    if (e.target.value === '') {
      e.target.placeholder = 0.00;
    }
    setAmount(e.target.value);
  };

  return (
    <div className="container bg-screen txt-white">
      <div>
        <form className="d-flex full-width mid-center">
          <div className="d-flex m-10 search">
            <FontAwesomeIcon className="s-center search-icon" icon={faMagnifyingGlass} />
            <input
              id="searchBar"
              type="search"
              className="searchBar"
              placeholder="Search currency..."
              onChange={(e) => setSearch((e.target.value).toLowerCase())}
            />
          </div>
        </form>
        <div className="d-flex banner">
          <div className="md-6 d-flex bg-world">
            {}
          </div>
          <div className="md-6 d-flex s-center base-title">
            <div className="d-flex mid-center base-details">
              <div>
                <img className="base-img s-center" src="https://currencyfreaks.com/photos/flags/usd.png" alt="currency-flag" />
              </div>
              <div className="">
                <h2>USD</h2>
                <div className="d-flex full-width gap-5">
                  <input
                    type="number"
                    placeholder="1.00"
                    className="amount"
                    onChange={(e) => calculator(e)}
                  />
                  <FontAwesomeIcon icon={faPencil} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="stat-title">
          Exchange rate for usd
        </div>
      </div>
      <ul className="grid">
        {allExchange
          ?.filter((currency) => (search === ''
            ? !(currency.code === 'usd')
            : currency.code.toLowerCase().includes(search)) && !(currency.code === 'usd'))
          .map((currency) => (
            <ExchangeItem key={currency.code} currency={currency} amount={amount} />
          ))}
      </ul>
    </div>
  );
};

export default ExchangeList;
