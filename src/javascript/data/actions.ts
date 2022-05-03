import {createAction} from '@reduxjs/toolkit';
import {Payment} from './store';

export const payment = createAction<Payment | undefined>('payment');
