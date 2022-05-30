import {createReducer} from '@reduxjs/toolkit';
import {payment, editChild, addChild} from '../actions';
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
  console.log('editChildHandler', action);
  if (!action.payload) {
    return state;
  }
  const index = state.children.findIndex(c => c.id === action.payload.id);
  console.log('index', index, action.payload);
  if (index < 0) {
    return state;
  }

  state.children[index] = action.payload;
  console.log('EDIT CHILD: AFTER', state);
  return state;
};

const addChildHandler = (
  state: State,
  action: {type: string; payload: Child},
) => {
  console.log('addChildHandler', action);
  if (!action.payload) {
    return state;
  }

  state.children.push(action.payload);
  console.log('EDIT CHILD: AFTER', state);
  return state;
};

export const appReducer = createReducer(initialState, builder => {
  builder.addCase(payment, paymentHandler);
  builder.addCase(editChild, editChildHandler);
  builder.addCase(addChild, addChildHandler);
});
