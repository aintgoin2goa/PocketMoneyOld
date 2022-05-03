import {createReducer} from '@reduxjs/toolkit';
import {payment} from '../actions';
import {initialState} from '../store';

export const appReducer = createReducer(initialState, builder => {
  builder.addCase(payment, (state, action) => {
    if (action.payload) {
      state.children.get(state.currentChild)?.payments.unshift(action.payload);
    }
  });
});
