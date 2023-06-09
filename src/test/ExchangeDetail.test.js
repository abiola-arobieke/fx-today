import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import ExchangeDetails from '../components/homeComponents/ExchangeDetails';
import '@testing-library/jest-dom/extend-expect';
import { getSingleCurrency } from '../redux/currency/currencySlice';

const singleCurrency = [
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
  getSingleCurrency: jest.fn(),
}));

describe('ExchangeDetails', () => {
  beforeEach(() => {
    useSelector.mockClear();
    useDispatch.mockClear();
    getSingleCurrency.mockClear();
  });

  it('renders correctly with filtered blue', () => {
    useSelector.mockReturnValue({ singleCurrency });
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    render(
      <MemoryRouter>
        <ExchangeDetails />
      </MemoryRouter>,
    );

    expect(useDispatch.mockReturnValue(jest.fn())).toHaveBeenCalled();
    expect(screen.getByText('1inch')).toBeInTheDocument();
  });

  it('dispatches getSingleCurrency action on mount', () => {
    useSelector.mockReturnValue([]);
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    render(
      <MemoryRouter>
        <ExchangeDetails />
      </MemoryRouter>,
    );

    expect(mockDispatch).toHaveBeenCalledWith(getSingleCurrency());
  });
});
