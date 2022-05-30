import {State} from './types';

export const initialState: State = {
  children: [
    // {
    //   id: 0,
    //   name: 'Juno',
    //   payments: [
    //     {
    //       child: 'Juno',
    //       date: formatDate(new Date(2022, 3, 1)),
    //       owed: 150,
    //       paid: 150,
    //       remaining: 0,
    //     },
    //   ],
    //   settings: {
    //     pocketMoneyPerWeek: 100,
    //     payDay: 6,
    //     currency: {
    //       major: '£',
    //       minor: 'p',
    //     },
    //   },
    // },
  ],
  currentChild: 0,
};
