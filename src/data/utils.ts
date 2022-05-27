import {differenceInDays, format, parse} from 'date-fns';
import {CurrencySymbol, DateString} from './types';

export const splitCurrencyAmount = (amount: number): [number, number] => {
  return [Math.floor(amount / 100), amount % 100];
};

export const printCurrency = (
  amount: number,
  currency: CurrencySymbol,
): string => {
  if (amount === 0) {
    return String(amount);
  }
  if (amount > 0 && amount < 100) {
    return `${amount}${currency.minor}`;
  }

  let symbol = '';
  if (amount < 0) {
    symbol = '-';
    amount = Math.abs(amount);
  }

  const amounts = splitCurrencyAmount(amount);
  if (amounts[1] === 0) {
    return `${symbol}${currency.major}${amounts[0]}`;
  }

  return `${symbol}${currency.major}${amounts.join('.')}`;
};

const DATE_FORMAT = 'yyyy-MM-dd';

export const parseDate = (date: DateString): Date => {
  return parse(date, DATE_FORMAT, new Date());
};

export const formatDate = (date: Date): DateString => {
  return format(date, DATE_FORMAT);
};

export const formatDistance = (date1: Date, date2: Date): string => {
  const days = differenceInDays(date1, date2);
  if (days === 0) {
    return 'today';
  } else if (days === 1) {
    return 'tomorrow';
  } else if (days === -1) {
    return 'yesterday';
  } else if (days < 0) {
    return `${Math.abs(days)} days ago`;
  } else {
    return `in ${days} days`;
  }
};
