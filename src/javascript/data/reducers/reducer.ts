import {createReducer} from '@reduxjs/toolkit';
import {payment} from '../actions';
import {Child, State} from '../types';

export const initialState: State = {
  children: new Map<string, Child>([
    [
      'Juno',
      {
        name: 'Juno',
        payments: [
          {
            date: new Date(2022, 3, 1),
            owed: 150,
            paid: 150,
            remaining: 0,
          },
        ],
        settings: {
          pocketMoneyPerWeek: 50,
          payDay: 6,
          currency: {
            major: '£',
            minor: 'p',
          },
        },
      },
    ],
  ]),
  currentChild: 'Juno',
};

export const appReducer = createReducer(initialState, builder => {
  builder.addCase(payment, (state, action) => {
    if (action.payload) {
      state.children.get(state.currentChild)?.payments.unshift(action.payload);
    }
  });
});
