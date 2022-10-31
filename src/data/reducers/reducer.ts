import {combineReducers} from 'redux';
import {childSlice} from '../children/childReducer';
import {paymentsSlice} from '../payments/paymentReducer';

export const rootReducer = combineReducers({
  children: childSlice.reducer,
  payments: paymentsSlice.reducer,
});
