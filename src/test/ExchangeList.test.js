import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import ExchangeList from '../components/homeComponents/ExchangeList';
import '@testing-library/jest-dom/extend-expect';
import { getCurrencyList } from '../redux/currency/currencySlice';

const currencyList = [
  {
    code: '1inch',
    name: '1inch Network',
    rateNow: '3.02',
    flag: 'https://currencyfreaks.com/photos/flags/1inch.png',
  },
  {
    code: 'aave',
    name: 'Aave',
    rateNow: '0.02',
    flag: 'https://currencyfreaks.com/photos/flags/aave.png',
  },
];

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('../redux/currency/currencySlice', () => ({
  getCurrencyList: jest.fn(),
}));

describe('ExchangeList', () => {
  beforeEach(() => {
    useSelector.mockClear();
    useDispatch.mockClear();
    getCurrencyList.mockClear();
  });

  it('renders correctly with filtered blue', () => {
    useSelector.mockReturnValue({ currencyList });
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    render(
      <MemoryRouter>
        <ExchangeList />
      </MemoryRouter>,
    );

    expect(useDispatch.mockReturnValue(jest.fn())).toHaveBeenCalled();
    expect(screen.getByText('aave')).toBeInTheDocument();
  });

  it('dispatches getCurrencyList action on mount', () => {
    useSelector.mockReturnValue([]);
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    render(
      <MemoryRouter>
        <ExchangeList />
      </MemoryRouter>,
    );

    expect(mockDispatch).toHaveBeenCalledWith(getCurrencyList());
  });
});
