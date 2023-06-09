import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ExchangeItem from '../components/homeComponents/ExchangeItem';
import '@testing-library/jest-dom/extend-expect';

const currency = {
  code: '1inch',
  name: '1inch Network',
  rateNow: '3.02',
  flag: 'https://currencyfreaks.com/photos/flags/1inch.png',
};

describe('ExchangeItem', () => {
  it('renders correctly with filtered blue', () => {
    render(
      <MemoryRouter>
        <ExchangeItem currency={currency} />
      </MemoryRouter>,
    );

    expect(screen.getByText('1inch')).toBeInTheDocument();
  });
});
