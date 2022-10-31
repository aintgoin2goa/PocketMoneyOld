import {Child, State} from './types';
import {formatDate} from './utils';
import {v4 as uuidv4} from 'uuid';

const initialChild: Child = {
  id: `CHILD-${uuidv4()}`,
  name: '',
  payments: [],
  settings: {
    currency: {major: '£', minor: 'p'},
    pocketMoneyPerWeek: 1,
    payDay: 6,
    beginningOfTime: formatDate(new Date()),
  },
};

export const initialState: State = {
  payments: [],
  children: [initialChild],
  global: {
    currentChild: initialChild.id,
    currentDate: formatDate(new Date()),
  },
  currentChild: 0,
};
