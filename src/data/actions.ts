import {childSlice} from './children/childReducer';
import {paymentsSlice} from './payments/paymentReducer';
import {globalSlice} from './global/slice';

// export const makePayment = createAction<Payment>('payment');
// export const deletePayment = createAction<{index: number}>('deletePayment');
// export const editChild = createAction<Child>('editChild');
// export const addChild = createAction<Child>('addChild');
// export const switchChild = createAction<Child>('switchChild');
// export const deleteChild = createAction<Child>('deleteChild');

export default {
  ...childSlice.actions,
  ...paymentsSlice.actions,
  ...globalSlice.actions,
};
