import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleCurrency } from '../../redux/currency/currencySlice';
import ExchangeDetailItem from './ExchangeDetailItem';

const ExchangeDetails = () => {
  const { id } = useParams();
  const [search, setSearch] = useState('');
  const [amount, setAmount] = useState(1);
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

  const calculator = (e) => {
    if (e.target.value === '') {
      e.target.placeholder = 0.00;
    }
    setAmount(e.target.value);
  };

  return (
    <div className="container bg-screen txt-white">
      <div className="">
        <form className="d-flex full-width mid-center">
          <div className="d-flex m-10 search">
            <FontAwesomeIcon className="s-center search-icon" icon={faMagnifyingGlass} />
            <input
              id="searchBar"
              type="search"
              className="searchBar"
              placeholder="Search currency..."
              onChange={(e) => setSearch(e.target.value)}
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
                <img className="base-img s-center" src={flag} alt="currency-flag" />
              </div>
              <div className="">
                <h2>{id}</h2>
                <input
                  type="number"
                  placeholder="1.00"
                  className="amount"
                  onChange={(e) => calculator(e)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="stat-title">
          <span>Exchange rate for </span>
          <span>{id}</span>
        </div>
      </div>
      <ul className="grid-details">
        {selectedCurrency?.filter((currency) => (search.toLowerCase() === ''
          ? !(currency.code === `${id}`)
          : currency.code.toLowerCase().includes(search)) && !(currency.code === `${id}`))
          .map((currency) => (
            <ExchangeDetailItem key={currency.code} currency={currency} amount={amount} />
          ))}
      </ul>
    </div>
  );
};

export default ExchangeDetails;
