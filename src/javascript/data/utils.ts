import {CurrencySymbol} from './types';

export const printCurrency = (amount: number, currency: CurrencySymbol) => {
  if (amount === 0) {
    return amount;
  }
  if (amount < 100) {
    return `${amount}${currency.minor}`;
  }

  const amounts = [Math.floor(amount / 100), amount % 100];
  if (amounts[1] === 0) {
    return `${currency.major}${amounts[0]}`;
  }

  return `${currency.major}${amounts.join('.')}`;
};
