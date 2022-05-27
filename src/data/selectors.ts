import {createSelector} from '@reduxjs/toolkit';
import {AppState} from './store';
import {nextDay, format} from 'date-fns';
import {formatDistance, parseDate, printCurrency} from './utils';

export const getActiveChild = (state: AppState) =>
  state.children.find(c => c.name === state.currentChild) ?? state.children[0];
export const getLastPayment = (state: AppState) =>
  getActiveChild(state).payments[0];
export const getSettings = (state: AppState) => getActiveChild(state).settings;
export const getPayments = (state: AppState) => getActiveChild(state).payments;

export const amountOwedSelector = createSelector(
  getLastPayment,
  getSettings,
  (payment, settings) => {
    let date = new Date();
    if (payment && payment.date) {
      date = parseDate(payment.date);
    }
    const now = new Date();
    let payDays = 0;
    date = nextDay(date, settings.payDay);
    while (now > date) {
      payDays++;
      date = nextDay(date, settings.payDay);
    }
    const owed = payment.remaining + payDays * settings.pocketMoneyPerWeek;
    if (owed < 0) {
      return 0;
    }
    return owed;
  },
);

export const lastPaymentSelector = createSelector(getLastPayment, payment => {
  if (!payment) {
    return 'No payments found';
  }
  const date = parseDate(payment.date);
  return `${format(date, 'do LLLL')} (${formatDistance(date, new Date())})`;
});

export const nextPaymentSelector = createSelector(getSettings, settings => {
  const nextPaymentDate = nextDay(new Date(), settings.payDay);
  return `${format(nextPaymentDate, 'EEEE do LLLL')} (${formatDistance(
    nextPaymentDate,
    new Date(),
  )})`;
});

export const paymentHistorySelector = createSelector(
  getPayments,
  getSettings,
  (payments, settings) => {
    return payments.map((payment, index) => {
      return {
        key: `payment_${index}`,
        date: format(parseDate(payment.date), 'EEEE do LLLL'),
        amount: printCurrency(payment.paid, settings.currency),
      };
    });
  },
);

export const activeChildSelector = createSelector(
  getActiveChild,
  child => child.name,
);

export const activeChildDetailsSelector = createSelector(
  getActiveChild,
  child => child,
);

export const settingsSelector = createSelector(
  getSettings,
  settings => settings,
);
