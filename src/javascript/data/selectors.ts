import {createSelector} from '@reduxjs/toolkit';
import {AppState} from './store';
import {nextDay} from 'date-fns';
import {printCurrency} from './utils';

const getActiveChild = (state: AppState) =>
  state.children.get(state.currentChild) ??
  Array.from(state.children.values())[0];
const getLastPayment = (state: AppState) => getActiveChild(state).payments[0];
const getSettings = (state: AppState) => getActiveChild(state).settings;

export const amountOwedSelector = () =>
  createSelector(getLastPayment, getSettings, (payment, settings) => {
    let date = payment.date;
    const now = new Date();
    let payDays = 0;
    date = nextDay(date, settings.payDay);
    while (now > date) {
      payDays++;
      date = nextDay(date, settings.payDay);
    }
    const owed = payment.owed + payDays * settings.pocketMoneyPerWeek;
    return printCurrency(owed, settings.currency);
  });
