import {createSelector} from '@reduxjs/toolkit';
import {AppState} from './store';
import {nextDay, formatDistanceToNow, format} from 'date-fns';

const getActiveChild = (state: AppState) =>
  state.children.get(state.currentChild) ??
  Array.from(state.children.values())[0];
const getLastPayment = (state: AppState) => getActiveChild(state).payments[0];
const getSettings = (state: AppState) => getActiveChild(state).settings;

export const amountOwedSelector = createSelector(
  getLastPayment,
  getSettings,
  (payment, settings) => {
    let date = payment?.date ?? new Date();
    const now = new Date();
    let payDays = 0;
    date = nextDay(date, settings.payDay);
    while (now > date) {
      payDays++;
      date = nextDay(date, settings.payDay);
    }
    const owed = payment.remaining + payDays * settings.pocketMoneyPerWeek;
    return owed;
  },
);

export const lastPaymentSelector = createSelector(getLastPayment, payment => {
  return `${format(payment.date, 'do LLLL')} (${formatDistanceToNow(
    payment.date,
  )} ago)`;
});

export const nextPaymentSelector = createSelector(getSettings, settings => {
  const nextPaymentDate = nextDay(new Date(), settings.payDay);
  return `${format(nextPaymentDate, 'EEEE do')} (in ${formatDistanceToNow(
    nextPaymentDate,
  )})`;
});

export const activeChildSelector = createSelector(
  getActiveChild,
  child => child.name,
);

export const settingsSelector = createSelector(
  getSettings,
  settings => settings,
);
