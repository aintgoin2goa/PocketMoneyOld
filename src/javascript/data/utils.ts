import {CurrencySymbol} from './store';

export const printCurrency = (amount: number, currency: CurrencySymbol) => {
  if (amount < 100) {
    return `${amount}${currency.major}`;
  }

  const amounts = [Math.floor(amount / 100), amount % 100];
  if (amounts[1] === 0) {
    return `${currency.major}${amounts[0]}`;
  }

  return `${currency.major}${amounts.join('.')}`;
};
