import {createReducer} from '@reduxjs/toolkit';
import {payment} from '../actions';
import {initialState} from '../initialState';

export const appReducer = createReducer(initialState, builder => {
  builder.addCase(payment, (state, action) => {
    console.log('REDUCER', action);
    if (!action.payload) {
      return state;
    }
    const index = state.children.findIndex(
      c => c.name === action.payload.child,
    );
    if (index < 0) {
      return state;
    }
    const child = state.children[index];

    if (!child) {
      return state;
    }

    const payments = child.payments;
    payments.unshift(action.payload);
    child.payments = payments;
    state.children[index] = child;
    console.log('STATE', state);
    return state;
  });
});
