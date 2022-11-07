import {differenceInDays, format, parse} from 'date-fns';
import {CurrencySymbol, DateString} from './types';
import uuid from 'react-native-uuid';

export const splitCurrencyAmount = (amount?: number): [number, number] => {
  if (!amount) {
    return [0, 0];
  }
  return [Math.floor(amount / 100), amount % 100];
};

export const printCurrency = (
  amount: number,
  currency: CurrencySymbol,
): string => {
  const absAmount = Math.abs(amount);
  if (absAmount === 0) {
    return String(amount);
  }
  if (absAmount < 100) {
    return `${amount}${currency.minor}`;
  }

  let symbol = '';

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
  const date1C = new Date(date1.getTime());
  const date2C = new Date(date2.getTime());
  date1C.setHours(0, 0, 0, 0);
  date2C.setHours(0, 0, 0, 0);
  const days = differenceInDays(date1C, date2C);
  console.log('days', {days, date1C, date2C});
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

export const uid = (prefix: 'PAYMENT' | 'CHILD') => `${prefix}-${uuid.v4()}`;
