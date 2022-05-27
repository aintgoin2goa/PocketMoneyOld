import {createReducer} from '@reduxjs/toolkit';
import {payment, editChild} from '../actions';
import {initialState} from '../initialState';
import {Child, Payment, State} from '../types';

const paymentHandler = (
  state: State,
  action: {type: string; payload: Payment},
) => {
  if (!action.payload) {
    return state;
  }
  const index = state.children.findIndex(c => c.name === action.payload.child);
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
  return state;
};

const editChildHandler = (
  state: State,
  action: {type: string; payload: Child},
) => {
  console.log(action);
  if (!action.payload) {
    return state;
  }
  const index = state.children.findIndex(c => c.name === action.payload.name);
  if (index < 0) {
    return state;
  }

  state.children[index] = action.payload;

  return state;
};

export const appReducer = createReducer(initialState, builder => {
  builder.addCase(payment, paymentHandler);
  builder.addCase(editChild, editChildHandler);
});
