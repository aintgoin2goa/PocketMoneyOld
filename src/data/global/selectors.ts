import {State} from '../types';

export const getActiveChildId = (state: State) => {
  return state.global.currentChild;
};
