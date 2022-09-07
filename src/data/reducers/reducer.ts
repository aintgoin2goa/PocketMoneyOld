import {createReducer} from '@reduxjs/toolkit';
import {
  payment,
  editChild,
  addChild,
  switchChild,
  deletePayment,
} from '../actions';
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

const switchChildHandler = (
  state: State,
  action: {type: string; payload: Child},
) => {
  console.log(action);
  state.currentChild = action.payload.id;
  return state;
};

const deletePaymentHandler = (
  state: State,
  action: {type: string; payload: {index: number}},
) => {
  console.log(action, state);

  const child = state.children[state.currentChild];
  const payments = child.payments;
  payments.splice(action.payload.index, 1);
  child.payments = payments;
  state.children[state.currentChild] = child;
  return state;
};

export const appReducer = createReducer(initialState, builder => {
  builder.addCase(payment, paymentHandler);
  builder.addCase(editChild, editChildHandler);
  builder.addCase(addChild, addChildHandler);
  builder.addCase(switchChild, switchChildHandler);
  builder.addCase(deletePayment, deletePaymentHandler);
});
