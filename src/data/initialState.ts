import {State} from './types';
import {formatDate} from './utils';

export const initialState: State = {
  children: [
    {
      id: 0,
      name: '',
      settings: {
        currency: {major: '£', minor: 'p'},
        pocketMoneyPerWeek: 1,
        payDay: 6,
        beginningOfTime: formatDate(new Date()),
      },
      payments: [],
    },
  ],
  currentChild: 0,
};
