import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ExchangeDetailItem from '../components/homeComponents/ExchangeDetailItem';
import '@testing-library/jest-dom/extend-expect';

const currency = {
  code: '1inch',
  name: '1inch Network',
  rateNow: '3.02',
  flag: 'https://currencyfreaks.com/photos/flags/1inch.png',
};

describe('ExchangeDetailItem', () => {
  it('renders correctly with filtered blue', () => {
    render(
      <MemoryRouter>
        <ExchangeDetailItem currency={currency} />
      </MemoryRouter>,
    );

    expect(screen.getByText('1inch')).toBeInTheDocument();
  });
});
