import {State} from './types';

export const initialState: State = {
  children: [
    {
      id: 0,
      name: '',
      settings: {
        currency: {major: '£', minor: 'p'},
        pocketMoneyPerWeek: 1,
        payDay: 6,
      },
      payments: [],
    },
  ],
  currentChild: 0,
};
